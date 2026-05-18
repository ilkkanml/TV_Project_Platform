import { Controller, Get, Query } from "@nestjs/common";

@Controller("remote-config")
export class RemoteConfigController {
  @Get()
  getRemoteConfig(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0"
  ) {
    return {
      platform,
      requestedVersion: version,
      freeLaunch: true,
      maintenance: {
        enabled: false,
        message: null
      },
      features: {
        deviceActivation: true,
        licenseCheck: true,
        profileTransfer: true,
        payments: false,
        reseller: false
      },
      polling: {
        activationSessionSeconds: 5,
        licenseCheckMinutes: 60,
        remoteConfigMinutes: 60
      },
      support: {
        contactEmail: "project@thenightssecret.com"
      }
    };
  }
}
