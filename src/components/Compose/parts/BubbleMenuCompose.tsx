import IconBold from "@components/icons/IconBold";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";
import IconItalic from "@components/icons/IconItalic";
import { LinkIcon } from "@heroicons/react/24/outline";
import { BubbleMenu, Editor } from "@tiptap/react";
import React, { useRef } from "react";

export default function BubbleMenuCompose({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu
      editor={editor}
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
