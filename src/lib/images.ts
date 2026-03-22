import { supabase } from "@/lib/supabase";

const MAX_DAILY_IMAGE_GENS = 5;

async function getDailyImageCount(userId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("image_generations")
    .select("count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();
  return data?.count || 0;
}

export async function getRemainingImageGenerations(userId: string): Promise<number> {
  const count = await getDailyImageCount(userId);
  return Math.max(0, MAX_DAILY_IMAGE_GENS - count);
}

export async function canGenerateImage(userId: string): Promise<boolean> {
  const count = await getDailyImageCount(userId);
  return count < MAX_DAILY_IMAGE_GENS;
}

export async function recordImageGeneration(userId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await supabase
    .from("image_generations")
    .select("id, count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (existing) {
    await supabase
      .from("image_generations")
      .update({ count: existing.count + 1 })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("image_generations")
      .insert({ user_id: userId, date: today, count: 1 });
  }
}
