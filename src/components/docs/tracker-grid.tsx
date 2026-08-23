import { uid, type TrackerRow } from "@/lib/maldives/docs-types";
import { exportCsv, exportXls } from "@/lib/maldives/export-docs";

const STATUSES: TrackerRow["status"][] = [
  "draft",
  "sent",
  "replied",
  "interview",
  "offer",
  "rejected",
  "scam",
];

export function TrackerGrid({
  rows,
  onChange,
  ru,
}: {
  rows: TrackerRow[];
  onChange: (rows: TrackerRow[]) => void;
  ru: boolean;
}) {
  const patch = (id: string, p: Partial<TrackerRow>) =>
    onChange(rows.map((r) => (r.id === id ? { ...r, ...p } : r)));

  const asExport = () =>
    rows.map((r) => ({
      date: r.date,
      resort: r.resort,
      role: r.role,
      channel: r.channel,
      hrEmail: r.hrEmail,
      status: r.status,
      ticketAsked: r.ticketAsked ? "yes" : "no",
      notes: r.notes,
    }));

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="h-10 rounded-xl bg-[#071314] px-3 text-[13px] text-white"
          onClick={() =>
            onChange([
              ...rows,
              {
                id: uid("row"),
                date: new Date().toISOString().slice(0, 10),
                resort: "",
                role: "",
                channel: "",
                hrEmail: "",
                status: "draft",
                ticketAsked: false,
                notes: "",
              },
            ])
          }
        >
          {ru ? "Добавить строку" : "Add row"}
        </button>
        <button
          type="button"
          className="h-10 rounded-xl border border-[#dadce0] px-3 text-[13px]"
          onClick={() => exportCsv(asExport(), "atoll-applications.csv")}
        >
          CSV
        </button>
        <button
          type="button"
          className="h-10 rounded-xl border border-[#dadce0] px-3 text-[13px]"
          onClick={() => exportXls(asExport(), "Applications", "atoll-applications.xls")}
        >
          Excel
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#dadce0] bg-white">
        <table className="min-w-[860px] w-full text-left text-[13px]">
          <thead className="bg-[#f8f9fa] text-[11px] uppercase tracking-wide text-[#5f6368]">
            <tr>
              {["Date", "Resort", "Role", "Channel", "HR email", "Status", "Ticket?", "Notes"].map(
                (h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[#eceff1]">
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-[118px] rounded-md px-2"
                    type="date"
                    value={r.date}
                    onChange={(e) => patch(r.id, { date: e.target.value })}
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-full min-w-[120px] rounded-md px-2"
                    value={r.resort}
                    onChange={(e) => patch(r.id, { resort: e.target.value })}
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-full min-w-[110px] rounded-md px-2"
                    value={r.role}
                    onChange={(e) => patch(r.id, { role: e.target.value })}
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-full min-w-[110px] rounded-md px-2"
                    value={r.channel}
                    onChange={(e) => patch(r.id, { channel: e.target.value })}
                    placeholder="Jobsicle"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-full min-w-[140px] rounded-md px-2"
                    value={r.hrEmail}
                    onChange={(e) => patch(r.id, { hrEmail: e.target.value })}
                  />
                </td>
                <td className="px-2 py-1">
                  <select
                    className="h-9 rounded-md px-1"
                    value={r.status}
                    onChange={(e) =>
                      patch(r.id, { status: e.target.value as TrackerRow["status"] })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1 text-center">
                  <input
                    type="checkbox"
                    checked={r.ticketAsked}
                    onChange={(e) => patch(r.id, { ticketAsked: e.target.checked })}
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    className="h-9 w-full min-w-[140px] rounded-md px-2"
                    value={r.notes}
                    onChange={(e) => patch(r.id, { notes: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12px] text-[#80868b]">
        {ru
          ? "30–80 откликов на линейную роль — норма. Не платите за «размещение в базе»."
          : "30–80 applications for a line role is normal. Do not pay to “list in a database”."}
      </p>
    </div>
  );
}
