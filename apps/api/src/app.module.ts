import { Module } from "@nestjs/common";
import { AppVersionController } from "./app-version.controller";
import { DeviceActivationController } from "./device-activation.controller";
import { HealthController } from "./health.controller";
import { LicenseController } from "./license.controller";
import { ProfileTransferController } from "./profile-transfer.controller";
import { RemoteConfigController } from "./remote-config.controller";

@Module({
  imports: [],
  controllers: [
    HealthController,
    AppVersionController,
    RemoteConfigController,
    DeviceActivationController,
    LicenseController,
    ProfileTransferController
  ],
  providers: []
})
export class AppModule {}
