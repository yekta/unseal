import CommandPaletteModal from "@components/CommandPalette/CommandPaletteModal";
import Navbar from "@components/navigation/Navbar";
import Sidebar from "@components/navigation/Sidebar";
import RootLayoutProviders from "@components/providers/RootLayoutProviders";
import "@css/app.css";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full bg-c-bg text-c-on-bg break-words
          flex flex-col justify-start h-screen overflow-hidden z-0 relative`}
      >
        <RootLayoutProviders>
          <Navbar />
          <div className="w-full flex-1 flex flex-col overflow-hidden relative">
            <Sidebar />
            <main className="w-full flex-1 flex flex-col overflow-auto z-0 relative">
              {children}
            </main>
          </div>
          <CommandPaletteModal />
        </RootLayoutProviders>
      </body>
    </html>
  );
}
