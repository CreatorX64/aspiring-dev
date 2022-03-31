export function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <h2 className="text-3xl font-extrabold">Not Found</h2>
      <p>Data not found... or you really like to play with links 😏</p>
      <img
        src="/not-found.gif"
        alt="Not found"
        className="w-60 rounded-md border-b-4 border-slate-200"
      />
    </div>
  );
}
