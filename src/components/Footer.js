import { useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();

  function handleScrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    location.pathname !== "/" && (
      <footer className="bg-slate-800 py-16 text-slate-100 md:h-60">
        <div className="container flex flex-col items-center justify-between gap-14 md:h-full md:flex-row md:gap-0">
          <div className="flex gap-6 md:gap-10">
            <img
              src="/logo.svg"
              alt="Aspiring Dev logo"
              className="h-12 w-12 cursor-pointer md:h-16 md:w-16"
              onClick={handleScrollTop}
            />
            <div>
              <p className="mb-2 font-extrabold md:mb-4">aspiring.dev</p>
              <a
                href="https://www.youtube.com/watch?v=WOKUqMutbgA"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-400 transition hover:text-slate-300"
              >
                Turboknight 2049 © All Sights Absurd
              </a>
            </div>
          </div>

          <div className="flex gap-7">
            <a
              href="https://github.com/CreatorX64/aspiring-dev"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/icon-github.svg" alt="GitHub logo" />
            </a>
            <a
              href="https://twitter.com/CreatorX64"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/icon-twitter.svg" alt="Twitter logo" />
            </a>
            <a href="mailto:creatorx64@gmail.com">
              <img src="/icon-email.svg" alt="Email icon" />
            </a>
          </div>

          <div>
            <p
              className="cursor-pointer text-slate-300 transition hover:text-slate-200"
              onClick={handleScrollTop}
            >
              ↑ Back to top
            </p>
          </div>
        </div>
      </footer>
    )
  );
}
