import { Controller, Get, Query } from "@nestjs/common";

@Controller("app-version")
export class AppVersionController {
  @Get()
  getAppVersion(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0"
  ) {
    return {
      platform,
      requestedVersion: version,
      currentRecommendedVersion: "0.1.0",
      minimumSupportedVersion: "0.1.0",
      forceUpdate: false,
      updateUrl: null,
      releaseNotes: "Free launch compatibility build.",
      freeLaunch: true
    };
  }
}
