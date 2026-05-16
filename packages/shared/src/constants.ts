export const PLATFORM_SCOPE = {
  productType: "Licensed IPTV Player Platform",
  allowedBackendAreas: [
    "user-account",
    "subscription-license",
    "device-activation",
    "payment-status",
    "reseller-credit",
    "app-version-check",
    "remote-config",
    "temporary-encrypted-profile-transfer"
  ],
  forbiddenBackendAreas: [
    "stream-hosting",
    "stream-relay",
    "stream-transcoding",
    "cdn",
    "channel-list-sales",
    "playlist-provider",
    "content-source"
  ]
} as const;

export const PLAYLIST_POLICY = {
  backendSourceOfTruth: false,
  defaultStorage: "encrypted-device-local-storage",
  multiProfileSupport: true,
  optionalWebToDeviceBridge: true,
  bridgeMode: "temporary-encrypted-transfer"
} as const;
