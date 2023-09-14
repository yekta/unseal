import IconBold from "@components/icons/IconBold";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";
import IconItalic from "@components/icons/IconItalic";
import { BubbleMenu, Editor } from "@tiptap/react";
import React from "react";

export default function BubbleMenuCompose({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu
      editor={editor}
      className="bg-c-bg-quaternary rounded-lg flex items-center"
      tippyOptions={{
        duration: 100,
      }}
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
      <div className="px-1.5">
        <div className="h-5 w-2px rounded-full bg-c-on-bg/10" />
      </div>
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
  return (
    <div
      onClick={onClick}
      className={`w-11 h-11 rounded-lg flex items-center justify-center 
      cursor-default p-0.75 group`}
    >
      <div className={`p-1.5 group-hover:bg-c-on-bg/10 rounded-md`}>
        <Icon
          className={`w-full h-full ${
            isActive ? "text-c-primary" : "text-c-on-bg"
          }`}
        />
      </div>
    </div>
  );
}
