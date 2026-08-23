import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ROLE_PRESETS, type Candidate } from "@/lib/maldives/docs-types";

export function CvWizard({
  candidate,
  setCandidate,
  setJob,
  ru,
  onDone,
}: {
  candidate: Candidate;
  setCandidate: (p: Partial<Candidate>) => void;
  setJob: (i: number, p: Partial<Candidate["jobs"][number]>) => void;
  ru: boolean;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const job = candidate.jobs[0] ?? { employer: "", role: "", dates: "", duties: "" };

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#80868b]">
        {ru ? "Мастер CV" : "CV wizard"} · {step + 1}/4
      </p>
      <h1 className="mt-2 font-display text-3xl text-[#202124]">
        {step === 0 && (ru ? "Какая роль" : "Which role")}
        {step === 1 && (ru ? "Кто вы" : "Who you are")}
        {step === 2 && (ru ? "Опыт — только факты" : "Experience — facts only")}
        {step === 3 && (ru ? "Навыки и сертификаты" : "Skills and certificates")}
      </h1>
      <p className="mt-2 text-sm text-[#5f6368]">
        {ru
          ? "Мы не дописываем отели, дипломы и «fluent». Пустое поле честнее выдумки."
          : "We do not invent hotels, diplomas or “fluent”. An empty field is more honest than fiction."}
      </p>

      <div className="mt-8 grid gap-3">
        {step === 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {ROLE_PRESETS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setCandidate({ targetRole: r })}
                className="min-h-12 rounded-xl border border-[#dadce0] px-4 text-left text-sm data-[on=true]:border-[#3d8a83] data-[on=true]:bg-[#e8f0ee]"
                data-on={candidate.targetRole === r}
              >
                {r}
              </button>
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <>
            <Input
              className="docs-input"
              placeholder={ru ? "Имя латиницей" : "Name in Latin letters"}
              value={candidate.fullName}
              onChange={(e) => setCandidate({ fullName: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder={ru ? "Гражданство" : "Nationality"}
              value={candidate.nationality}
              onChange={(e) => setCandidate({ nationality: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="City"
              value={candidate.city}
              onChange={(e) => setCandidate({ city: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="Email"
              value={candidate.email}
              onChange={(e) => setCandidate({ email: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="Phone"
              value={candidate.phone}
              onChange={(e) => setCandidate({ phone: e.target.value })}
            />
            <select
              className="h-11 rounded-xl border border-[#dadce0] px-3 text-sm"
              value={candidate.english}
              onChange={(e) => setCandidate({ english: e.target.value as Candidate["english"] })}
            >
              <option value="">{ru ? "Английский" : "English"}</option>
              <option value="basic">Basic</option>
              <option value="conversational">Conversational</option>
              <option value="fluent">Fluent</option>
            </select>
            <Input
              className="docs-input"
              placeholder={ru ? "Дата готовности" : "Join date"}
              value={candidate.readyDate}
              onChange={(e) => setCandidate({ readyDate: e.target.value })}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Input
              className="docs-input"
              placeholder={ru ? "Лет опыта словами" : "Years, in words"}
              value={candidate.yearsExperience}
              onChange={(e) => setCandidate({ yearsExperience: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="Employer / hotel"
              value={job.employer}
              onChange={(e) => setJob(0, { employer: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="Role there"
              value={job.role}
              onChange={(e) => setJob(0, { role: e.target.value })}
            />
            <Input
              className="docs-input"
              placeholder="MM/YYYY – MM/YYYY"
              value={job.dates}
              onChange={(e) => setJob(0, { dates: e.target.value })}
            />
            <Textarea
              className="docs-input"
              placeholder={ru ? "2–4 факта. Без выдуманных цифр." : "2–4 facts. No invented numbers."}
              value={job.duties}
              onChange={(e) => setJob(0, { duties: e.target.value })}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <Textarea
              className="docs-input"
              placeholder="Skills"
              value={candidate.skills}
              onChange={(e) => setCandidate({ skills: e.target.value })}
            />
            <Textarea
              className="docs-input"
              placeholder="Certificates"
              value={candidate.certificates}
              onChange={(e) => setCandidate({ certificates: e.target.value })}
            />
            <Textarea
              className="docs-input"
              placeholder="References"
              value={candidate.references}
              onChange={(e) => setCandidate({ references: e.target.value })}
            />
          </>
        ) : null}
      </div>

      <div className="mt-8 flex gap-2">
        {step > 0 ? (
          <Button variant="secondary" type="button" onClick={() => setStep((s) => s - 1)}>
            {ru ? "Назад" : "Back"}
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" onClick={() => setStep((s) => s + 1)}>
            {ru ? "Дальше" : "Next"}
          </Button>
        ) : (
          <Button type="button" onClick={onDone}>
            {ru ? "Открыть документ" : "Open document"}
          </Button>
        )}
      </div>
    </div>
  );
}
