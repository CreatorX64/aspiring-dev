import { formatDistance } from "date-fns";
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

export function ChallengeCard({ challenge }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    icon,
    frequency,
    created_at,
    description,
    entries_aggregate,
    total_entries
  } = challenge;

  const progressValue = Math.floor(
    (entries_aggregate.aggregate.count / total_entries) * 100
  );

  return (
    <div
      onClick={() => navigate(`/challenge-details/${id}`)}
      className={`group flex min-h-[430px] flex-1 grow-0 basis-80 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white py-9 px-11 shadow-md shadow-slate-200 transition hover:-translate-y-2 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <span className="text-5xl">{icon}</span>
        <span
          className={`rounded-full px-2 py-1 text-xs font-extrabold uppercase tracking-widest ${
            frequency === "daily" ? "bg-emerald-100" : "bg-sky-100"
          }`}
        >
          {frequency}
        </span>
      </div>

      <h3 className="mt-8 mb-1 text-xl font-bold line-clamp-1">{title}</h3>

      <p className="flex items-center space-x-1 text-sm text-gray-400">
        <ClockIcon className="h-5 w-5" />
        <span>
          Started{" "}
          {formatDistance(new Date(created_at), new Date(), {
            addSuffix: true
          })}
        </span>
      </p>

      <p className="mt-7 line-clamp-4">{description}</p>

      <div className="mt-auto flex items-center justify-between">
        <div className="h-16 w-16">
          <CircularProgressbar
            value={progressValue}
            text={`${progressValue}%`}
            strokeWidth={10}
            styles={buildStyles({
              textSize: "20px",
              trailColor: "#cbd5e1",
              pathColor: "#60a5fa"
            })}
          />
        </div>

        <ArrowRightIcon className="w-8 text-slate-300 transition group-hover:text-blue-200" />
      </div>
    </div>
  );
}
