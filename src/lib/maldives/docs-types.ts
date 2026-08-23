export type DocKind = "paper" | "sheet" | "form";

export type DocLang = "en" | "ru" | "bilingual";

export type JobRow = {
  employer: string;
  role: string;
  dates: string;
  duties: string;
};

export type Candidate = {
  fullName: string;
  nationality: string;
  city: string;
  email: string;
  phone: string;
  english: "" | "basic" | "conversational" | "fluent";
  targetRole: string;
  readyDate: string;
  yearsExperience: string;
  skills: string;
  certificates: string;
  jobs: JobRow[];
  references: string;
};

export type TrackerRow = {
  id: string;
  date: string;
  resort: string;
  role: string;
  channel: string;
  hrEmail: string;
  status: "draft" | "sent" | "replied" | "interview" | "offer" | "rejected" | "scam";
  ticketAsked: boolean;
  notes: string;
};

export type VersionSnap = {
  at: string;
  html: string;
};

export type DocFile = {
  id: string;
  templateId: string;
  title: string;
  kind: DocKind;
  lang: DocLang;
  html: string;
  tracker: TrackerRow[];
  form: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  versions: VersionSnap[];
  wizardDone: boolean;
};

export type TemplateMeta = {
  id: string;
  kind: DocKind;
  formats: string[];
  title: { ru: string; en: string };
  blurb: { ru: string; en: string };
  needsWizard: boolean;
};

export const ROLE_PRESETS = [
  "Waiter / Waitress",
  "Host / Hostess",
  "Bartender / Barback",
  "Guest Relations",
  "Front Office / Receptionist",
  "Reservations Agent",
  "Room Attendant / Housekeeping",
  "Commis / Kitchen",
  "Stewarding",
  "Spa Therapist",
  "Recreation Attendant",
] as const;

export function emptyCandidate(): Candidate {
  return {
    fullName: "",
    nationality: "",
    city: "",
    email: "",
    phone: "",
    english: "",
    targetRole: "Waiter / Waitress",
    readyDate: "",
    yearsExperience: "",
    skills: "",
    certificates: "",
    jobs: [{ employer: "", role: "", dates: "", duties: "" }],
    references: "",
  };
}

export function uid(prefix = "f"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
