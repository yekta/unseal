import AddAccountModal from "@components/AddAccount/AddAccountModal";
import CommandPaletteModal from "@components/CommandPalette/CommandPaletteModal";
import ComposeModal from "@components/Compose/ComposeModal";
import Navbar from "@components/navigation/Navbar";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import AppLayoutProviders from "@components/providers/AppLayoutProviders";
import "@css/app.css";
import { Outlet } from "@tanstack/react-router";
import { useDebouncedCallback } from "@ts/hooks/useDebouncedCallback";
import { useSetAtom } from "jotai";
import { useRef } from "react";

export default function AppLayout() {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);
  const {
    callback: debouncedIsSidebarOpen,
    cancel: cancelDebouncedIsSidebarOpen,
  } = useDebouncedCallback(setIsSidebarOpen, 50);

  return (
    <AppLayoutProviders>
      <Navbar sidebarContainerRef={mainDivRef} />
      <div className="w-full flex-1 flex flex-col overflow-hidden relative">
        <main
          ref={mainDivRef}
          className="w-full flex-1 flex flex-col overflow-auto z-0 relative"
        >
          <div
            onMouseEnter={() => debouncedIsSidebarOpen(true)}
            onMouseLeave={() => cancelDebouncedIsSidebarOpen()}
            className="w-4 h-full absolute left-0 top-0 z-50"
          />
          <Outlet />
        </main>
      </div>
      <CommandPaletteModal />
      <ComposeModal />
      <AddAccountModal />
    </AppLayoutProviders>
  );
}
