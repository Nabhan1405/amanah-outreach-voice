import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { org } from "@/content/site";

/** Display: a high-contrast editorial serif, as the brand marks imply. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/** Body & UI: Inter, the typeface named in the brand presentation. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amanahoutreach.org"),
  title: {
    default: `${org.name} — ${org.tagline}`,
    template: `%s — ${org.name}`,
  },
  description: org.description,
  openGraph: {
    title: `${org.name} — ${org.tagline}`,
    description: org.description,
    type: "website",
    locale: "en_IN",
    siteName: org.name,
  },
  icons: {
    icon: [{ url: "/brand/icon-gold.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2a43",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/*
          Entrance animations render their "before" state into the HTML —
          opacity: 0, a translate, a closed clip-path — and rely on
          JavaScript to open them. Without it the page would be blank, so
          browsers with scripting disabled get the settled state instead.

          A <noscript> stylesheet rather than a class the client strips:
          it applies only when scripting is off, so the server and client
          markup stay identical and hydration has nothing to reconcile.

          Decorative pattern layers are aria-hidden and carry their own low
          inline opacity — they are excluded, or they would render at full
          strength.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              :not([aria-hidden="true"]):not([aria-hidden="true"] *)[style*="opacity"],
              :not([aria-hidden="true"]):not([aria-hidden="true"] *)[style*="transform"],
              :not([aria-hidden="true"]):not([aria-hidden="true"] *)[style*="clip-path"] {
                opacity: 1 !important;
                transform: none !important;
                clip-path: none !important;
              }
              .marquee-track { animation: none !important; }
            </style>`,
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-navy)] focus:px-5 focus:py-3 focus:text-[var(--color-ivory)]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
