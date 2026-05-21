<?php
/**
 * Nexora EA0 minimal device install registration endpoint for cPanel/PHP.
 *
 * Upload this file outside public source control with real DB credentials edited locally.
 * Recommended public path example:
 *   public_html/api/devices/install/index.php
 *
 * Request JSON:
 * {
 *   "installId": "optional-existing-install-id",
 *   "platformDeviceHash": "optional-stable-device-hash",
 *   "platform": "android_tv",
 *   "appVersion": "0.1.0"
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'data' => null,
        'error' => [
            'code' => 'method_not_allowed',
            'message' => 'Method not allowed.'
        ]
    ]);
    exit;
}

// TODO: Replace locally on cPanel. Never commit real credentials.
$dbHost = 'localhost';
$dbName = 'CPANEL_DB_NAME';
$dbUser = 'CPANEL_DB_USER';
$dbPass = 'CPANEL_DB_PASSWORD';

function normalize_optional_string($value) {
    if (!is_string($value)) {
        return null;
    }

    $trimmed = trim($value);
    return $trimmed === '' ? null : $trimmed;
}

function generate_install_id() {
    $hex = strtoupper(bin2hex(random_bytes(8)));
    return 'NX-INST-' . substr($hex, 0, 4) . '-' . substr($hex, 4, 4) . '-' . substr($hex, 8, 4) . '-' . substr($hex, 12, 4);
}

function respond_success($data) {
    echo json_encode([
        'ok' => true,
        'data' => $data,
        'error' => null
    ]);
    exit;
}

function respond_error($code, $message, $httpStatus = 400) {
    http_response_code($httpStatus);
    echo json_encode([
        'ok' => false,
        'data' => null,
        'error' => [
            'code' => $code,
            'message' => $message
        ]
    ]);
    exit;
}

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true);

if (!is_array($body)) {
    respond_error('invalid_request', 'Invalid request.');
}

$installId = normalize_optional_string($body['installId'] ?? null);
$platformDeviceHash = normalize_optional_string($body['platformDeviceHash'] ?? null);
$platform = normalize_optional_string($body['platform'] ?? null) ?: 'android_tv';
$appVersion = normalize_optional_string($body['appVersion'] ?? null);

try {
    $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);

    $existing = null;

    if ($installId !== null) {
        $stmt = $pdo->prepare('SELECT * FROM DeviceInstallRecord WHERE installId = :installId LIMIT 1');
        $stmt->execute(['installId' => $installId]);
        $existing = $stmt->fetch() ?: null;
    }

    if ($existing === null && $platformDeviceHash !== null) {
        $stmt = $pdo->prepare('SELECT * FROM DeviceInstallRecord WHERE platformDeviceHash = :platformDeviceHash LIMIT 1');
        $stmt->execute(['platformDeviceHash' => $platformDeviceHash]);
        $existing = $stmt->fetch() ?: null;
    }

    if ($existing !== null) {
        $stmt = $pdo->prepare(
            'UPDATE DeviceInstallRecord
             SET platform = :platform,
                 appVersion = :appVersion,
                 lastSeenAt = CURRENT_TIMESTAMP(3),
                 updatedAt = CURRENT_TIMESTAMP(3)
             WHERE id = :id'
        );
        $stmt->execute([
            'platform' => $platform,
            'appVersion' => $appVersion,
            'id' => $existing['id']
        ]);

        $stmt = $pdo->prepare('SELECT * FROM DeviceInstallRecord WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $existing['id']]);
        $record = $stmt->fetch();

        respond_success([
            'installId' => $record['installId'],
            'status' => $record['status'],
            'platform' => $record['platform'],
            'appVersion' => $record['appVersion'],
            'firstSeenAt' => $record['firstSeenAt'],
            'lastSeenAt' => $record['lastSeenAt'],
            'created' => false
        ]);
    }

    $newInstallId = generate_install_id();
    $id = bin2hex(random_bytes(12));

    $stmt = $pdo->prepare(
        'INSERT INTO DeviceInstallRecord
         (id, installId, platformDeviceHash, platform, appVersion, status, firstSeenAt, lastSeenAt, createdAt, updatedAt)
         VALUES
         (:id, :installId, :platformDeviceHash, :platform, :appVersion, :status, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))'
    );

    $stmt->execute([
        'id' => $id,
        'installId' => $newInstallId,
        'platformDeviceHash' => $platformDeviceHash,
        'platform' => $platform,
        'appVersion' => $appVersion,
        'status' => 'seen'
    ]);

    $stmt = $pdo->prepare('SELECT * FROM DeviceInstallRecord WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => $id]);
    $record = $stmt->fetch();

    respond_success([
        'installId' => $record['installId'],
        'status' => $record['status'],
        'platform' => $record['platform'],
        'appVersion' => $record['appVersion'],
        'firstSeenAt' => $record['firstSeenAt'],
        'lastSeenAt' => $record['lastSeenAt'],
        'created' => true
    ]);
} catch (Throwable $error) {
    respond_error('server_error', 'Server error.', 500);
}
