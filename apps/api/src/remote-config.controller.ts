import { Controller, Get, Query } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { success } from "./shared/api-response";
import { isEa0EnabledPlatform, toClientPlatform } from "./shared/platform";

type JsonObject = Record<string, unknown>;

function asObject(value: unknown): JsonObject {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonObject;
  }

  return {};
}

function booleanConfig(
  configByKey: Map<string, unknown>,
  key: string,
  fallback: boolean
): boolean {
  const value = asObject(configByKey.get(key));
  const enabled = value["enabled"];

  return typeof enabled === "boolean" ? enabled : fallback;
}

function stringConfig(
  configByKey: Map<string, unknown>,
  key: string,
  field: string,
  fallback: string
): string {
  const value = asObject(configByKey.get(key));
  const text = value[field];

  return typeof text === "string" ? text : fallback;
}

@Controller("remote-config")
export class RemoteConfigController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getRemoteConfig(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0",
    @Query("channel") channel = "ea0"
  ) {
    const fallback = this.buildResponse(platform, version, channel, new Map());
    const prismaPlatform = toClientPlatform(platform);

    if (!prismaPlatform || !isEa0EnabledPlatform(platform)) {
      return success(fallback);
    }

    const records = await this.prisma.remoteConfig.findMany({
      where: {
        scope: "ea0",
        platform: prismaPlatform,
        enabled: true
      }
    });

    const configByKey = new Map<string, unknown>(
      records.map((record) => [record.key, record.valueJson])
    );

    return success(this.buildResponse(platform, version, channel, configByKey));
  }

  private buildResponse(
    platform: string,
    version: string,
    channel: string,
    configByKey: Map<string, unknown>
  ) {
    return {
      platform,
      requestedVersion: version,
      channel,
      freeLaunch: {
        enabled: booleanConfig(configByKey, "freeLaunch.enabled", true)
      },
      maintenance: {
        enabled: booleanConfig(configByKey, "maintenance.enabled", false),
        message: stringConfig(configByKey, "maintenance.message", "message", "")
      },
      features: {
        licenseCheck: {
          enabled: booleanConfig(configByKey, "features.licenseCheck.enabled", true)
        },
        deviceBootstrap: {
          enabled: booleanConfig(configByKey, "features.deviceBootstrap.enabled", true)
        },
        diagnostics: {
          enabled: booleanConfig(configByKey, "features.diagnostics.enabled", true)
        },
        support: {
          enabled: booleanConfig(configByKey, "features.support.enabled", true)
        },
        payments: {
          enabled: booleanConfig(configByKey, "features.payments.enabled", false)
        },
        reseller: {
          enabled: booleanConfig(configByKey, "features.reseller.enabled", false)
        }
      },
      support: {
        email: stringConfig(
          configByKey,
          "support.email",
          "email",
          "project@thenightssecret.com"
        )
      },
      termsVersion: stringConfig(configByKey, "terms.version", "version", "1.0"),
      privacyVersion: stringConfig(configByKey, "privacy.version", "version", "1.0"),
      legalBoundaryVersion: stringConfig(
        configByKey,
        "legalBoundary.version",
        "version",
        "1.0"
      ),
      emergency: {
        forceReadOnlyMode: booleanConfig(
          configByKey,
          "emergency.forceReadOnlyMode",
          false
        ),
        disableDeviceBootstrap: booleanConfig(
          configByKey,
          "emergency.disableDeviceBootstrap",
          false
        ),
        disableLicenseGranting: booleanConfig(
          configByKey,
          "emergency.disableLicenseGranting",
          false
        )
      }
    };
  }
}
