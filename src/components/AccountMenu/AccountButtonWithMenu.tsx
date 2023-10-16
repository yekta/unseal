import {
  Cog6ToothIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, LinkPropsOptions } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";

export const isAccountMenuOpenAtom = atom(false);

export default function AccountButtonWithMenu() {
  const [isOpen, setIsOpen] = useAtom(isAccountMenuOpenAtom);
  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Account Menu"
          className="py-1.5 px-0.75 flex cursor-default group"
        >
          <div
            className="p-1.5 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
              group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
          >
            <UserIcon className={`text-c-on-bg w-7 h-7 transform transition`} />
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded-xl max-w-[150rem] bg-c-dropdown-bg overflow-hidden ring-2 ring-c-dropdown-border
          shadow-xl shadow-c-shadow/[var(--o-shadow-normal)] flex flex-col"
          sideOffset={-1}
          collisionPadding={8}
        >
          <DropdownItem
            label="Account"
            Icon={UserCircleIcon}
            order="first"
            onClick={() => "account"}
          />
          <DropdownItem
            label="Settings"
            Icon={Cog6ToothIcon}
            order="last"
            to="/settings"
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

type TDropdownBaseProps = {
  Icon: React.ComponentType<any>;
  label: string;
  order?: "first" | "last" | "middle";
};

type TDropdownToProps = {
  to: LinkPropsOptions["to"];
  onClick?: never;
};

type TDropdownOnClickProps = {
  onClick: () => void;
  to?: never;
};

type TDropdownProps = TDropdownBaseProps &
  (TDropdownToProps | TDropdownOnClickProps);

function DropdownItem({
  Icon,
  label,
  order = "middle",
  to,
  onClick,
}: TDropdownProps) {
  const WrapperElement = to ? Link : "button";
  return (
    <DropdownMenu.Item asChild>
      <WrapperElement
        to={to}
        onClick={onClick}
        aria-label={label}
        className={`w-full group cursor-default px-1 ${
          order === "first"
            ? "pt-1 pb-px"
            : order === "last"
            ? "pb-1 pt-px"
            : "py-px"
        }`}
      >
        <div
          className="w-full px-4 py-2.5 group-data-[highlighted]:bg-c-primary/10 flex 
            items-start justify-start gap-2 rounded-lg"
        >
          <div className="py-0.5">
            <Icon className="w-5 h-5 -ml-0.5 flex-shrink-0" />
          </div>
          <p className="flex-shrink min-w-0">{label}</p>
        </div>
      </WrapperElement>
    </DropdownMenu.Item>
  );
}
