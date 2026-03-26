import { createServiceClient } from "@/lib/supabase";

const MAX_DAILY_MARKETING_GENS = 15;

function getServiceSupabase() {
  try {
    return createServiceClient();
  } catch {
    return null;
  }
}

async function getDailyMarketingCount(userId: string): Promise<number> {
  const svc = getServiceSupabase();
  if (!svc) return 0;

  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await svc
    .from("marketing_generations")
    .select("count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (error) return 0;
  return data?.count || 0;
}

export async function getRemainingMarketingGenerations(userId: string): Promise<number> {
  const count = await getDailyMarketingCount(userId);
  return Math.max(0, MAX_DAILY_MARKETING_GENS - count);
}

export async function canGenerateMarketing(userId: string): Promise<boolean> {
  const count = await getDailyMarketingCount(userId);
  return count < MAX_DAILY_MARKETING_GENS;
}

export async function recordMarketingGeneration(userId: string): Promise<void> {
  const svc = getServiceSupabase();
  if (!svc) return;

  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await svc
    .from("marketing_generations")
    .select("id, count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (existing) {
    await svc
      .from("marketing_generations")
      .update({ count: existing.count + 1 })
      .eq("id", existing.id);
  } else {
    await svc
      .from("marketing_generations")
      .insert({ user_id: userId, date: today, count: 1 });
  }
}
