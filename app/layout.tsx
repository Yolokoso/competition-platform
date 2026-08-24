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
      <body className="min-h-screen antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-brand-700">
              FreeComps
            </a>
            <nav className="text-sm text-slate-600">
              <a href="/" className="hover:text-brand-600">
                All Competitions
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-16 py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FreeComps. All rights reserved.</p>
          <p className="mt-1">
            Competitions are free to enter. Winner selection is random.
          </p>
        </footer>
      </body>
    </html>
  );
}
