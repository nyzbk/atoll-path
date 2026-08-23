import {
  uid,
  type Candidate,
  type DocLang,
  type TemplateMeta,
  type TrackerRow,
} from "./docs-types";

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "cv",
    kind: "paper",
    formats: ["PDF", "DOCX", "HTML"],
    needsWizard: true,
    title: { ru: "CV для Maldives hospitality", en: "Maldives hospitality CV" },
    blurb: {
      ru: "1–2 страницы, английский, без номера паспорта. Reception, host, F&B, bar, housekeeping.",
      en: "1–2 pages, English, no passport number. Reception, host, F&B, bar, housekeeping.",
    },
  },
  {
    id: "cover",
    kind: "paper",
    formats: ["PDF", "DOCX", "TXT"],
    needsWizard: false,
    title: { ru: "Cover letter", en: "Cover letter" },
    blurb: {
      ru: "Короткое письмо в HR резорта. Без агентской подписи.",
      en: "A short letter to resort HR. No agency signature.",
    },
  },
  {
    id: "email",
    kind: "paper",
    formats: ["TXT", "HTML", "PDF"],
    needsWizard: false,
    title: { ru: "Письмо HR", en: "Email to HR" },
    blurb: {
      ru: "Тема + 6–8 строк + вопрос про joining ticket.",
      en: "Subject + 6–8 lines + joining-ticket question.",
    },
  },
  {
    id: "tracker",
    kind: "sheet",
    formats: ["CSV", "XLS", "PDF"],
    needsWizard: false,
    title: { ru: "Трекер откликов", en: "Application tracker" },
    blurb: {
      ru: "Дата, резорт, роль, канал, статус. 30–80 откликов — нормальная воронка.",
      en: "Date, resort, role, channel, status. 30–80 applications is a normal funnel.",
    },
  },
  {
    id: "offer-check",
    kind: "form",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Проверка оффера", en: "Offer verification" },
    blurb: {
      ru: "Вставьте текст оффера. Красные флаги до согласия и до покупки билета.",
      en: "Paste the offer. Red flags before you agree or buy a ticket.",
    },
  },
  {
    id: "contract-q",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Вопросы к контракту", en: "Contract questions" },
    blurb: {
      ru: "Зарплата, service charge, жильё, питание, билет, паспорт, probation.",
      en: "Pay, service charge, housing, meals, ticket, passport, probation.",
    },
  },
  {
    id: "doc-check",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Чеклист документов", en: "Document checklist" },
    blurb: {
      ru: "Паспорт, фото, CV, справки. Не сдавайте оригинал паспорта посреднику.",
      en: "Passport, photo, CV, clearances. Do not hand the original passport to a middleman.",
    },
  },
  {
    id: "scam-check",
    kind: "form",
    formats: ["PDF", "HTML"],
    needsWizard: false,
    title: { ru: "Проверка на скам", en: "Scam-check form" },
    blurb: {
      ru: "Не вердикт «это мошенники», а проверяемый список рисков.",
      en: "Not a “this is a scam” verdict — a checkable risk list.",
    },
  },
  {
    id: "interview",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Ответы на интервью", en: "Interview answers" },
    blurb: {
      ru: "Заготовки на английском. Не выдумывайте опыт — пишите свой.",
      en: "English prompts. Do not invent experience — write yours.",
    },
  },
  {
    id: "phrases",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "English phrase pack", en: "English phrase pack" },
    blurb: {
      ru: "Фразы для reception, guest relations и бара.",
      en: "Phrases for reception, guest relations and bar service.",
    },
  },
  {
    id: "im30-pack",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Лист данных для IM30 / Xpat", en: "IM30 / Xpat data sheet" },
    blurb: {
      ru: "Поля, которые работодатель запросит. Не подавайте IM30 сами. Официальный бланк — на immigration.gov.mv/downloads.",
      en: "Fields the employer will ask for. You do not file IM30 yourself. Official blank: immigration.gov.mv/downloads.",
    },
  },
  {
    id: "medical-prep",
    kind: "paper",
    formats: ["PDF", "DOCX"],
    needsWizard: false,
    title: { ru: "Медкомиссия: что готовить", en: "Medical prep" },
    blurb: {
      ru: "Список работодателя, не «45 дней» из гайдов. Агентство не продаёт вам медосмотр.",
      en: "The employer’s list, not a “45 days” figure from guides. An agency does not sell you this medical.",
    },
  },
];

function esc(s: string): string {
  return s
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function ph(value: string, fallback: string): string {
  const v = value.trim();
  if (v) return esc(v);
  return `<span class="ph">${esc(fallback)}</span>`;
}

function contactLine(c: Candidate): string {
  const bits = [c.city, c.nationality, c.email, c.phone].filter((x) => x.trim());
  if (bits.length) return esc(bits.join(" · "));
  return `<span class="ph">City · Nationality · email · phone</span>`;
}

function englishLabel(c: Candidate): string {
  if (c.english === "basic") return "English: basic (honest, still learning)";
  if (c.english === "conversational") return "English: conversational";
  if (c.english === "fluent") return "English: fluent";
  return "";
}

export function generateHtml(templateId: string, c: Candidate, lang: DocLang): string {
  switch (templateId) {
    case "cv":
      return cvHtml(c);
    case "cover":
      return coverHtml(c, lang);
    case "email":
      return emailHtml(c);
    case "offer-check":
      return offerCheckHtml();
    case "contract-q":
      return contractQHtml();
    case "doc-check":
      return docCheckHtml();
    case "scam-check":
      return scamPaperHtml();
    case "interview":
      return interviewHtml(c);
    case "phrases":
      return phrasesHtml();
    case "im30-pack":
      return im30PackHtml(c);
    case "medical-prep":
      return medicalPrepHtml();
    default:
      return `<p>${esc(c.fullName || "Untitled")}</p>`;
  }
}

function cvHtml(c: Candidate): string {
  const jobs = (c.jobs.length ? c.jobs : [{ employer: "", role: "", dates: "", duties: "" }])
    .map((j) => {
      return `<div class="block">
        <p class="job-h">${ph(j.role, "[Role]")} — ${ph(j.employer, "[Hotel / employer]")}</p>
        <p class="muted">${ph(j.dates, "[MM/YYYY – MM/YYYY]")}</p>
        <p>${ph(j.duties, "[2–4 factual duties. Do not invent guest numbers or awards.]")}</p>
      </div>`;
    })
    .join("");

  const skills = c.skills.trim()
    ? esc(c.skills)
    : `<span class="ph">[POS / Micros, guest greeting, tray service, wine service, housekeeping cart — only skills you have]</span>`;

  return `<header class="cv-head">
      <h1>${ph(c.fullName, "[FULL NAME]")}</h1>
      <p class="role">${ph(c.targetRole, "[Target role, e.g. Waiter]")}</p>
      <p class="muted">${contactLine(c)}</p>
      <p class="muted">${englishLabel(c) || `<span class="ph">[English level — be honest]</span>`}${c.readyDate.trim() ? ` · Available: ${esc(c.readyDate)}` : ` · <span class="ph">[Join date]</span>`}</p>
    </header>
    <section>
      <h2>Profile</h2>
      <p>Hospitality candidate targeting Maldives resort ${ph(c.targetRole, "[role]")}. ${c.yearsExperience.trim() ? `${esc(c.yearsExperience)} of relevant work. ` : `<span class="ph">[Years of experience]</span> `}Ready to live on a staff island, work 6-day rosters, and join on a 12-month contract. Work permit and Work e-Visa must be filed by the employer through Xpat — I do not pay agencies for an offer.</p>
    </section>
    <section>
      <h2>Experience</h2>
      ${jobs}
    </section>
    <section>
      <h2>Skills</h2>
      <p>${skills}</p>
    </section>
    <section>
      <h2>Certificates</h2>
      <p>${ph(c.certificates, "[Food safety / first aid / spa license — only real ones. Empty is better than a fake.]")}</p>
    </section>
    <section>
      <h2>References</h2>
      <p>${ph(c.references, "[Name, role, hotel, email or phone — ask them first]")}</p>
    </section>
    <p class="fine">Do not put a passport number, national ID or bank details on a CV you email widely. Generated in Atoll Path (free document helper — not a licensed employment agency).</p>`;
}

function coverHtml(c: Candidate, lang: DocLang): string {
  const name = ph(c.fullName, "[Your name]");
  const role = ph(c.targetRole, "[Role]");
  const nat = ph(c.nationality, "[Nationality]");
  const ruNote =
    lang === "ru" || lang === "bilingual"
      ? `<p class="muted">Ниже — английский текст для HR. Русский черновик не отправляйте в резорт.</p>`
      : "";
  return `${ruNote}
    <p>${new Date().toISOString().slice(0, 10)}</p>
    <p>Dear Hiring Manager,</p>
    <p>I am applying for the ${role} position at your Maldives resort. I am ${nat}, based in ${ph(c.city, "[City]")}, with ${ph(c.yearsExperience, "[experience]")} in hospitality.</p>
    <p>${deptCoverLine(c.targetRole)}</p>
    <p>I can join from ${ph(c.readyDate, "[date]")}. I understand the role is island-based: staff housing if the contract says so, staff canteen, 6-day weeks, and a 12-month contract. I do not use a paid placement agency.</p>
    <p>Please find my CV attached. Could you confirm in writing: (1) basic salary and currency, (2) service charge practice at this property, (3) whether joining airfare is provided, (4) that the work permit / Work e-Visa is filed by the employer in Xpat?</p>
    <p>Thank you for your time.</p>
    <p>Sincerely,<br/>${name}<br/>${ph(c.email, "[email]")} · ${ph(c.phone, "[phone]")}</p>`;
}

function deptCoverLine(role: string): string {
  const r = role.toLowerCase();
  if (/housekeep|room attendant|public area/.test(r)) {
    return "For housekeeping: I am prepared for physical room standards, cart work, and guest privacy. Please replace this sentence with duties you have actually done.";
  }
  if (/bar|bartend|barback|barista/.test(r)) {
    return "For bar service: I can describe drinks I have actually made. Alcohol service exists only in licensed resorts — I understand the house rules.";
  }
  if (/host|hostess|guest relation|gro\b/.test(r)) {
    return "For guest-facing roles: I can greet, seat, and escalate complaints in English at my stated level. I will not invent fluent English.";
  }
  if (/recept|front office|reservation/.test(r)) {
    return "For front office / reservations: I can handle check-in language and PMS names only if they appear in my CV. I will not claim Opera/Micros without using them.";
  }
  if (/spa|therapist|beautic/.test(r)) {
    return "For spa: I will attach only licences I hold. Beautician quotas are under localisation pressure — I still apply only where the posting is open.";
  }
  if (/\bit\b|engineer|technic/.test(r)) {
    return "For technical roles: I list systems I have supported, not a generic “IT expert” line. Quota risk on some engineering titles is higher — I will match the job title on paper.";
  }
  if (/commis|chef|steward|kitchen/.test(r)) {
    return "For kitchen / stewarding: I am ready for heat, long mise-en-place, and food-safety rules. Certificates listed on the CV are real.";
  }
  return "I will keep this paragraph factual: only duties I have done, only English I actually speak.";
}

function emailHtml(c: Candidate): string {
  const role = c.targetRole.trim() || "[Role]";
  const name = c.fullName.trim() || "[Name]";
  const nat = c.nationality.trim() || "[Nationality]";
  return `<p><strong>Subject:</strong> ${esc(role)} — ${esc(name)} — ${esc(nat)} — Immediate joiner</p>
    <p>Dear HR Team,</p>
    <p>Please consider my application for <strong>${ph(c.targetRole, "[Role]")}</strong>.</p>
    <p>${ph(c.yearsExperience, "[X years]")} hospitality experience. English: ${ph(c.english, "[level]")}. Nationality: ${ph(c.nationality, "[nationality]")}. I can join from ${ph(c.readyDate, "[date]")} on a 12-month contract and live in staff village.</p>
    <p>CV is attached (PDF). I apply directly — no agency fee.</p>
    <p>Please confirm: joining ticket, staff housing & meals, average service charge, and that work permit + Work e-Visa are employer-filed in Xpat.</p>
    <p>Kind regards,<br/>${ph(c.fullName, "[Name]")}<br/>${ph(c.email, "[email]")} · ${ph(c.phone, "[phone]")}</p>`;
}

function offerCheckHtml(): string {
  return `<h1>Offer verification checklist</h1>
    <p>Tick in the right-hand panel after you read the letterhead PDF. Do not buy a ticket on a WhatsApp promise.</p>
    <ol>
      <li>PDF on company letterhead, signed, with a job title that will match the Xpat quota.</li>
      <li>Basic salary as a number and a currency (USD or MVR) — not “up to $3,000”. </li>
      <li>Service charge: formula, pool, and pay cadence. Ask for last 3 months’ average at this property.</li>
      <li>Joining airfare: who buys, which route, what happens if you fail probation.</li>
      <li>Return / repatriation after a completed contract.</li>
      <li>Work permit + Work e-Visa cost: employer, via Xpat — not a personal card.</li>
      <li>Housing and meals: included, or the deduction is written.</li>
      <li>Roster, off days, overtime, probation length.</li>
      <li>Passport stays with you. HR may copy it; they should not keep it “for the visa” indefinitely.</li>
      <li>Sender email domain matches the hotel / group website. Not Gmail, not WhatsApp-only.</li>
    </ol>
    <p class="fine">Atoll Path is a free helper. It does not certify employers and is not Maldives Immigration.</p>`;
}

function contractQHtml(): string {
  return `<h1>Questions to send HR before you sign</h1>
    <p>Copy into email. If they refuse to answer in writing, treat that as a signal.</p>
    <ol>
      <li>What is the basic salary, in which currency, and on which pay day?</li>
      <li>What was the average service charge per month for this outlet over the last 3 months?</li>
      <li>Who purchases the joining ticket? Economy? Which hub (MLE via Dubai / Istanbul / Colombo…)?</li>
      <li>If I fail probation, who pays the return ticket?</li>
      <li>Will you file my work permit and Work e-Visa in Xpat at company cost? Can I receive the permit number / Entry Pass before I fly?</li>
      <li>Staff room: how many people, AC, bathroom, distance to work?</li>
      <li>Are meals included at the staff canteen with no deduction?</li>
      <li>Weekly roster and guaranteed off days?</li>
      <li>Will my passport remain in my possession after arrival?</li>
      <li>Contract length, notice period, and whether the job title on paper is the title you will file for quota?</li>
    </ol>`;
}

function docCheckHtml(): string {
  return `<h1>Document checklist (before you spray CVs)</h1>
    <ul>
      <li>Passport valid ≥ 12 months on the planned arrival date. Name matches certificates.</li>
      <li>Immigration-style photo (the employer / Xpat pack will specify size).</li>
      <li>English CV, 1–2 pages, business photo optional, <em>no passport number</em>.</li>
      <li>Certificates you actually hold (food safety, spa license, dive, first aid).</li>
      <li>Two references who will pick up the phone.</li>
      <li>Police clearance — recent, English translation if needed. Timing depends on your country; do not buy a fake.</li>
      <li>Ready for a medical at the <em>employer-named</em> clinic after offer — not a pre-paid “agency medical”.</li>
      <li>60–90s intro video: name, role, English, willingness to live on staff island.</li>
      <li>Yellow fever certificate only if your routing requires it — not a default for everyone.</li>
    </ul>
    <p>After a real offer: colour passport bio-page scan, Entry Pass / employer instructions, e-Visa copy once filed. Do not courier the original passport to a stranger.</p>`;
}

function scamPaperHtml(): string {
  return `<h1>Scam-check notes</h1>
    <p>Fill the form in the right panel. This page is your printable record. We do not declare “100% fraud” — we list risks you can verify.</p>
    <h2>Always verify</h2>
    <ul>
      <li>Company website and careers page exist; HR mail uses that domain.</li>
      <li>No payment for “quota”, “visa processing”, “seat booking”, or “medical before offer” to a personal card or crypto wallet.</li>
      <li>Work permit is filed by the employer in Xpat. You can later use the official verify page on xpat.egov.mv.</li>
      <li>“Fly as a tourist, we convert later” is a red flag under the current Entry Pass + Work e-Visa path.</li>
    </ul>
    <p class="fine">If you are already in trouble: keep copies, stop paying, contact your embassy and, in the Maldives, labour / HRCM channels — not the person who invoiced you.</p>`;
}

function interviewHtml(c: Candidate): string {
  return `<h1>Interview prep — ${ph(c.targetRole, "[Role]")}</h1>
    <p>Write your own answers in the brackets. Do not claim fluent English or fake hotels.</p>
    <h2>1. Tell me about yourself</h2>
    <p>${ph(c.fullName, "[Name]")}, ${ph(c.nationality, "[nationality]")}. ${ph(c.yearsExperience, "[experience]")}. I want this ${ph(c.targetRole, "[role]")} on a Maldives island because [your reason — growth / savings / language — keep it short].</p>
    <h2>2. Why the Maldives, not a city hotel?</h2>
    <p>I understand staff-island life: shared room, 6-day week, limited exit. I am applying with that in mind, not for a holiday.</p>
    <h2>3. A difficult guest</h2>
    <p>[Describe one real incident: listen, own the bit you can fix, escalate, follow up. No movie scripts.]</p>
    <h2>4. English</h2>
    <p>My level is ${ph(c.english, "[honest level]")}. I can [greet / take an order / handle a complaint] and I will keep learning on island.</p>
    <h2>5. Questions you ask them</h2>
    <ul>
      <li>Basic + average service charge, last 3 months, this property?</li>
      <li>Joining ticket and probation return ticket?</li>
      <li>Work permit / e-Visa filed by you in Xpat?</li>
      <li>Staff room occupancy and canteen?</li>
    </ul>`;
}

function phrasesHtml(): string {
  return `<h1>English phrase pack — resort floor</h1>
    <h2>Reception / host</h2>
    <ul>
      <li>Good evening, welcome to [Resort]. May I have the name of the reservation?</li>
      <li>The boat leaves at 15:30 from the jetty. I will print your water-taxi voucher.</li>
      <li>I am sorry for the wait. Let me check with housekeeping and call you back in ten minutes.</li>
      <li>This is a cashless island. We will add it to the room bill. Is that alright?</li>
    </ul>
    <h2>Guest relations</h2>
    <ul>
      <li>I can arrange a snorkel briefing at 09:00. Are there any medical conditions we should know?</li>
      <li>I understand this is disappointing. Here is what I can do today, and here is what I need to ask my manager.</li>
    </ul>
    <h2>F&B / bar</h2>
    <ul>
      <li>Still or sparkling water? And would you like to hear the catch of the day?</li>
      <li>This cocktail contains alcohol. Can I offer a non-alcoholic version?</li>
      <li>I will repeat the order: one tuna sashimi, one coconut curry, mild spice. Is that correct?</li>
    </ul>
    <h2>Boundaries</h2>
    <ul>
      <li>I am not allowed in the guest villa after my shift. I can radio the duty manager.</li>
      <li>I cannot take cash personally. Tips go through the service-charge policy.</li>
    </ul>`;
}

function im30PackHtml(c: Candidate): string {
  return `<h1>Data sheet for IM30 / Xpat — not a filing</h1>
    <p>Maldives Immigration publishes <strong>[IM30] Visa Applicant Information Form</strong> on the official Downloads page. The <em>employer</em> (or their eFaas user) uploads your data in Xpat. You do not register as a jobseeker to issue your own work permit.</p>
    <p>Official blank: <a href="https://immigration.gov.mv/downloads">immigration.gov.mv/downloads</a>. Download the 2026 PDF there. This page is only a list of facts they will ask you to send.</p>
    <h2>Identity (as in the passport)</h2>
    <ul>
      <li>Full name: ${ph(c.fullName, "[exactly as the bio page]")}</li>
      <li>Nationality: ${ph(c.nationality, "[nationality]")}</li>
      <li>Passport number: <span class="ph">[fill on the official IM30 / send as a scan to corporate HR — do not type it into random websites]</span></li>
      <li>Date of birth / sex / place of issue / expiry (≥ 12 months on arrival)</li>
      <li>Photo to Maldives Immigration standard (the employer pack specifies size)</li>
    </ul>
    <h2>What you send vs what they file</h2>
    <ul>
      <li>You: colour bio-page scan, photo, CV, certificates, police clearance if asked, signed offer.</li>
      <li>They: quota slot, employment approval / work permit, Entry Pass, later Work e-Visa (within 15 days of arrival).</li>
      <li>eFaas is the employer’s (and later the worker’s) national login — not a DIY visa shop.</li>
    </ul>
    <h2>Do not</h2>
    <ul>
      <li>Do not pay a Telegram account to “submit IM30 for you”.</li>
      <li>Do not courier the original passport to a stranger.</li>
      <li>Do not treat this helper as Maldives Immigration.</li>
    </ul>
    <p class="fine">Atoll Path is a free self-help editor. Files stay on this device.</p>`;
}

function medicalPrepHtml(): string {
  return `<h1>Medical prep — employer list first</h1>
    <p>Guides often say “foreign medical report, valid 45 days”. That figure is <strong>not</strong> on the Immigration Work Visa page we checked. Do not treat 45 days as law. Use the clinic list and validity the <em>employer</em> sends after a real offer.</p>
    <h2>Before an offer</h2>
    <ul>
      <li>Do not pay an agency for a “Maldives medical package”.</li>
      <li>Keep vaccination records you already have. Yellow fever only if your routing requires it.</li>
    </ul>
    <h2>After a signed offer, still at home (only if HR asks)</h2>
    <ul>
      <li>Ask: which tests, which language, which clinic, who pays, how they want the scan named.</li>
      <li>Typical asks (confirm, do not assume): chest X-ray, infectious-disease panel, general fitness.</li>
      <li>Send to the corporate HR domain, not a Gmail “visa officer”.</li>
    </ul>
    <h2>After arrival</h2>
    <ul>
      <li>Local work-permit medical at an accredited Maldivian centre is common. Tree Top and others advertise packages — the employer usually books this, not you hunting Instagram clinics.</li>
      <li>Work e-Visa is due within 15 days of arrival on a valid work permit. The medical is part of <em>their</em> Xpat pack, not a tourist errand.</li>
    </ul>
    <p class="fine">Not medical advice. Not a copy of a government form. If HR’s PDF differs, HR’s PDF wins.</p>`;
}

export function starterTracker(): TrackerRow[] {
  return [
    {
      id: uid("row"),
      date: new Date().toISOString().slice(0, 10),
      resort: "",
      role: "",
      channel: "Job-Maldives",
      hrEmail: "",
      status: "draft",
      ticketAsked: false,
      notes: "",
    },
  ];
}

export const MISSING_LABEL: Record<string, { ru: string; en: string }> = {
  fullName: { ru: "Имя", en: "Full name" },
  nationality: { ru: "Гражданство", en: "Nationality" },
  email: { ru: "Email", en: "Email" },
  phone: { ru: "Телефон", en: "Phone" },
  targetRole: { ru: "Роль", en: "Role" },
  english: { ru: "Английский", en: "English" },
  experience: { ru: "Опыт (работодатель + роль)", en: "Experience (employer + role)" },
  skills: { ru: "Навыки", en: "Skills" },
};
