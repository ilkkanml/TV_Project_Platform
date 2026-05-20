const { PrismaClient, ClientPlatform } = require("@prisma/client");

const prisma = new PrismaClient();

async function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function validateNoRawActivationKeyColumns() {
  const rows = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'DeviceAccessRecord'
      AND column_name IN ('activationKey', 'rawActivationKey', 'plainActivationKey')
  `;

  await assert(rows.length === 0, "Unsafe raw Activation Key column exists.");
}

async function validateDeviceAccessRecordModel() {
  await prisma.deviceAccessRecord.findMany({ take: 1 });
  await validateNoRawActivationKeyColumns();
}

async function validateAppVersionSeed() {
  const record = await prisma.appVersion.findFirst({
    where: {
      platform: ClientPlatform.ANDROID_TV,
      channel: "ea0",
      enabled: true,
      currentRecommended: true
    }
  });

  await assert(Boolean(record), "EA0 AppVersion seed is missing.");
  await assert(record.forceUpdate === false, "EA0 forceUpdate must start false.");
}

async function validateRemoteConfigSeed() {
  const requiredKeys = [
    "freeLaunch.enabled",
    "maintenance.enabled",
    "features.licenseCheck.enabled",
    "features.deviceBootstrap.enabled",
    "features.diagnostics.enabled",
    "features.support.enabled",
    "support.email",
    "terms.version",
    "privacy.version",
    "legalBoundary.version",
    "emergency.forceReadOnlyMode",
    "emergency.disableDeviceBootstrap",
    "emergency.disableLicenseGranting"
  ];

  const records = await prisma.remoteConfig.findMany({
    where: {
      scope: "ea0",
      platform: ClientPlatform.ANDROID_TV,
      enabled: true,
      key: { in: requiredKeys }
    }
  });

  const foundKeys = new Set(records.map((record) => record.key));
  const missingKeys = requiredKeys.filter((key) => !foundKeys.has(key));

  await assert(
    missingKeys.length === 0,
    `EA0 RemoteConfig seed is missing keys: ${missingKeys.join(", ")}`
  );
}

async function validateAuditLogModel() {
  await prisma.auditLog.findMany({ take: 1 });
}

async function main() {
  await validateDeviceAccessRecordModel();
  await validateAppVersionSeed();
  await validateRemoteConfigSeed();
  await validateAuditLogModel();

  console.log("EA0 database validation passed.");
}

main()
  .catch((error) => {
    console.error("EA0 database validation failed.", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
