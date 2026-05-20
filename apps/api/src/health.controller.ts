import { Controller, Get } from "@nestjs/common";
import { success } from "./shared/api-response";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return success({
      status: "ok",
      service: "nexora-platform",
      scope: "ea0"
    });
  }
}
