import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { useSetAtom } from "jotai";

export default function ComposeButton() {
  const setIsComposeOpen = useSetAtom(isComposeOpenAtom);
  return (
    <button
      onClick={() => setIsComposeOpen(true)}
      className="py-1.5 px-0.75 flex cursor-default group"
    >
      <div
        className="p-1.5 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
            group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
      >
        <IconPenOnPaper
          className={`text-c-on-bg w-7 h-7 transform transition`}
        />
      </div>
    </button>
  );
}
