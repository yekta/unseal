import { Outlet } from "@tanstack/react-router";

export default function LayoutEmpty() {
  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden relative">
      <div className="h-13 electron-drag-zone" />
      <main className="w-full flex-1 flex flex-col overflow-auto z-0 relative">
        <Outlet />
      </main>
    </div>
  );
}
