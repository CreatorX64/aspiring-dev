import { format } from "date-fns";
import { useState } from "react";

export function EntryLine({ entry }) {
  const [showFullMessage, setShowFullMessage] = useState(false);

  return (
    <div
      key={entry.id}
      className="cursor-pointer rounded-md border p-2 font-bold text-slate-500 transition hover:bg-slate-50"
      title={entry.message}
      onClick={() => setShowFullMessage(!showFullMessage)}
    >
      <p className="mr-3 text-sm font-normal text-slate-400">
        {format(new Date(entry.created_at), "MMM d, yyyy")}
      </p>
      <p className={showFullMessage ? "" : "line-clamp-1"}>{entry.message}</p>
    </div>
  );
}
