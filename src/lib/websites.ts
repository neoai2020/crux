import { BlueprintSection } from "@/data/blueprints";

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

const WEBSITES_KEY = "crux_websites";
const GENERATIONS_KEY = "crux_generations";
const MAX_DAILY_GENERATIONS = 5;

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getWebsitesForUser(userId: string): SavedWebsite[] {
  const all: SavedWebsite[] = JSON.parse(localStorage.getItem(WEBSITES_KEY) || "[]");
  return all
    .filter((w) => w.userId === userId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function saveWebsite(
  website: Omit<SavedWebsite, "id" | "slug" | "createdAt" | "updatedAt">
): SavedWebsite {
  const all: SavedWebsite[] = JSON.parse(localStorage.getItem(WEBSITES_KEY) || "[]");
  const now = new Date().toISOString();
  const saved: SavedWebsite = {
    ...website,
    id: crypto.randomUUID(),
    slug: website.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    createdAt: now,
    updatedAt: now,
  };
  all.push(saved);
  localStorage.setItem(WEBSITES_KEY, JSON.stringify(all));
  recordGeneration(website.userId);
  return saved;
}

export function updateWebsite(
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
): SavedWebsite | null {
  const all: SavedWebsite[] = JSON.parse(localStorage.getItem(WEBSITES_KEY) || "[]");
  const idx = all.findIndex((w) => w.id === id && w.userId === userId);
  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    ...updates,
    slug: (updates.businessName || all[idx].businessName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(WEBSITES_KEY, JSON.stringify(all));
  recordGeneration(userId);
  return all[idx];
}

export function deleteWebsite(id: string, userId: string): boolean {
  const all: SavedWebsite[] = JSON.parse(localStorage.getItem(WEBSITES_KEY) || "[]");
  const filtered = all.filter((w) => !(w.id === id && w.userId === userId));
  if (filtered.length === all.length) return false;
  localStorage.setItem(WEBSITES_KEY, JSON.stringify(filtered));
  return true;
}

interface GenerationRecord {
  userId: string;
  date: string;
  count: number;
}

function getGenerationRecords(): GenerationRecord[] {
  return JSON.parse(localStorage.getItem(GENERATIONS_KEY) || "[]");
}

function recordGeneration(userId: string): void {
  const records = getGenerationRecords();
  const today = getToday();
  const existing = records.find((r) => r.userId === userId && r.date === today);
  if (existing) {
    existing.count++;
  } else {
    records.push({ userId, date: today, count: 1 });
  }
  localStorage.setItem(GENERATIONS_KEY, JSON.stringify(records));
}

export function getDailyGenerationCount(userId: string): number {
  const records = getGenerationRecords();
  const today = getToday();
  return records.find((r) => r.userId === userId && r.date === today)?.count || 0;
}

export function getRemainingGenerations(userId: string): number {
  return Math.max(0, MAX_DAILY_GENERATIONS - getDailyGenerationCount(userId));
}

export function canGenerate(userId: string): boolean {
  return getDailyGenerationCount(userId) < MAX_DAILY_GENERATIONS;
}
