import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-google",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-google",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SentinelFlow — Financial Intelligence Platform",
  description:
    "Explore a clearer view of transaction risk, connected accounts and investigation evidence with SentinelFlow.",
  keywords: [
    "fraud detection",
    "money laundering",
    "financial intelligence",
    "transaction monitoring",
    "investigations",
  ],
  openGraph: {
    title: "SentinelFlow — Financial Intelligence Platform",
    description:
      "Financial intelligence. Human judgement. Explore the SentinelFlow website and interactive preview.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-base text-zinc-100 antialiased`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
