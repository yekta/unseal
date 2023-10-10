import Bold from "@tiptap/extension-bold";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";

import BubbleMenuCompose from "@components/Compose/parts/BubbleMenuCompose";

const extensions = [
  Document,
  Paragraph,
  Text,
  Heading,
  Bold,
  Italic,
  History,
  BubbleMenu,
  Link.extend({ inclusive: false }).configure({ openOnClick: false }),
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
            <p className="text-c-on-bg/60">To</p>
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
