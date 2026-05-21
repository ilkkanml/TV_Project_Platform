import { Module } from "@nestjs/common";
import { AppVersionController } from "./app-version.controller";
import { DeviceActivationController } from "./device-activation.controller";
import { DeviceInstallController } from "./device-install.controller";
import { HealthController } from "./health.controller";
import { LicenseController } from "./license.controller";
import { PrismaService } from "./prisma.service";
import { ProfileTransferController } from "./profile-transfer.controller";
import { ReadyController } from "./ready.controller";
import { RemoteConfigController } from "./remote-config.controller";

@Module({
  imports: [],
  controllers: [
    HealthController,
    ReadyController,
    AppVersionController,
    RemoteConfigController,
    DeviceInstallController,
    DeviceActivationController,
    LicenseController,
    ProfileTransferController
  ],
  providers: [PrismaService]
})
export class AppModule {}
