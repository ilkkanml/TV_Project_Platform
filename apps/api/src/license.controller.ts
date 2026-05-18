import { Body, Controller, Post } from "@nestjs/common";

type LicenseCheckBody = {
  deviceId?: string;
  deviceKey?: string;
  platform?: string;
  appVersion?: string;
};

@Controller("license")
export class LicenseController {
  @Post("check")
  checkLicense(@Body() body: LicenseCheckBody) {
    return {
      state: "free_launch_active",
      allowed: true,
      freeLaunch: true,
      paymentRequired: false,
      platform: body.platform ?? "android_tv",
      appVersion: body.appVersion ?? null,
      deviceId: body.deviceId ?? null,
      deviceStatus: "active",
      message: "Free launch access is active. Payment enforcement is disabled."
    };
  }
}
