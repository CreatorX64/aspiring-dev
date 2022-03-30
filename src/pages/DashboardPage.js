import { gql, useQuery } from "@apollo/client";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

import ChallengeCard from "../components/ChallengeCard";
import ErrorMessage from "../components/ErrorMessage";

const GET_CHALLENGES = gql`
  query {
    challenges {
      id
      icon
      frequency
      title
      created_at
      description
      total_entries
      entries_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export default function DashboardPage() {
  const { error, loading, data } = useQuery(GET_CHALLENGES);
  const navigate = useNavigate();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return (
      <div className="flex items-end justify-center pt-36">
        <MutatingDots
          height="100"
          width="100"
          color="#93c5fd"
          ariaLabel="loading"
          secondaryColor="#bfdbfe"
        />
      </div>
    );
  }

  return (
    <div className="container">
      {/* Current challanges */}
      <div>
        <h2 className="mb-9 text-2xl font-bold">
          {data.challenges.length === 0
            ? "You don't have any challenges yet  🐣"
            : "Your current challanges"}
        </h2>

        <div className="flex flex-wrap gap-10">
          <div
            onClick={() => navigate("/new-challenge")}
            className="group flex min-h-[430px] flex-1 grow-0 basis-80 cursor-pointer flex-col items-center justify-center space-y-2 rounded-[20px] border border-slate-300 py-9 px-11 transition hover:bg-slate-200"
          >
            <PlusCircleIcon className="h-16 w-16 text-slate-300 transition group-hover:text-slate-400" />
            <p className="text-xl font-semibold text-slate-400 transition group-hover:text-slate-500">
              Add new challenge
            </p>
          </div>

          {data.challenges.map((challenge) => {
            return <ChallengeCard key={challenge.id} challenge={challenge} />;
          })}
        </div>
      </div>
    </div>
  );
}
