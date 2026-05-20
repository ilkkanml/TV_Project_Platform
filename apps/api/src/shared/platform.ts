import { ClientPlatform } from "@prisma/client";

const CLIENT_PLATFORM_BY_API_VALUE: Record<string, ClientPlatform> = {
  android_tv: ClientPlatform.ANDROID_TV,
  fire_tv: ClientPlatform.FIRE_TV,
  android_mobile: ClientPlatform.ANDROID_MOBILE,
  ios: ClientPlatform.IOS,
  apple_tv: ClientPlatform.APPLE_TV,
  samsung_tizen: ClientPlatform.SAMSUNG_TIZEN,
  lg_webos: ClientPlatform.LG_WEBOS,
  web_player: ClientPlatform.WEB_PLAYER
};

export function toClientPlatform(value: string): ClientPlatform | null {
  return CLIENT_PLATFORM_BY_API_VALUE[value] ?? null;
}

export function isEa0EnabledPlatform(value: string): boolean {
  return value === "android_tv";
}
