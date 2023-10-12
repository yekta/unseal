import { useCommands } from "@components/CommandPalette/useCommands";
import ScrollArea from "@components/utils/ScrollArea";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useHotkeys } from "@ts/hooks/useHotkeys";
import { usePlatform } from "@ts/hooks/usePlatform";
import { Fragment, useRef, useState } from "react";

export default function CommandPalette() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState<number>(0);
  const [isMouseMoveOrEnterActive, setIsMouseMoveOrEnterActive] =
    useState(false);

  const { commands, executeCommand } = useCommands(searchQuery);
  const commandRefs = useRef<HTMLLIElement[]>([]);

  const setActiveCommandIndexAndScroll = (
    i: number,
    shouldScroll = true,
    resetMouseEnter = true
  ) => {
    setActiveCommandIndex(i);
    if (resetMouseEnter) setIsMouseMoveOrEnterActive(false);
    if (shouldScroll) {
      commandRefs.current[i]?.scrollIntoView({
        block: "end",
        inline: "end",
      });
    }
  };

  useHotkeys([
    {
      hotkey: ["tab", "down"],
      callback: () =>
        setActiveCommandIndexAndScroll(
          (activeCommandIndex + 1) % commands.length
        ),
      options: { enabled: commands.length > 0, enableOnInput: true },
    },
    {
      hotkey: ["shift+tab", "up"],
      callback: () =>
        setActiveCommandIndexAndScroll(
          (activeCommandIndex - 1 + commands.length) % commands.length
        ),
      options: { enabled: commands.length > 0, enableOnInput: true },
    },
  ]);

  return (
    <div
      onMouseMove={() => {
        !isMouseMoveOrEnterActive && setIsMouseMoveOrEnterActive(true);
      }}
      className="w-full flex flex-1 flex-col items-start justify-start overflow-hidden border-2 border-c-on-bg/6
      bg-c-command-palette-bg rounded-xl relative shadow-3xl shadow-c-shadow/[var(--o-shadow-command-palette)]"
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
            activeCommandIndex !== 0 && setActiveCommandIndexAndScroll(0);
            isMouseMoveOrEnterActive && setIsMouseMoveOrEnterActive(false);
          }}
          className="w-full font-medium px-5 text-lg py-3.5 bg-transparent text-c-on-bg 
            placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
          placeholder="Search commands..."
        />
      </form>
      <div className="w-full h-2px bg-c-on-bg/6" />
      <ScrollArea className="w-full flex-1 flex flex-col items-start justify-start">
        <ol className="w-full flex flex-col items-start justify-start group/command-list">
          {commands.length < 1 && (
            <li className={`w-full text-left p-1.5 text-c-on-bg/50`}>
              <div className="w-full flex items-center justify-start pl-3.5 pr-4 py-3">
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
                <li
                  ref={(el) => (el ? (commandRefs.current[i] = el) : null)}
                  key={command.title}
                  className="w-full"
                >
                  <button
                    onMouseMove={() =>
                      activeCommandIndex !== i &&
                      isMouseMoveOrEnterActive &&
                      setActiveCommandIndexAndScroll(i, false, false)
                    }
                    onMouseEnter={() =>
                      activeCommandIndex !== i &&
                      isMouseMoveOrEnterActive &&
                      setActiveCommandIndexAndScroll(i, false, false)
                    }
                    tabIndex={-1}
                    onClick={() => executeCommand(command)}
                    className={`text-left w-full flex px-1.5 group/button cursor-default pb-1.5 ${
                      i === 0 && "pt-1.5"
                    }`}
                  >
                    <div
                      className={`w-full flex items-center justify-start pl-3.5 pr-4 py-3 rounded-lg ${
                        activeCommandIndex === i
                          ? "text-c-on-bg bg-c-on-bg/6"
                          : "text-c-on-bg/75"
                      }`}
                    >
                      <div className="flex-1 min-w-0 flex items-start justify-start overflow-hidden">
                        <div className="py-0.5 flex-shrink-0">
                          <command.Icon className="w-5 h-5" />
                        </div>
                        <p className="flex-1 min-w-0 overflow-hidden gap-1 pl-3 flex flex-wrap items-center">
                          <span
                            className={`${
                              command.badge !== undefined && "mr-1.5"
                            }`}
                          >
                            {command.title}
                          </span>
                          {command.badge !== undefined && (
                            <span className="bg-c-on-bg/6 -ml-0.5 px-1.5 py-0.5 rounded-md text-sm">
                              {command.badge}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex justify-end w-36 max-w-full pl-4 -mr-1">
                        {command.hotkey && (
                          <HotkeyLabel hotkey={command.hotkey} />
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
        </ol>
      </ScrollArea>
    </div>
  );
}

function HotkeyLabel({ hotkey }: { hotkey: string }) {
  const platform = usePlatform();
  let keys = hotkey.split("+");
  const keySequences = keys.map((key) => {
    if (key === "ctrl" && platform === "macos") return "⌃";
    if (key === "alt" && platform === "macos") return "⌥";
    if (key === "shift") return "⇧";
    if (key === "cmd") return "⌘";
    if (key === "mod" && platform === "macos") return "⌘";
    if (key === "mod") return "ctrl";
    return key;
  });
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5 relative">
      {keySequences.map((keySequence, i) =>
        keySequence.split(" ").map((key, j) => (
          <Fragment key={key + i + j}>
            <kbd
              key={key + i + j + "kbd"}
              className={`${
                key.length === 1 ? "w-6" : "w-auto"
              } px-1.5 h-6 text-sm font-medium bg-c-command-palette-bg flex items-center 
              justify-center rounded shadow-md shadow-c-shadow/[var(--o-shadow-strong)] 
              ring-1 ring-c-on-bg/10 text-c-on-bg/75 overflow-hidden`}
            >
              {key.length === 1 ? key.toUpperCase() : key}
            </kbd>
            {keySequence.length > 1 && j < keySequences.length && (
              <p
                key={key + i + j + "-paragraph"}
                className="text-c-on-bg/75 text-xs px-0.25"
              >
                then
              </p>
            )}
          </Fragment>
        ))
      )}
    </div>
  );
}
