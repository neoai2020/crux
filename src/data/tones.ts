export interface ToneDefinition {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  headingFont: string;
  bodyFont: string;
  radius: string;
  fontImport: string;
  gradient: string;
}

export const TONES: ToneDefinition[] = [
  {
    id: "bold",
    name: "Bold",
    description: "Strong and confident with vibrant purples",
    primary: "#7C3AED",
    primaryLight: "#A78BFA",
    secondary: "#EC4899",
    accent: "#F97316",
    bg: "#FFFFFF",
    surface: "#F5F3FF",
    text: "#1E1B4B",
    muted: "#6B7280",
    border: "#E5E7EB",
    headingFont: "'Montserrat', sans-serif",
    bodyFont: "'Inter', sans-serif",
    radius: "12px",
    fontImport:
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap",
    gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
  },
  {
    id: "clean",
    name: "Clean",
    description: "Minimal and professional with cool blues",
    primary: "#0EA5E9",
    primaryLight: "#7DD3FC",
    secondary: "#6366F1",
    accent: "#14B8A6",
    bg: "#F8FAFC",
    surface: "#F0F9FF",
    text: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
    headingFont: "'DM Sans', sans-serif",
    bodyFont: "'Inter', sans-serif",
    radius: "8px",
    fontImport:
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600&display=swap",
    gradient: "linear-gradient(135deg, #0EA5E9, #6366F1)",
  },
  {
    id: "warm",
    name: "Warm",
    description: "Friendly and approachable with amber tones",
    primary: "#D97706",
    primaryLight: "#FCD34D",
    secondary: "#DC2626",
    accent: "#059669",
    bg: "#FFFBEB",
    surface: "#FEF3C7",
    text: "#1C1917",
    muted: "#78716C",
    border: "#E7E5E4",
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Lato', sans-serif",
    radius: "16px",
    fontImport:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap",
    gradient: "linear-gradient(135deg, #D97706, #DC2626)",
  },
  {
    id: "dark",
    name: "Dark",
    description: "Sleek and modern with a dark background",
    primary: "#EC4899",
    primaryLight: "#F9A8D4",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    bg: "#0F172A",
    surface: "#1E293B",
    text: "#F1F5F9",
    muted: "#94A3B8",
    border: "#334155",
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Inter', sans-serif",
    radius: "8px",
    fontImport:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&display=swap",
    gradient: "linear-gradient(135deg, #EC4899, #8B5CF6)",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Luxurious and refined with emerald greens",
    primary: "#059669",
    primaryLight: "#6EE7B7",
    secondary: "#0D9488",
    accent: "#7C3AED",
    bg: "#FFFFFF",
    surface: "#ECFDF5",
    text: "#022C22",
    muted: "#6B7280",
    border: "#D1D5DB",
    headingFont: "'Cormorant Garamond', serif",
    bodyFont: "'Raleway', sans-serif",
    radius: "2px",
    fontImport:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Raleway:wght@400;500;600&display=swap",
    gradient: "linear-gradient(135deg, #059669, #0D9488)",
  },
];

export function getToneById(id: string): ToneDefinition {
  return TONES.find((t) => t.id === id) || TONES[0];
}
