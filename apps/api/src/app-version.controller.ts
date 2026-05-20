import { Controller, Get, Query } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { success } from "./shared/api-response";
import { isEa0EnabledPlatform, toClientPlatform } from "./shared/platform";

@Controller("app-version")
export class AppVersionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAppVersion(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0",
    @Query("channel") channel = "ea0"
  ) {
    const fallback = {
      platform,
      requestedVersion: version,
      channel,
      currentRecommendedVersion: "0.1.0",
      minimumSupportedVersion: "0.1.0",
      forceUpdate: false,
      updateUrl: "",
      releaseNotes: "EA0 free launch build",
      freeLaunch: true
    };

    const prismaPlatform = toClientPlatform(platform);

    if (!prismaPlatform || !isEa0EnabledPlatform(platform)) {
      return success(fallback);
    }

    const record = await this.prisma.appVersion.findFirst({
      where: {
        platform: prismaPlatform,
        channel,
        enabled: true,
        currentRecommended: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    if (!record) {
      return success(fallback);
    }

    return success({
      platform,
      requestedVersion: version,
      channel: record.channel,
      currentRecommendedVersion: record.version,
      minimumSupportedVersion: record.minimumSupported ?? record.version,
      forceUpdate: record.forceUpdate,
      updateUrl: record.updateUrl ?? "",
      releaseNotes: record.releaseNotes ?? "",
      freeLaunch: true
    });
  }
}
