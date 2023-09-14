import IconBold from "@components/icons/IconBold";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";
import IconItalic from "@components/icons/IconItalic";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BubbleMenu, Editor } from "@tiptap/react";
import React, { useRef, useState } from "react";
import "@css/tippy.css";
import { useOnClickOutside } from "usehooks-ts";

export default function BubbleMenuCompose({ editor }: { editor: Editor }) {
  const [bubbleMenuType, setBubbleMenuType] = useState<"main" | "link">("main");
  const [linkInputValue, setLinkInputValue] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);
  const bubbleMenuContainerRef = useRef<HTMLDivElement>(null);

  const bubbleMenuClickOutside = () => {
    if (bubbleMenuType === "link") {
      if (linkInputRef.current?.value !== "") {
        editor.chain().focus().toggleLink({ href: linkInputValue }).run();
      }
      setBubbleMenuType("main");
    }
  };
  useOnClickOutside(bubbleMenuContainerRef, bubbleMenuClickOutside);
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
      className="bg-c-bg-quaternary shadow-lg shadow-c-shadow/[var(--o-shadow-stronger)] 
      flex flex-col rounded-lg overflow-hidden"
    >
      <div
        ref={bubbleMenuContainerRef}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex items-center">
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
            onClick={() => {
              setLinkInputValue(editor.getAttributes("link").href || "");
              if (editor.isActive("link")) {
                editor.chain().focus().unsetLink().run();
                return;
              }
              setBubbleMenuType("link");
            }}
            isActive={editor.isActive("link")}
          />
          <Divider />
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
        </div>
        {editor.getAttributes("link").href && (
          <a
            href={editor.getAttributes("link").href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[14.55rem] cursor-default -mt-0.75 text-sm p-0.75 group overflow-hidden"
          >
            <p
              className="w-full text-center rounded-md px-2.5 py-1.5 underline whitespace-nowrap overflow-hidden overflow-ellipsis 
                transition group-hover:bg-c-primary/10 group-hover:text-c-primary text-c-on-bg/75"
            >
              {editor.getAttributes("link").href}
            </p>
          </a>
        )}
        {bubbleMenuType === "link" && (
          <>
            <form
              className="absolute left-0 top-0 w-full h-full bg-c-bg-quaternary rounded-lg"
              onSubmit={() => {
                if (linkInputValue === "") {
                  editor.chain().focus().unsetLink().run();
                  setBubbleMenuType("main");
                  return;
                }
                editor
                  .chain()
                  .focus()
                  .toggleLink({ href: linkInputValue })
                  .run();
                setBubbleMenuType("main");
              }}
            >
              <input
                ref={linkInputRef}
                placeholder="Paste or type a link..."
                autoCorrect="off"
                autoComplete="off"
                value={linkInputValue}
                onChange={(e) => {
                  setLinkInputValue(e.target.value);
                }}
                className="pl-3 pr-11 w-full h-full placeholder:text-c-on-bg/40 bg-transparent overflow-ellipsis"
              />
              <button
                className="w-10 h-full transition hover:bg-c-primary/10 group absolute right-0 top-0 p-2
              rounded-r-lg"
                type="button"
                onClick={() => {
                  if (linkInputRef.current?.value !== "") {
                    editor
                      .chain()
                      .focus()
                      .toggleLink({ href: linkInputValue })
                      .run();
                  }
                  setBubbleMenuType("main");
                }}
              >
                <XMarkIcon className="w-full h-full text-c-on-bg/50 group-hover:text-c-primary" />
              </button>
            </form>
          </>
        )}
      </div>
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
