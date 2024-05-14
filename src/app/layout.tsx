import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marmut-E3",
  description: "music for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="font-sans antialiased bg-primary">
      <Toaster />
        <AuthContextProvider>
          <Navbar />
          <main className="bg-primary min-h-screen">{children}</main>
        </AuthContextProvider>
      </body>

    </html>
  );
}
