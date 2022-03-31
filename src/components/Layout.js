import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="bg-slate-100 font-brand text-slate-800">
      <Navigation />
      <main className="pb-40">{children}</main>
      <Footer />
    </div>
  );
}
