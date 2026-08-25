import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Competitions & Giveaways",
    template: "%s | Free Competitions",
  },
  description:
    "Enter free competitions and giveaways. Win gift cards, gadgets, and premium tools. Completely free to enter.",
  openGraph: {
    title: "Free Competitions & Giveaways",
    description: "Enter free competitions and win real prizes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900">
        {/* Sticky premium header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-md shadow-brand-500/30">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                FreeComps
              </span>
            </a>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <a
                href="/#competitions"
                className="text-slate-600 hover:text-brand-600 transition-colors"
              >
                Competitions
              </a>
              <a
                href="/#competitions"
                className="hidden sm:inline-flex items-center rounded-full bg-brand-600 px-4 py-2 text-white shadow-sm hover:bg-brand-700 transition"
              >
                Enter Free
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* Improved footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="font-bold text-slate-900">FreeComps</span>
              </div>

              <p className="text-center text-sm text-slate-500 max-w-md">
                Free competitions with real prizes. Winner selection is random.
                No purchase necessary.
              </p>

              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} FreeComps
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
