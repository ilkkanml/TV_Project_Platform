import { Body, Controller, Get, Param, Post } from "@nestjs/common";

type CreateProfileTransferBody = {
  userId?: string;
  deviceId?: string;
  encryptedPayload?: string;
  payloadVersion?: string;
};

@Controller("profile-transfer-sessions")
export class ProfileTransferController {
  @Post()
  createTransferSession(@Body() body: CreateProfileTransferBody) {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    return {
      sessionId: "profile_transfer_demo",
      status: "created",
      userId: body.userId ?? null,
      deviceId: body.deviceId ?? null,
      payloadStored: Boolean(body.encryptedPayload),
      payloadVersion: body.payloadVersion ?? "v1",
      expiresAt
    };
  }

  @Get(":id")
  getTransferSession(@Param("id") id: string) {
    return {
      sessionId: id,
      status: "available",
      encryptedPayload: null,
      expiresAt: null,
      consumedAt: null
    };
  }

  @Post(":id/consume")
  consumeTransferSession(@Param("id") id: string) {
    return {
      sessionId: id,
      status: "consumed",
      consumedAt: new Date().toISOString()
    };
  }
}
