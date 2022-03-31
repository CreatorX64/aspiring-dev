import { useQuery, useMutation } from "@apollo/client";
import { formatDistance, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { ClockIcon } from "@heroicons/react/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Modal from "react-modal";

import { GET_CHALLENGE_BY_ID, CREATE_CHALLENGE_ENTRY } from "../lib/queries";
import ErrorMessage from "../components/ErrorMessage";

// Modal configuration
Modal.setAppElement("#root");
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "16px",
    transform: "translate(-50%, -50%)"
  }
};

export default function ChallengeDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { challengeId } = useParams();
  const { loading, error, data } = useQuery(GET_CHALLENGE_BY_ID, {
    variables: { id: challengeId }
  });
  const [
    createChallengeEntry,
    { loading: loadingEntry, error: errorEntry, data: dataEntry }
  ] = useMutation(CREATE_CHALLENGE_ENTRY, {
    refetchQueries: ["GetChallengeById"]
  });

  useEffect(() => {
    if (!errorEntry && !loadingEntry && dataEntry) {
      setIsModalOpen(false);
      setModalMessage("");
    }
  }, [errorEntry, loadingEntry, dataEntry]);

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

  const {
    challenges_by_pk: {
      id,
      created_at,
      description,
      frequency,
      icon,
      title,
      total_entries,
      entries,
      entries_aggregate: {
        aggregate: { count: entries_count }
      }
    }
  } = data;

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleModalMessageChange(event) {
    setModalMessage(event.target.value);
  }

  function handleModalSubmit(event) {
    event.preventDefault();
    createChallengeEntry({
      variables: {
        message: modalMessage,
        nth: entries_count + 1,
        challenge_id: id
      }
    });
  }

  const progressValue = Math.floor((entries_count / total_entries) * 100);

  return (
    <div className="container">
      <Link
        to="/dashboard"
        className="mx-auto mb-5 block w-full max-w-2xl text-slate-400"
      >
        ← Go back
      </Link>

      {/* Content Card */}
      <div className="mx-auto max-w-2xl rounded-3xl bg-white px-12 py-9 shadow-md shadow-slate-200">
        <div className="mb-9 flex justify-between">
          <p className="text-5xl">{icon}</p>

          {total_entries === entries_count ? (
            <p className="rounded-lg bg-green-100 px-7 py-3 text-lg font-semibold text-green-600">
              Challenge completed!
            </p>
          ) : (
            <button className="btn" onClick={openModal}>
              New entry
            </button>
          )}
        </div>

        <div
          className={`w-min rounded-full px-2 py-1 text-xs font-extrabold uppercase tracking-widest ${
            frequency === "daily" ? "bg-emerald-100" : "bg-sky-100"
          }`}
        >
          {frequency}
        </div>

        <h1 className="mt-3 mb-3 text-3xl font-extrabold">{title}</h1>

        <p className="flex items-center space-x-1 text-sm text-gray-400">
          <ClockIcon className="h-5 w-5" />
          <span>
            Started{" "}
            {formatDistance(new Date(created_at), new Date(), {
              addSuffix: true
            })}
          </span>
        </p>

        <p className="mt-8">{description}</p>

        <h2 className="mt-14 text-xl font-bold">Progress</h2>

        <div className="mt-8 flex gap-12">
          <div className="h-20 w-20">
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

          <ul className="list-disc space-y-3">
            <li>
              Started on{" "}
              <strong>{format(new Date(created_at), "MMM d, yyyy")}</strong>
            </li>
            <li>
              Submitted <strong>{entries_count}</strong> entries out of{" "}
              <strong>{total_entries}</strong> entries
            </li>
          </ul>
        </div>

        <h2 className="mt-14 text-xl font-bold">Challenge entry history</h2>

        <div className="mt-7">
          {entries_count === 0 ? (
            <p className="text-slate-400">
              You haven't submitted any entries yet.
            </p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-md border p-2 font-bold text-slate-500 transition hover:bg-slate-50"
                  title={entry.message}
                >
                  <span className="mr-3 text-sm font-normal text-slate-400">
                    {format(new Date(entry.created_at), "MMM d, yyyy")}
                  </span>
                  <span className="line-clamp-1">{entry.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add new challenge entry"
      >
        <div className="min-w-[500px] px-10 py-8 font-brand">
          {errorEntry ? (
            <ErrorMessage error={errorEntry} className="py-0" />
          ) : (
            <>
              <h2 className="mb-8 font-brand text-2xl font-extrabold">
                Add new challenge entry
              </h2>

              <form className="font-brand" onSubmit={handleModalSubmit}>
                <label htmlFor="message" className="form-label">
                  Entry message
                </label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="form-input"
                  placeholder="Today, I coded a new feature for my React app..."
                  value={modalMessage}
                  onChange={handleModalMessageChange}
                  autoFocus
                  required
                />

                <div className="mt-9 flex gap-4">
                  <button className="btn" disabled={loadingEntry}>
                    {loadingEntry ? "Submitting..." : "Submit entry"}
                  </button>
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
