import { Input, Textarea } from "@/components/ui/input";
import { completeness } from "@/lib/maldives/docs-store";
import { MISSING_LABEL } from "@/lib/maldives/templates";
import { ROLE_PRESETS, type Candidate } from "@/lib/maldives/docs-types";

export function FieldPanel({
  candidate,
  setCandidate,
  setJob,
  addJob,
  ru,
  onRebuild,
}: {
  candidate: Candidate;
  setCandidate: (p: Partial<Candidate>) => void;
  setJob: (i: number, p: Partial<Candidate["jobs"][number]>) => void;
  addJob: () => void;
  ru: boolean;
  onRebuild?: () => void;
}) {
  const { pct, missing } = completeness(candidate);
  return (
    <div className="docs-side-scroll">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#80868b]">
          {ru ? "Данные кандидата" : "Candidate"}
        </p>
        <p className="font-mono text-[12px] tabular-nums text-[#3c4043]">{pct}%</p>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#e8eaed]">
        <div className="h-full bg-[#3d8a83]" style={{ width: `${pct}%` }} />
      </div>
      {missing.length ? (
        <p className="mt-2 text-[12px] leading-relaxed text-[#b06000]">
          {ru ? "Не хватает: " : "Missing: "}
          {missing.map((k) => (ru ? MISSING_LABEL[k]?.ru : MISSING_LABEL[k]?.en) ?? k).join(", ")}
        </p>
      ) : (
        <p className="mt-2 text-[12px] text-[#1e6b4f]">
          {ru ? "Критические поля заполнены." : "Critical fields are filled."}
        </p>
      )}

      <label className="docs-label">{ru ? "Имя как в паспорте (латиница)" : "Name as in passport (Latin)"}</label>
      <Input
        className="docs-input"
        value={candidate.fullName}
        onChange={(e) => setCandidate({ fullName: e.target.value })}
        placeholder="Anna Ivanova"
      />
      <label className="docs-label">{ru ? "Гражданство" : "Nationality"}</label>
      <Input
        className="docs-input"
        value={candidate.nationality}
        onChange={(e) => setCandidate({ nationality: e.target.value })}
        placeholder="Kazakhstan"
      />
      <label className="docs-label">{ru ? "Город" : "City"}</label>
      <Input
        className="docs-input"
        value={candidate.city}
        onChange={(e) => setCandidate({ city: e.target.value })}
      />
      <label className="docs-label">Email</label>
      <Input
        className="docs-input"
        type="email"
        value={candidate.email}
        onChange={(e) => setCandidate({ email: e.target.value })}
      />
      <label className="docs-label">{ru ? "Телефон" : "Phone"}</label>
      <Input
        className="docs-input"
        value={candidate.phone}
        onChange={(e) => setCandidate({ phone: e.target.value })}
      />
      <label className="docs-label">{ru ? "Роль" : "Role"}</label>
      <select
        className="docs-input h-11 w-full rounded-xl border border-[#dadce0] bg-white px-3 text-sm"
        value={candidate.targetRole}
        onChange={(e) => setCandidate({ targetRole: e.target.value })}
      >
        {ROLE_PRESETS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <label className="docs-label">{ru ? "Английский" : "English"}</label>
      <select
        className="docs-input h-11 w-full rounded-xl border border-[#dadce0] bg-white px-3 text-sm"
        value={candidate.english}
        onChange={(e) => setCandidate({ english: e.target.value as Candidate["english"] })}
      >
        <option value="">{ru ? "Не указан" : "Not set"}</option>
        <option value="basic">Basic</option>
        <option value="conversational">Conversational</option>
        <option value="fluent">Fluent</option>
      </select>
      <label className="docs-label">{ru ? "Готовность выйти" : "Join date"}</label>
      <Input
        className="docs-input"
        value={candidate.readyDate}
        onChange={(e) => setCandidate({ readyDate: e.target.value })}
        placeholder="Immediate / Oct 2026"
      />
      <label className="docs-label">{ru ? "Опыт (словами)" : "Experience (words)"}</label>
      <Input
        className="docs-input"
        value={candidate.yearsExperience}
        onChange={(e) => setCandidate({ yearsExperience: e.target.value })}
        placeholder="3 years F&B"
      />
      <label className="docs-label">{ru ? "Навыки" : "Skills"}</label>
      <Textarea
        className="docs-input min-h-20"
        value={candidate.skills}
        onChange={(e) => setCandidate({ skills: e.target.value })}
      />
      <label className="docs-label">{ru ? "Сертификаты" : "Certificates"}</label>
      <Textarea
        className="docs-input min-h-16"
        value={candidate.certificates}
        onChange={(e) => setCandidate({ certificates: e.target.value })}
      />
      <label className="docs-label">{ru ? "Рекомендации" : "References"}</label>
      <Textarea
        className="docs-input min-h-16"
        value={candidate.references}
        onChange={(e) => setCandidate({ references: e.target.value })}
      />

      <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[#80868b]">
        {ru ? "Места работы" : "Work history"}
      </p>
      {candidate.jobs.map((j, i) => (
        <div key={i} className="mt-3 rounded-xl border border-[#dadce0] p-3">
          <Input
            className="docs-input mb-2"
            placeholder="Employer"
            value={j.employer}
            onChange={(e) => setJob(i, { employer: e.target.value })}
          />
          <Input
            className="docs-input mb-2"
            placeholder="Role"
            value={j.role}
            onChange={(e) => setJob(i, { role: e.target.value })}
          />
          <Input
            className="docs-input mb-2"
            placeholder="MM/YYYY – MM/YYYY"
            value={j.dates}
            onChange={(e) => setJob(i, { dates: e.target.value })}
          />
          <Textarea
            className="docs-input min-h-16"
            placeholder={ru ? "Факты, не выдумки" : "Facts, not invention"}
            value={j.duties}
            onChange={(e) => setJob(i, { duties: e.target.value })}
          />
        </div>
      ))}
      <button type="button" className="mt-2 text-[13px] text-[#3d8a83]" onClick={addJob}>
        {ru ? "+ место работы" : "+ job"}
      </button>
      {onRebuild ? (
        <button
          type="button"
          className="mt-4 h-10 w-full rounded-xl border border-[#dadce0] text-[13px]"
          onClick={onRebuild}
        >
          {ru ? "Подставить данные в шаблон заново" : "Rebuild template from fields"}
        </button>
      ) : null}
      <p className="mt-4 text-[11px] leading-relaxed text-[#80868b]">
        {ru
          ? "Не указывайте номер паспорта в CV, которое уйдёт на 40 резортов. Скан паспорта не хранится здесь."
          : "Do not put a passport number on a CV you send to 40 resorts. Passport scans are not stored here."}
      </p>
    </div>
  );
}
