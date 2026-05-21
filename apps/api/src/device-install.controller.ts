import { Body, Controller, Post } from "@nestjs/common";
import { randomBytes } from "node:crypto";
import { PrismaService } from "./prisma.service";
import { success } from "./shared/api-response";

type RegisterDeviceInstallBody = {
  installId?: string;
  platformDeviceHash?: string;
  platform?: string;
  appVersion?: string;
};

function generateInstallId(): string {
  const value = randomBytes(8).toString("hex").toUpperCase();
  return `NX-INST-${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}`;
}

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

@Controller("devices/install")
export class DeviceInstallController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async registerInstall(@Body() body: RegisterDeviceInstallBody) {
    const now = new Date();
    const installId = normalizeOptionalString(body.installId);
    const platformDeviceHash = normalizeOptionalString(body.platformDeviceHash);
    const platform = normalizeOptionalString(body.platform) ?? "android_tv";
    const appVersion = normalizeOptionalString(body.appVersion);

    const existingByInstallId = installId
      ? await this.prisma.deviceInstallRecord.findUnique({
          where: { installId }
        })
      : null;

    if (existingByInstallId) {
      const record = await this.prisma.deviceInstallRecord.update({
        where: { id: existingByInstallId.id },
        data: {
          platform,
          appVersion,
          lastSeenAt: now
        }
      });

      return success({
        installId: record.installId,
        status: record.status,
        platform: record.platform,
        appVersion: record.appVersion,
        firstSeenAt: record.firstSeenAt,
        lastSeenAt: record.lastSeenAt,
        created: false
      });
    }

    const existingByPlatformHash = platformDeviceHash
      ? await this.prisma.deviceInstallRecord.findUnique({
          where: { platformDeviceHash }
        })
      : null;

    if (existingByPlatformHash) {
      const record = await this.prisma.deviceInstallRecord.update({
        where: { id: existingByPlatformHash.id },
        data: {
          platform,
          appVersion,
          lastSeenAt: now
        }
      });

      return success({
        installId: record.installId,
        status: record.status,
        platform: record.platform,
        appVersion: record.appVersion,
        firstSeenAt: record.firstSeenAt,
        lastSeenAt: record.lastSeenAt,
        created: false
      });
    }

    const record = await this.prisma.deviceInstallRecord.create({
      data: {
        installId: generateInstallId(),
        platformDeviceHash,
        platform,
        appVersion,
        status: "seen",
        firstSeenAt: now,
        lastSeenAt: now
      }
    });

    return success({
      installId: record.installId,
      status: record.status,
      platform: record.platform,
      appVersion: record.appVersion,
      firstSeenAt: record.firstSeenAt,
      lastSeenAt: record.lastSeenAt,
      created: true
    });
  }
}
