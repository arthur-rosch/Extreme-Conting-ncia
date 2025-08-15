import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import assets from "../assets/1.jpeg"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Extreme Contingência - BM Accounts",
  description: "Business Manager accounts dashboard - Extreme Contingência",
  generator: 'v0.dev',
  icons: {
    icon: '/assets/1.jpeg',
    shortcut: '/assets/1.jpeg',
    apple: '/assets/1.jpeg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        {children}</body>
    </html>
  )
}
