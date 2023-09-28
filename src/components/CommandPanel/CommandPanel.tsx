import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function CommandPanel() {
  return (
    <div className="w-full flex-1 flex flex-col items-start justify-start text-c-on-bg/50">
      <div className="w-full relative">
        <MagnifyingGlassIcon
          strokeWidth="2"
          className="w-5 h-5 absolute left-4.5 top-1/2 transform
          -translate-y-1/2 pointer-events-none"
        />
        <input
          className="w-full font-medium pl-12 pr-6 text-lg py-3.5 bg-transparent text-c-on-bg 
          placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
          placeholder="Search commands..."
        />
      </div>
    </div>
  );
}
