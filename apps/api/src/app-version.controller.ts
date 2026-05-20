import { Controller, Get, Query } from "@nestjs/common";
import { success } from "./shared/api-response";

@Controller("app-version")
export class AppVersionController {
  @Get()
  getAppVersion(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0",
    @Query("channel") channel = "ea0"
  ) {
    return success({
      platform,
      requestedVersion: version,
      channel,
      currentRecommendedVersion: "0.1.0",
      minimumSupportedVersion: "0.1.0",
      forceUpdate: false,
      updateUrl: "",
      releaseNotes: "EA0 free launch build",
      freeLaunch: true
    });
  }
}
