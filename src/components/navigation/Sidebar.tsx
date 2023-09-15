import React from "react";

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col group w-2 absolute left-0 top-0 z-10">
      <div
        className="h-full transition -translate-x-full group-hover:translate-x-0
        w-64 overflow-auto border-r-2 bg-c-bg border-c-bg-secondary flex flex-col absolute 
        left-0 top-0 shadow-xl shadow-c-shadow/[var(--o-shadow-strongest)]"
      >
        {Array.from({ length: 50 }).map((i, index) => (
          <p className="px-4 py-3">All mail {index + 1}</p>
        ))}
      </div>
    </div>
  );
}
