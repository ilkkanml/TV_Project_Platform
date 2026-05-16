export type UserRole = "customer" | "reseller" | "admin";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "expired"
  | "suspended";

export type DeviceStatus = "pending" | "active" | "revoked" | "blocked";

export interface DeviceActivationRequest {
  activationCode: string;
  deviceName: string;
  deviceKey: string;
}

export interface LicenseCheckResult {
  active: boolean;
  reason?: string;
  expiresAt?: string;
}

export interface AppVersionCheckResult {
  platform: string;
  currentVersion: string;
  minimumSupportedVersion?: string;
  forceUpdate: boolean;
  updateUrl?: string;
  releaseNotes?: string;
}

export interface TemporaryProfileTransferRequest {
  deviceId: string;
  encryptedPayload: string;
  expiresAt: string;
}
