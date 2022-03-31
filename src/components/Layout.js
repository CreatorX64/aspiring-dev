import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="bg-slate-100 font-brand text-slate-800">
      <Navigation />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
}
