import CommandPaletteModal from "@components/CommandPalette/CommandPaletteModal";
import Navbar from "@components/navigation/Navbar";
import Sidebar from "@components/navigation/Sidebar";
import RootLayoutProviders from "@components/providers/RootLayoutProviders";
import "@css/app.css";
import { Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <RootLayoutProviders>
      <Navbar />
      <div className="w-full flex-1 flex flex-col overflow-hidden relative">
        <Sidebar />
        <main className="w-full flex-1 flex flex-col overflow-auto z-0 relative">
          <Outlet />
        </main>
      </div>
      <CommandPaletteModal />
    </RootLayoutProviders>
  );
}
