import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsShell } from "@/components/docs/docs-shell";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/documents")({
  head: () => pageHead("documents"),
  component: DocumentsLayout,
});

function DocumentsLayout() {
  return (
    <DocsShell>
      <Outlet />
    </DocsShell>
  );
}
