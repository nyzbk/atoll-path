import type { GuideCopy } from "@/lib/maldives/gate-c-copy";

export function GuideBlock({ copy }: { copy: GuideCopy }) {
  return (
    <article className="mt-8 max-w-3xl">
      {copy.title ? (
        <h2 className="font-display text-2xl text-[#202124]">{copy.title}</h2>
      ) : null}
      <div className="mt-4 grid gap-4">
        {copy.nodes.map((n, i) => {
          if (n.type === "h2") {
            return (
              <h3 key={`h-${i}`} className="mt-2 font-display text-xl text-[#202124]">
                {n.text}
              </h3>
            );
          }
          if (n.type === "p") {
            return (
              <p key={`p-${i}`} className="text-[15px] leading-relaxed text-[#5f6368]">
                {n.text}
              </p>
            );
          }
          const List = n.type === "ol" ? "ol" : "ul";
          return (
            <List
              key={`l-${i}`}
              className={
                n.type === "ol"
                  ? "list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#5f6368]"
                  : "list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#5f6368]"
              }
            >
              {n.items.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </List>
          );
        })}
      </div>
    </article>
  );
}
