import IconBold from "@components/icons/IconBold";
import IconH1 from "@components/icons/IconH1";
import IconH2 from "@components/icons/IconH2";
import IconItalic from "@components/icons/IconItalic";
import {
  LinkIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { BubbleMenu, Editor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import "@css/tippy.css";
import { useOnClickOutside } from "usehooks-ts";
import { addProtocolToUrl } from "@ts/helpers/addProtocolToUrl";

export default function BubbleMenuCompose({ editor }: { editor: Editor }) {
  const [bubbleMenuType, setBubbleMenuType] = useState<"main" | "link">("main");
  const [linkInputValue, setLinkInputValue] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);
  const bubbleMenuContainerRef = useRef<HTMLDivElement>(null);

  const activateLinkAndClose = () => {
    editor
      .chain()
      .focus()
      .toggleLink({ href: addProtocolToUrl(linkInputValue) })
      .run();
    editor.commands.focus(editor.state.selection.to);
  };

  const bubbleMenuClickOutside = () => {
    if (bubbleMenuType === "link") {
      if (linkInputRef.current?.value !== "") activateLinkAndClose();
      setBubbleMenuType("main");
    }
  };
  useOnClickOutside(bubbleMenuContainerRef, bubbleMenuClickOutside);

  useEffect(() => {
    if (bubbleMenuType === "link") {
      linkInputRef.current?.focus();
    }
  }, [bubbleMenuType]);

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 6],
        duration: [100, 0],
        animation: "tooltip-animation",
        arrow: `<svg class='text-c-tooltip-bg' width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.87.66 20 8H0L8.13.66a3 3 0 0 1 3.74 0Z" fill="currentColor"/></svg>`,
      }}
      className="bg-c-tooltip-bg shadow-lg shadow-c-shadow/[var(--o-shadow-normal)] 
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
        {editor.isActive("link") && editor.getAttributes("link").href && (
          <a
            href={editor.getAttributes("link").href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[14.55rem] cursor-default -mt-0.75 text-sm p-0.75 group overflow-hidden"
          >
            <div
              className="rounded-md px-2.5 py-1.5 flex items-center transition justify-center 
              gap-1.5 group-hover:bg-c-primary/15"
            >
              <p
                className="flex-shrink min-w-0 text-center whitespace-nowrap overflow-hidden overflow-ellipsis 
                transition group-hover:text-c-primary text-c-tooltip-on-bg/75"
              >
                {editor.getAttributes("link").href.endsWith("/")
                  ? editor.getAttributes("link").href.slice(0, -1)
                  : editor.getAttributes("link").href}
              </p>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-c-tooltip-on-bg/75 transition group-hover:text-c-primary flex-shrink-0" />
            </div>
          </a>
        )}
        {bubbleMenuType === "link" && (
          <>
            <form
              className="absolute left-0 top-0 w-full h-full bg-c-tooltip-bg rounded-lg"
              onSubmit={() => {
                if (linkInputValue === "") {
                  editor.chain().focus().unsetLink().run();
                  setBubbleMenuType("main");
                  return;
                }
                activateLinkAndClose();
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
                className="pl-3 pr-11 w-full h-full placeholder:text-c-tooltip-on-bg/50 text-c-tooltip-on-bg bg-transparent overflow-ellipsis"
              />
              <button
                className="w-10 h-full transition hover:bg-c-primary/15 group absolute right-0 top-0 p-2
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
                <XMarkIcon className="w-full h-full text-c-tooltip-on-bg/60 group-hover:text-c-primary" />
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
      <div
        className={`p-2 group-hover:bg-c-tooltip-on-bg/10 rounded-md 
        group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]`}
      >
        <Icon
          className={`w-full h-full ${
            isActive ? "text-c-primary" : "text-c-tooltip-on-bg"
          }`}
        />
      </div>
    </button>
  );
}

export function Divider() {
  return (
    <div className="px-1.5">
      <div className="h-5 w-2px rounded-full bg-c-tooltip-on-bg/15" />
    </div>
  );
}
