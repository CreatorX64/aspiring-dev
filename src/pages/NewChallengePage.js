import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Picker } from "emoji-mart";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";

import { validateCreateChallengeForm } from "../lib/helpers";
import { ErrorMessage } from "../components/ErrorMessage";
import { CREATE_CHALLENGE, GET_CHALLENGES } from "../lib/queries";

export function NewChallengePage() {
  const navigate = useNavigate();

  // https://github.com/apollographql/apollo-client/issues/5419#issuecomment-973154976
  useQuery(GET_CHALLENGES);

  const [createChallenge, { data, loading, error }] = useMutation(
    CREATE_CHALLENGE,
    { refetchQueries: ["GetChallenges"] }
  );

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
    totalEntries: "",
    frequency: ""
  });

  // After challenge creation, redirect to dashboard if no errors
  useEffect(() => {
    if (!error && !loading && data) {
      navigate("/dashboard");
    }
  }, [data, loading, error, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    if (validateCreateChallengeForm(formData)) {
      const {
        title,
        description,
        icon,
        frequency,
        totalEntries: total_entries
      } = formData;

      createChallenge({
        variables: {
          title,
          icon,
          description,
          frequency,
          total_entries
        }
      });
    } else {
      setFormError("Please fill all the form fields");
      window.scrollTo(0, 0);
    }
  }

  function handleChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  function handleEmojiPick(emoji) {
    setFormData((prevState) => ({
      ...prevState,
      icon: emoji.native
    }));
    setIsPickerVisible(false);
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container pb-28">
      <h1 className="mb-9 text-center text-2xl font-extrabold">
        Add New Challenge
      </h1>

      {/* Content Card */}
      <div className="mx-auto max-w-2xl rounded-3xl bg-white px-8 py-9 shadow-md shadow-slate-200 md:px-12">
        {formError && (
          <div className="mb-10 w-full rounded-lg bg-red-50 px-4 py-3 font-semibold text-red-600">
            <p>{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Icon picker */}
          <div className="mb-14 flex items-center gap-6">
            <div
              className="relative grid h-20 w-20 cursor-pointer place-items-center rounded-md border-2 border-dashed border-slate-300"
              onClick={() => {
                !isPickerVisible && setIsPickerVisible(true);
              }}
            >
              {isPickerVisible && (
                <Picker
                  className="absolute top-0 -left-[20px] md:left-0"
                  style={{ position: "absolute", top: "12px", left: "-28px" }}
                  title="Pick your emoji"
                  onSelect={handleEmojiPick}
                />
              )}

              {!isPickerVisible && !formData.icon && (
                <EmojiHappyIcon className="h-14 w-14 text-slate-200" />
              )}

              {!isPickerVisible && formData.icon && (
                <span className="text-5xl">{formData.icon}</span>
              )}
            </div>

            <p className="text-slate-500">← Click here to pick an icon!</p>
          </div>

          <div className="space-y-11">
            <div>
              <label htmlFor="title" className="form-label">
                Challenge title
              </label>
              <input
                className="form-input"
                maxLength="80"
                type="text"
                name="title"
                id="title"
                placeholder="E.g. 100 Days of Code"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="form-label">
                Challenge description
              </label>
              <textarea
                className="form-input resize-none"
                type="text"
                name="description"
                maxLength="280"
                id="description"
                rows="3"
                placeholder="In this challenge, I aim to code every day for the next 100 days..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="totalEntries" className="form-label">
                How many challenge entries you'll make in total?
              </label>
              <input
                type="number"
                name="totalEntries"
                id="totalEntries"
                className="form-input"
                placeholder="Must be between 1 and 1000"
                min="0"
                max="1000"
                value={formData.totalEntries}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="form-label">Challenge entry frequency</p>
              <div className="flex gap-10">
                <div>
                  <label htmlFor="freq-daily" className="mr-2">
                    Daily
                  </label>
                  <input
                    type="radio"
                    name="frequency"
                    id="freq-daily"
                    value="daily"
                    onChange={handleChange}
                    checked={formData.frequency === "daily"}
                  />
                </div>
                <div>
                  <label htmlFor="freq-weekly" className="mr-2">
                    Weekly
                  </label>
                  <input
                    type="radio"
                    name="frequency"
                    id="freq-weekly"
                    value="weekly"
                    onChange={handleChange}
                    checked={formData.frequency === "weekly"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <button className="btn w-full md:w-auto" disabled={loading}>
              {loading ? "Loading..." : "Create challenge"}
            </button>
            <button
              className="w-full py-6 font-semibold text-slate-500 md:ml-9 md:w-auto md:py-0"
              onClick={() => navigate("/dashboard")}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
