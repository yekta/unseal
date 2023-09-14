import React from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import { useEditor, EditorContent } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";
import Placeholder from "@tiptap/extension-placeholder";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Link from "@tiptap/extension-link";

import BubbleMenuCompose from "@components/Compose/parts/BubbleMenuCompose";

// define your extension array
const extensions = [
  Document,
  Paragraph,
  Text,
  Heading,
  Bold,
  Italic,
  History,
  BubbleMenu,
  Link.configure({ openOnClick: false }),
  Placeholder.configure({ placeholder: "Enter your message here..." }),
];

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
              editor={editor}
              className="flex flex-col h-full min-h-full"
            />
          </div>
          <BubbleMenuCompose editor={editor} />
        </div>
      </div>
    )
  );
}
