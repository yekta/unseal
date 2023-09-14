import IconBold from "@components/icons/IconBold";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";
import IconItalic from "@components/icons/IconItalic";
import { LinkIcon } from "@heroicons/react/24/outline";
import { BubbleMenu, Editor } from "@tiptap/react";
import React, { useRef } from "react";
import "@css/tippy.css";

export default function BubbleMenuCompose({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 6],
        duration: [100, 0],
        animation: "tooltip-animation",
        arrow: `<svg class='text-c-bg-quaternary' width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.87.66 20 8H0L8.13.66a3 3 0 0 1 3.74 0Z" fill="currentColor"/></svg>`,
      }}
      className="bg-c-bg-quaternary shadow-lg shadow-c-shadow/[var(--o-shadow-stronger)] rounded-lg flex items-center"
    >
      <BubbleMenuButton
        Icon={IconBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <BubbleMenuButton
        Icon={IconItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <BubbleMenuButton
        Icon={LinkIcon}
        onClick={() => null}
        isActive={editor.isActive("link")}
      />
      <Divider />
      <BubbleMenuButton
        Icon={IconH1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
      />
      <BubbleMenuButton
        Icon={IconH2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      />
    </BubbleMenu>
  );
}

function BubbleMenuButton({
  onClick,
  isActive,
  Icon,
}: {
  onClick: () => void;
  isActive: boolean;
  Icon: React.ComponentType<any>;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`w-11 h-11 rounded-lg flex items-center justify-center 
      cursor-default p-0.75 group`}
    >
      <div className={`p-2 group-hover:bg-c-on-bg/10 rounded-md`}>
        <Icon
          className={`w-full h-full ${
            isActive ? "text-c-primary" : "text-c-on-bg"
          }`}
        />
      </div>
    </button>
  );
}

export function Divider() {
  return (
    <div className="px-1.5">
      <div className="h-5 w-2px rounded-full bg-c-on-bg/10" />
    </div>
  );
}
