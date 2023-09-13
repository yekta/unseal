import React from "react";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextareaAutosize from "react-textarea-autosize";
import Placeholder from "@tiptap/extension-placeholder";

// define your extension array
const extensions = [
  StarterKit,
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
          className="w-full bg-transparent text-3xl font-semibold outline-none mt-3 placeholder:text-c-on-bg/40 resize-none"
        ></TextareaAutosize>

        <div className="mt-4 w-full flex-1 flex flex-col">
          <EditorContent
            editor={editor}
            className="flex flex-col h-full min-h-full"
          />
        </div>
        {/* <FloatingMenu editor={editor ?? undefined}>
        This is the floating menu
      </FloatingMenu> */}
        {/* <BubbleMenu editor={editor ?? undefined}>
        This is the bubble menu
      </BubbleMenu> */}
      </div>
    </div>
  );
}
