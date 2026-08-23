import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "ru" | "en";

export type Profile = {
  region: "cis" | "south-asia" | "philippines" | "africa" | "other";
  roleFamily:
    | "fb"
    | "housekeeping"
    | "spa"
    | "front-office"
    | "kitchen"
    | "dive"
    | "engineering"
    | "hr-admin"
    | "entertainment"
    | "other";
  experience: "none" | "1-2" | "3plus";
  english: "basic" | "conversational" | "fluent";
};

export type Suspicion = {
  id: string;
  at: string;
  who: string;
  url: string;
  channel: string;
  note: string;
};

export type AppState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  profile: Profile;
  setProfile: (patch: Partial<Profile>) => void;
  wizardDone: boolean;
  setWizardDone: (v: boolean) => void;
  doneSteps: string[];
  toggleStep: (id: string) => void;
  docs: Record<string, boolean>;
  toggleDoc: (id: string) => void;
  contractFlags: Record<string, boolean>;
  toggleContract: (id: string) => void;
  reports: Suspicion[];
  addReport: (row: Omit<Suspicion, "id" | "at">) => void;
  removeReport: (id: string) => void;
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      lang: "ru",
      setLang: (lang) => set({ lang }),
      profile: {
        region: "cis",
        roleFamily: "fb",
        experience: "1-2",
        english: "conversational",
      },
      setProfile: (patch) => set({ profile: { ...get().profile, ...patch } }),
      wizardDone: false,
      setWizardDone: (v) => set({ wizardDone: v }),
      doneSteps: [],
      toggleStep: (id) => {
        const cur = get().doneSteps;
        set({
          doneSteps: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      docs: {},
      toggleDoc: (id) => set({ docs: { ...get().docs, [id]: !get().docs[id] } }),
      contractFlags: {},
      toggleContract: (id) =>
        set({
          contractFlags: { ...get().contractFlags, [id]: !get().contractFlags[id] },
        }),
      reports: [],
      addReport: (row) =>
        set({
          reports: [
            {
              id: `rep-${Date.now()}`,
              at: new Date().toISOString(),
              ...row,
            },
            ...get().reports,
          ].slice(0, 40),
        }),
      removeReport: (id) =>
        set({ reports: get().reports.filter((r) => r.id !== id) }),
    }),
    {
      name: "atoll-path-v1",
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return {
          ...current,
          ...p,
          reports: Array.isArray(p.reports) ? p.reports : [],
          profile: { ...current.profile, ...p.profile },
          docs: p.docs ?? {},
          contractFlags: p.contractFlags ?? {},
          doneSteps: p.doneSteps ?? [],
        };
      },
    },
  ),
);
