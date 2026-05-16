export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmailLike(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.includes("@") &&
    value.includes(".") &&
    value.length <= 254
  );
}

export function isFutureIsoDate(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.getTime() > Date.now();
}
