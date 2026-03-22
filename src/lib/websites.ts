import { BlueprintSection } from "@/data/blueprints";
import { supabase } from "@/lib/supabase";

export interface SavedWebsite {
  id: string;
  userId: string;
  businessName: string;
  email: string;
  description: string;
  productLink: string;
  logo: string;
  notes: string;
  category: string;
  categoryName: string;
  blueprintId: string;
  blueprintName: string;
  toneId: string;
  sections: BlueprintSection[];
  sectionContents: Record<string, Record<string, unknown>>;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const MAX_DAILY_GENERATIONS = 5;

function toSnake(w: Omit<SavedWebsite, "id" | "slug" | "createdAt" | "updatedAt">) {
  return {
    user_id: w.userId,
    business_name: w.businessName,
    email: w.email,
    description: w.description,
    product_link: w.productLink,
    logo: w.logo,
    notes: w.notes,
    category: w.category,
    category_name: w.categoryName,
    blueprint_id: w.blueprintId,
    blueprint_name: w.blueprintName,
    tone_id: w.toneId,
    sections: w.sections,
    section_contents: w.sectionContents,
    slug: w.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCamel(row: any): SavedWebsite {
  return {
    id: row.id,
    userId: row.user_id,
    businessName: row.business_name,
    email: row.email,
    description: row.description,
    productLink: row.product_link,
    logo: row.logo,
    notes: row.notes,
    category: row.category,
    categoryName: row.category_name,
    blueprintId: row.blueprint_id,
    blueprintName: row.blueprint_name,
    toneId: row.tone_id,
    sections: row.sections,
    sectionContents: row.section_contents,
    slug: row.slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getWebsitesForUser(userId: string): Promise<SavedWebsite[]> {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data.map(toCamel);
}

export async function saveWebsite(
  website: Omit<SavedWebsite, "id" | "slug" | "createdAt" | "updatedAt">
): Promise<SavedWebsite | null> {
  const row = toSnake(website);
  const { data, error } = await supabase
    .from("websites")
    .insert(row)
    .select()
    .single();

  if (error || !data) return null;
  await recordGeneration(website.userId);
  return toCamel(data);
}

export async function updateWebsite(
  id: string,
  userId: string,
  updates: Partial<
    Pick<
      SavedWebsite,
      | "businessName"
      | "email"
      | "description"
      | "productLink"
      | "logo"
      | "notes"
      | "category"
      | "categoryName"
      | "blueprintId"
      | "blueprintName"
      | "toneId"
      | "sections"
      | "sectionContents"
    >
  >
): Promise<SavedWebsite | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patch: Record<string, any> = { updated_at: new Date().toISOString() };
  if (updates.businessName !== undefined) {
    patch.business_name = updates.businessName;
    patch.slug = updates.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (updates.email !== undefined) patch.email = updates.email;
  if (updates.description !== undefined) patch.description = updates.description;
  if (updates.productLink !== undefined) patch.product_link = updates.productLink;
  if (updates.logo !== undefined) patch.logo = updates.logo;
  if (updates.notes !== undefined) patch.notes = updates.notes;
  if (updates.category !== undefined) patch.category = updates.category;
  if (updates.categoryName !== undefined) patch.category_name = updates.categoryName;
  if (updates.blueprintId !== undefined) patch.blueprint_id = updates.blueprintId;
  if (updates.blueprintName !== undefined) patch.blueprint_name = updates.blueprintName;
  if (updates.toneId !== undefined) patch.tone_id = updates.toneId;
  if (updates.sections !== undefined) patch.sections = updates.sections;
  if (updates.sectionContents !== undefined) patch.section_contents = updates.sectionContents;

  const { data, error } = await supabase
    .from("websites")
    .update(patch)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error || !data) return null;
  return toCamel(data);
}

export async function deleteWebsite(id: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from("websites")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return !error;
}

async function recordGeneration(userId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  const { data: existing } = await supabase
    .from("generations")
    .select("id, count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (existing) {
    await supabase
      .from("generations")
      .update({ count: existing.count + 1 })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("generations")
      .insert({ user_id: userId, date: today, count: 1 });
  }
}

export async function getDailyGenerationCount(userId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("generations")
    .select("count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  return data?.count || 0;
}

export async function getRemainingGenerations(userId: string): Promise<number> {
  const count = await getDailyGenerationCount(userId);
  return Math.max(0, MAX_DAILY_GENERATIONS - count);
}

export async function canGenerate(userId: string): Promise<boolean> {
  const count = await getDailyGenerationCount(userId);
  return count < MAX_DAILY_GENERATIONS;
}
