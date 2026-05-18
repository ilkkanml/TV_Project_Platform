import { Module } from "@nestjs/common";
import { AppVersionController } from "./app-version.controller";
import { DeviceActivationController } from "./device-activation.controller";
import { HealthController } from "./health.controller";
import { LicenseController } from "./license.controller";
import { RemoteConfigController } from "./remote-config.controller";

@Module({
  imports: [],
  controllers: [
    HealthController,
    AppVersionController,
    RemoteConfigController,
    DeviceActivationController,
    LicenseController
  ],
  providers: []
})
export class AppModule {}
