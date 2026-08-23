import { sourceById } from "@/lib/maldives/knowledge";
import { Badge } from "@/components/ui/badge";

export function SourceChips({ ids }: { ids: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => {
        const s = sourceById(id);
        if (!s) return null;
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            <Badge tone={s.kind === "official" ? "official" : "muted"}>{s.name}</Badge>
          </a>
        );
      })}
    </div>
  );
}
