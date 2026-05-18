import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "tv-project-platform-api",
      scope: "Core Media Player Ecosystem"
    };
  }
}
