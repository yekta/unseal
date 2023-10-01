import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function WithTooltip({
  children,
  label,
  hasArrow = false,
  side = "bottom",
  offset = 0,
}: {
  children: React.ReactNode;
  label: string;
  hasArrow?: boolean;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  offset?: number;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          className="rounded-md text-sm bg-c-bg-highlight font-medium px-2 py-0.75
            shadow-md shadow-c-shadow/[var(--o-shadow-strong)]"
          sideOffset={offset}
        >
          {label}
          {hasArrow && <Tooltip.Arrow className="fill-c-bg-highlight" />}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
