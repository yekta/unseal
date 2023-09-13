import Navbar from "@components/Navbar";
import ReactQueryProvider from "@components/providers/ReactQueryProvider";
import "@css/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body
          className={`w-full bg-c-bg text-c-on-bg 
          flex flex-col justify-start h-screen overflow-hidden z-0 relative`}
        >
          <Navbar />
          <main className="w-full flex-1 flex flex-col overflow-auto z-0">
            {children}
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
