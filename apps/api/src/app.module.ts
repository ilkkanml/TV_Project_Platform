import { Module } from "@nestjs/common";
import { AppVersionController } from "./app-version.controller";
import { HealthController } from "./health.controller";
import { RemoteConfigController } from "./remote-config.controller";

@Module({
  imports: [],
  controllers: [HealthController, AppVersionController, RemoteConfigController],
  providers: []
})
export class AppModule {}
