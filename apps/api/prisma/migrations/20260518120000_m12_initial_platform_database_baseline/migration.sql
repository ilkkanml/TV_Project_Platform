-- M12 initial platform database baseline
-- Scope: local-only Prisma/PostgreSQL baseline for platform-owned account/device/license/config/version/transfer/audit state.
-- Guardrails: no content catalog, no channel packages, no stream inventory, no provider credentials, no payment enforcement.

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'RESELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ClientPlatform" AS ENUM ('ANDROID_TV', 'FIRE_TV', 'ANDROID_MOBILE', 'IOS', 'APPLE_TV', 'SAMSUNG_TIZEN', 'LG_WEBOS', 'WEB_PLAYER');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'EXPIRED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('PENDING', 'ACTIVE', 'REVOKED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "ActivationSessionStatus" AS ENUM ('PENDING', 'APPROVED', 'EXPIRED', 'CONSUMED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LicenseState" AS ENUM ('FREE_LAUNCH_ACTIVE', 'ACTIVE', 'TRIALING', 'EXPIRED', 'SUSPENDED', 'DEVICE_REVOKED', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceKey" TEXT NOT NULL,
    "platform" "ClientPlatform" NOT NULL DEFAULT 'ANDROID_TV',
    "appVersion" TEXT,
    "status" "DeviceStatus" NOT NULL DEFAULT 'PENDING',
    "activatedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivationSession" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "ActivationSessionStatus" NOT NULL DEFAULT 'PENDING',
    "platform" "ClientPlatform" NOT NULL DEFAULT 'ANDROID_TV',
    "deviceName" TEXT,
    "deviceKey" TEXT,
    "appVersion" TEXT,
    "userId" TEXT,
    "deviceId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "consumedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseGrant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "state" "LicenseState" NOT NULL DEFAULT 'FREE_LAUNCH_ACTIVE',
    "freeLaunch" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "lastCheckedAt" TIMESTAMP(3),
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicenseGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIALING',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResellerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creditBalance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResellerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditLedgerEntry" (
    "id" TEXT NOT NULL,
    "resellerId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemoteConfig" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'global',
    "key" TEXT NOT NULL,
    "platform" "ClientPlatform",
    "valueJson" JSONB NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppVersion" (
    "id" TEXT NOT NULL,
    "platform" "ClientPlatform" NOT NULL,
    "version" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'stable',
    "minimumSupported" TEXT,
    "updateUrl" TEXT,
    "forceUpdate" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "releaseNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistTransferSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "encryptedPayload" TEXT NOT NULL,
    "payloadVersion" TEXT NOT NULL DEFAULT 'v1',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistTransferSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerEventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "target" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceKey_key" ON "Device"("deviceKey");

-- CreateIndex
CREATE INDEX "Device_userId_idx" ON "Device"("userId");

-- CreateIndex
CREATE INDEX "Device_platform_status_idx" ON "Device"("platform", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationSession_code_key" ON "ActivationSession"("code");

-- CreateIndex
CREATE INDEX "ActivationSession_code_status_idx" ON "ActivationSession"("code", "status");

-- CreateIndex
CREATE INDEX "ActivationSession_userId_idx" ON "ActivationSession"("userId");

-- CreateIndex
CREATE INDEX "ActivationSession_deviceId_idx" ON "ActivationSession"("deviceId");

-- CreateIndex
CREATE INDEX "ActivationSession_expiresAt_idx" ON "ActivationSession"("expiresAt");

-- CreateIndex
CREATE INDEX "LicenseGrant_userId_state_idx" ON "LicenseGrant"("userId", "state");

-- CreateIndex
CREATE INDEX "LicenseGrant_deviceId_state_idx" ON "LicenseGrant"("deviceId", "state");

-- CreateIndex
CREATE INDEX "LicenseGrant_freeLaunch_idx" ON "LicenseGrant"("freeLaunch");

-- CreateIndex
CREATE INDEX "Subscription_userId_status_idx" ON "Subscription"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ResellerProfile_userId_key" ON "ResellerProfile"("userId");

-- CreateIndex
CREATE INDEX "CreditLedgerEntry_resellerId_idx" ON "CreditLedgerEntry"("resellerId");

-- CreateIndex
CREATE UNIQUE INDEX "RemoteConfig_scope_key_key" ON "RemoteConfig"("scope", "key");

-- CreateIndex
CREATE INDEX "RemoteConfig_platform_enabled_idx" ON "RemoteConfig"("platform", "enabled");

-- CreateIndex
CREATE UNIQUE INDEX "AppVersion_platform_version_channel_key" ON "AppVersion"("platform", "version", "channel");

-- CreateIndex
CREATE INDEX "AppVersion_platform_enabled_idx" ON "AppVersion"("platform", "enabled");

-- CreateIndex
CREATE INDEX "PlaylistTransferSession_userId_deviceId_idx" ON "PlaylistTransferSession"("userId", "deviceId");

-- CreateIndex
CREATE INDEX "PlaylistTransferSession_expiresAt_idx" ON "PlaylistTransferSession"("expiresAt");

-- CreateIndex
CREATE INDEX "PlaylistTransferSession_consumedAt_idx" ON "PlaylistTransferSession"("consumedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentEvent_providerEventId_key" ON "PaymentEvent"("providerEventId");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationSession" ADD CONSTRAINT "ActivationSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationSession" ADD CONSTRAINT "ActivationSession_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseGrant" ADD CONSTRAINT "LicenseGrant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseGrant" ADD CONSTRAINT "LicenseGrant_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResellerProfile" ADD CONSTRAINT "ResellerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLedgerEntry" ADD CONSTRAINT "CreditLedgerEntry_resellerId_fkey" FOREIGN KEY ("resellerId") REFERENCES "ResellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTransferSession" ADD CONSTRAINT "PlaylistTransferSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTransferSession" ADD CONSTRAINT "PlaylistTransferSession_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
