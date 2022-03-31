import { useAuthContext } from "../hooks/useAuthContext";

export function HomePage() {
  const { login } = useAuthContext();

  return (
    <div className="grid min-h-screen place-items-center px-6 text-slate-800 sm:px-12">
      <div className="flex max-w-4xl flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-20">
        <img
          src="/logo-dark.svg"
          alt="Aspiring Dev logo"
          className="h-32 w-32 sm:h-40 sm:w-40 md:h-52 md:w-52"
        />

        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Aspiring.<span className="text-indigo-500">Dev</span>
          </h1>
          <p className="mt-8 mb-3 text-lg leading-relaxed sm:text-xl">
            Challenge tracking <strong>simplified</strong>. Create unlimited
            challenges, submit early/late challenge entries, and more.
          </p>
          <p className="mb-12 text-lg leading-relaxed sm:text-xl">
            Only <strong>you</strong> are in control of your challenges & your
            path to success.
          </p>
          <button
            className="btn mx-auto flex items-center gap-3 transition hover:opacity-90 md:mx-0"
            onClick={login}
          >
            <img src="/icon-github.svg" alt="GitHub logo" />
            <span>Get started with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
