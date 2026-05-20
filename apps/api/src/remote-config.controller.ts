import { Controller, Get, Query } from "@nestjs/common";
import { success } from "./shared/api-response";

@Controller("remote-config")
export class RemoteConfigController {
  @Get()
  getRemoteConfig(
    @Query("platform") platform = "android_tv",
    @Query("version") version = "0.0.0",
    @Query("channel") channel = "ea0"
  ) {
    return success({
      platform,
      requestedVersion: version,
      channel,
      freeLaunch: {
        enabled: true
      },
      maintenance: {
        enabled: false,
        message: ""
      },
      features: {
        licenseCheck: {
          enabled: true
        },
        deviceBootstrap: {
          enabled: true
        },
        diagnostics: {
          enabled: true
        },
        support: {
          enabled: true
        },
        payments: {
          enabled: false
        },
        reseller: {
          enabled: false
        }
      },
      support: {
        email: "project@thenightssecret.com"
      },
      termsVersion: "1.0",
      privacyVersion: "1.0",
      legalBoundaryVersion: "1.0",
      emergency: {
        forceReadOnlyMode: false,
        disableDeviceBootstrap: false,
        disableLicenseGranting: false
      }
    });
  }
}
