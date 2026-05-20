const { PrismaClient, ClientPlatform } = require("@prisma/client");

const prisma = new PrismaClient();

const platform = ClientPlatform.ANDROID_TV;
const now = new Date();

async function seedAppVersion() {
  await prisma.appVersion.upsert({
    where: {
      platform_version_channel: {
        platform,
        version: "0.1.0",
        channel: "ea0"
      }
    },
    update: {
      currentRecommended: true,
      minimumSupported: "0.1.0",
      updateUrl: "",
      forceUpdate: false,
      enabled: true,
      releaseNotes: "EA0 free launch build",
      updatedAt: now
    },
    create: {
      platform,
      version: "0.1.0",
      channel: "ea0",
      currentRecommended: true,
      minimumSupported: "0.1.0",
      updateUrl: "",
      forceUpdate: false,
      enabled: true,
      releaseNotes: "EA0 free launch build"
    }
  });
}

async function seedRemoteConfig() {
  const records = [
    ["freeLaunch.enabled", { enabled: true }],
    ["maintenance.enabled", { enabled: false }],
    ["maintenance.message", { message: "" }],
    ["features.licenseCheck.enabled", { enabled: true }],
    ["features.deviceBootstrap.enabled", { enabled: true }],
    ["features.diagnostics.enabled", { enabled: true }],
    ["features.support.enabled", { enabled: true }],
    ["features.payments.enabled", { enabled: false }],
    ["features.reseller.enabled", { enabled: false }],
    ["support.email", { email: "project@thenightssecret.com" }],
    ["terms.version", { version: "1.0" }],
    ["privacy.version", { version: "1.0" }],
    ["legalBoundary.version", { version: "1.0" }],
    ["emergency.forceReadOnlyMode", { enabled: false }],
    ["emergency.disableDeviceBootstrap", { enabled: false }],
    ["emergency.disableLicenseGranting", { enabled: false }]
  ];

  for (const [key, valueJson] of records) {
    await prisma.remoteConfig.upsert({
      where: {
        scope_key_platform: {
          scope: "ea0",
          key,
          platform
        }
      },
      update: {
        valueJson,
        enabled: true,
        updatedAt: now
      },
      create: {
        scope: "ea0",
        key,
        platform,
        valueJson,
        enabled: true
      }
    });
  }
}

async function main() {
  await seedAppVersion();
  await seedRemoteConfig();
  console.log("EA0 seed completed safely.");
}

main()
  .catch((error) => {
    console.error("EA0 seed failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
