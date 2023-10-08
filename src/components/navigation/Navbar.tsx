import ComposeButtonWithModal from "@components/Compose/ComposeButtonWithModal";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { TIconColor, TIconType } from "@ts/email";
import EmailIcon from "@components/EmailList/EmailLine/EmailIcon";
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { Link, LinkPropsOptions, useParams } from "@tanstack/react-router";

export default function Navbar() {
  const { accountId } = useParams({ from: "__root__" });
  const navbarItems: TNavbarItem[] = [
    {
      label: accountId ? "Inbox" : "All Inboxes",
      route: getPathnameWithAccount("/", accountId),
      iconType: "inbox",
      iconColor: "on-bg",
    },
    {
      label: "Unread",
      route: getPathnameWithAccount("/view/unread", accountId),
      iconType: "unread",
      iconColor: "on-bg",
    },
    {
      label: "Starred",
      route: getPathnameWithAccount("/view/starred", accountId),
      iconType: "starred",
      iconColor: "on-bg",
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <nav
      className="w-full flex items-stretch justify-start lg:justify-between 
      bg-c-bg z-[100] border-b-2 border-c-bg-border overflow-hidden relative electron-drag-zone"
    >
      <div className="flex items-stretch justify-start lg:w-64 pl-20.5">
        <button
          id="sidebar-toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="py-1.5 px-0.75 flex cursor-default group electron-no-drag-zone"
        >
          <div
            className="p-1 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
            group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
          >
            <Bars4Icon
              className={`text-c-on-bg w-8 h-8 transform transition ${
                isSidebarOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <div className="lg:flex-1 flex justify-center">
        <div className="flex justify-center overflow-hidden relative z-0 rounded-xl electron-no-drag-zone">
          {navbarItems.map((item, index) => {
            return (
              <Link
                activeProps={{ className: "group/active-link" }}
                activeOptions={{ exact: true }}
                key={`nav-link-${index}`}
                to={item.route.to}
                params={item.route.params}
                className="py-1.5 px-0.75 self-stretch group cursor-default flex flex-row"
              >
                {({ isActive }) => (
                  <div
                    className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg 
                    ring-0 group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)] ${
                      isActive
                        ? "bg-c-bg-highlight-active"
                        : "group-hover:bg-c-bg-highlight-hover"
                    }`}
                  >
                    <EmailIcon
                      type={item.iconType}
                      color={item.iconColor}
                      isActive={isActive}
                      fadeOnPassive="normal"
                    />
                    <p
                      className={`hidden lg:block font-medium transition duration-150 ${
                        isActive ? "text-c-on-bg" : "text-c-on-bg/60"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 lg:flex-none w-64 items-center justify-end px-0.5">
        <div className="electron-no-drag-zone">
          <ComposeButtonWithModal />
        </div>
      </div>
    </nav>
  );
}

interface TNavbarItem {
  label: string;
  route: {
    to: LinkPropsOptions["to"];
    params: LinkPropsOptions["params"];
  };
  iconType: TIconType;
  iconColor: TIconColor;
}
