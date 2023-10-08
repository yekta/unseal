import CommandPaletteModal from "@components/CommandPalette/CommandPaletteModal";
import Navbar from "@components/navigation/Navbar";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import RootLayoutProviders from "@components/providers/RootLayoutProviders";
import "@css/app.css";
import { Outlet } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useRef } from "react";

export default function RootLayout() {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);
  return (
    <RootLayoutProviders>
      <Navbar sidebarContainerRef={mainDivRef} />
      <div className="w-full flex-1 flex flex-col overflow-hidden relative">
        <main
          ref={mainDivRef}
          className="w-full flex-1 flex flex-col overflow-auto z-0 relative"
        >
          <div
            onMouseEnter={() => setIsSidebarOpen(true)}
            className="w-2 h-full absolute left-0 top-0 z-50"
          />
          <Outlet />
        </main>
      </div>
      <CommandPaletteModal />
    </RootLayoutProviders>
  );
}
