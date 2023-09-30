import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useHotkeys } from "react-hotkeys-hook";
import { useCommands } from "@components/CommandPalette/useCommands";

export default function CommandPalette() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState<number>(0);
  const [isMouseMoveOrEnterActive, setIsMouseMoveOrEnterActive] =
    useState(false);

  const { commands, executeCommand } = useCommands(searchQuery);

  useHotkeys(
    ["tab", "down"],
    () => setActiveCommandIndex((activeCommandIndex + 1) % commands.length),
    { enableOnFormTags: true, enabled: commands.length > 0 }
  );

  useHotkeys(
    ["shift+tab", "up"],
    () =>
      setActiveCommandIndex(
        (activeCommandIndex - 1 + commands.length) % commands.length
      ),
    { enableOnFormTags: true, enabled: commands.length > 0 }
  );

  return (
    <div
      onMouseMove={() => {
        !isMouseMoveOrEnterActive && setIsMouseMoveOrEnterActive(true);
      }}
      className="w-full flex flex-1 flex-col items-start justify-start overflow-hidden 
      bg-c-bg-command-palette rounded-xl relative shadow-3xl shadow-c-shadow/[var(--o-shadow-command-palette)]"
    >
      <form
        className="w-full"
        onSubmit={() => executeCommand(commands[activeCommandIndex || 0])}
      >
        <input
          autoComplete="off"
          autoCorrect="off"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            activeCommandIndex !== 0 && setActiveCommandIndex(0);
            isMouseMoveOrEnterActive && setIsMouseMoveOrEnterActive(false);
          }}
          className="w-full font-medium px-5 text-lg py-3.5 bg-transparent text-c-on-bg 
            placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
          placeholder="Search commands..."
        />
      </form>
      <div className="w-full h-2px bg-c-on-bg/6" />
      <div className="w-full flex-1 flex flex-col items-start justify-start overflow-auto pb-4">
        <ul
          onMouseLeave={() =>
            activeCommandIndex !== 0 && setActiveCommandIndex(0)
          }
          className="w-full flex flex-col items-start justify-start group/command-list"
        >
          {commands.length < 1 && (
            <li
              className={`w-full text-left px-1.5 py-px pt-1.5 text-c-on-bg/50`}
            >
              <div className="w-full flex items-center justify-start px-4 py-3">
                <MagnifyingGlassIcon className="w-5 h-5 flex-shrink-0" />
                <p
                  className="px-3 flex-shrink min-w-0 overflow-hidden 
                    overflow-ellipsis whitespace-nowrap"
                >
                  No results
                </p>
              </div>
            </li>
          )}
          {commands.length >= 1 &&
            commands.map((command, i) => {
              return (
                <li key={command.title} className="w-full">
                  <button
                    onMouseMove={() =>
                      activeCommandIndex !== i &&
                      isMouseMoveOrEnterActive &&
                      setActiveCommandIndex(i)
                    }
                    onMouseEnter={() =>
                      activeCommandIndex !== i &&
                      isMouseMoveOrEnterActive &&
                      setActiveCommandIndex(i)
                    }
                    tabIndex={-1}
                    onClick={() => executeCommand(command)}
                    className={`text-left w-full flex px-1.5 py-px group/button cursor-default ${
                      i === 0
                        ? "pt-1.5"
                        : i === commands.length - 1
                        ? "pb-1.5"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-full flex items-start justify-start px-4 py-3 rounded-lg ${
                        activeCommandIndex === i
                          ? "text-c-on-bg bg-c-on-bg/10"
                          : "text-c-on-bg/75"
                      }`}
                    >
                      <div className="py-0.5">
                        <command.Icon className="w-5 h-5 flex-shrink-0" />
                      </div>
                      <p className="pl-3 flex-shrink min-w-0">
                        {command.title}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
