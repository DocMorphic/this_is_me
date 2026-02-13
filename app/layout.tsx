import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dharmay dave",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0f0f0f",
          color: "#e5e5e5",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
