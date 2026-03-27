export const PREMIUM_FEATURE_KEYS = ["10x", "automation", "infinite", "dfy"] as const;

export type PremiumFeatureKey = (typeof PREMIUM_FEATURE_KEYS)[number];

export function hasAnyPremiumFeature(features: string[] | undefined): boolean {
  if (!features?.length) return false;
  return PREMIUM_FEATURE_KEYS.some((k) => features.includes(k));
}

export function hasPremiumFeature(
  features: string[] | undefined,
  key: string
): boolean {
  return !!features?.includes(key);
}
