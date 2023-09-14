import React from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";
import Placeholder from "@tiptap/extension-placeholder";
import IconBold from "@components/icons/IconBold";
import IconItalic from "@components/icons/IconItalic";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";

// define your extension array
const extensions = [
  Document,
  Paragraph,
  Text,
  Heading,
  Bold,
  Italic,
  History,
  Placeholder.configure({ placeholder: "Enter your message here..." }),
];

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
      className={`w-10 h-10 rounded-lg flex items-center justify-center 
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

export default function Compose() {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "h-full outline-none",
      },
    },
  });

  return (
    editor && (
      <div className="w-full min-h-full flex flex-col items-center overflow-auto">
        <div className="w-full flex flex-col flex-1 max-w-3xl px-3 md:px-6 py-10">
          <div className="w-full flex items-center gap-2">
            <p className="text-c-on-bg/50">To</p>
            <div className="flex-1">
              <input className="w-full bg-transparent outline-none" />
            </div>
          </div>
          <TextareaAutosize
            placeholder="Subject"
            autoCorrect="off"
            className="w-full bg-transparent text-4xl font-semibold outline-none mt-3 placeholder:text-c-on-bg/40 resize-none"
          ></TextareaAutosize>
          <div className="mt-4 w-full flex-1 flex flex-col">
            <EditorContent
              autoCorrect="off"
              editor={editor}
              className="flex flex-col h-full min-h-full"
            />
          </div>
          <BubbleMenu
            className="bg-c-bg-quaternary rounded-lg flex"
            editor={editor}
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
              Icon={IconH1}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
            />
            <BubbleMenuButton
              Icon={IconH2}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
            />
          </BubbleMenu>
        </div>
      </div>
    )
  );
}
