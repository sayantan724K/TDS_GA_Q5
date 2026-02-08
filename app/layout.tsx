import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A general knowledge quiz application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
