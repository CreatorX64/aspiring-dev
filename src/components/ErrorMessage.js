import { CursorClickIcon } from "@heroicons/react/outline";

export default function ErrorMessage({ error }) {
  return (
    <div className="mx-auto max-w-xl space-y-6 py-24">
      <h2 className="text-3xl font-bold">Something went wrong 😓</h2>
      <p>
        Somehow we couldn't fetch your challenge data. Try to refresh the page.
        If the error persists, please click the error message (below), which
        will open your email provider and automatically fill the error message
        to be sent to the developer. Sorry for the inconvenience 🙏
      </p>
      <a
        href={`mailto:creatorx64@gmail.com?subject=Error occured in aspiring.dev&body=${
          error.stack ?? error.message
        }`}
        className="block rounded-lg bg-red-100 p-4 font-semibold text-red-600 transition hover:opacity-70"
        title="Click to send an email to the developer"
      >
        <CursorClickIcon className="mr-3 inline h-5 w-5" />
        <span>{error.message}</span>
      </a>
    </div>
  );
}
