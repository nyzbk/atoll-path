import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";
import { CONTACT_EMAIL } from "@/lib/maldives/site-copy";
import { GuideBlock } from "@/components/guide-block";
import { contactGuide } from "@/lib/maldives/gate-c-copy";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("contact"),
  component: ContactPage,
});

export function ContactPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{ru ? "Контакт" : "Contact"}</h1>
      <p className="mt-6 text-lg">
        <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <GuideBlock copy={contactGuide[lang]} />
    </div>
  );
}
