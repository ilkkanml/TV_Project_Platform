import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller("devices/activation-sessions")
export class DeviceActivationController {
  @Post()
  createActivationSession() {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    return {
      sessionId: "activation_session_demo",
      activationCode: "DEMO-CODE",
      status: "pending",
      platform: "android_tv",
      expiresAt,
      pollingSeconds: 5
    };
  }

  @Get(":id")
  getActivationSession(@Param("id") id: string) {
    return {
      sessionId: id,
      status: "pending",
      activated: false,
      deviceId: null
    };
  }
}
