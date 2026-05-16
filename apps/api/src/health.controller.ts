import { Controller, Get } from "@nestjs/common";
import { PLATFORM_SCOPE } from "@tv-platform/shared";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "tv-project-platform-api",
      scope: PLATFORM_SCOPE.productType
    };
  }
}
