import React from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

export default function ScrollArea({
  className = "w-full flex-1 flex flex-col items-start justify-start",
  viewportClass = "",
  children,
  barBg = "bg-c-scrollbar-bg/0 hover:bg-c-scrollbar-bg/40",
  thumbBg = "bg-c-scrollbar-thumb/75",
}: {
  className?: string;
  viewportClass?: string;
  children?: React.ReactNode;
  barBg?: string;
  thumbBg?: string;
}) {
  return (
    <ScrollAreaRadix.Root
      type="scroll"
      scrollHideDelay={600}
      className={`${className} overflow-hidden`}
    >
      <ScrollAreaRadix.Viewport
        className={`w-full flex-1 [&>div]:!block ${viewportClass}`}
      >
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        forceMount
        className={`flex select-none touch-none p-2px w-[11px] hover:w-[15px] data-[state=hidden]:opacity-0 
        scroll-area-bar ${barBg}`}
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb
          className={`flex-1 rounded-full relative scroll-area-thumb transition-colors ${thumbBg}`}
        />
      </ScrollAreaRadix.Scrollbar>
    </ScrollAreaRadix.Root>
  );
}
