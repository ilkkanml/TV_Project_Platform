import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Controller("ready")
export class ReadyController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getReady() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return { ready: false, reason: "DATABASE_URL not set" };
    }

    try {
      await this.prisma.ping();
      return { ready: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Database readiness check failed";
      return { ready: false, reason };
    }
  }
}
