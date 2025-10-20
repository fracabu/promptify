import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Promptify - AI Framework Platform",
  description: "Scopri e testa i framework più efficaci per ottimizzare le tue interazioni con l'AI. Piattaforma professionale per prompt engineering.",
  keywords: ["Promptify", "AI", "prompt engineering", "framework", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Promptify Team" }],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" }
    ],
  },
  openGraph: {
    title: "Promptify - AI Framework Platform",
    description: "Piattaforma professionale per prompt engineering con framework AI",
    url: "https://promptify.ai",
    siteName: "Promptify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptify - AI Framework Platform",
    description: "Piattaforma professionale per prompt engineering",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className="antialiased bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
