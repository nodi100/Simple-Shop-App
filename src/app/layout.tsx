import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApolloClientProvider } from "@/context/ApolloProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header/Header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop App",
  description: "Simple shop app with real time updates",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <Header />
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
