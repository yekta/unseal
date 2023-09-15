export function EmailLinePlaceholder() {
  const dateStr = "Jan 10";
  const sender = "Loading Loading";
  const title = "Loading Loading Loading Loading";
  const body =
    "Loading loading loading loading loading loading loading loading loading loading loading loading";
  return (
    <div
      className="w-full flex flex-row justify-center items-center group 
      cursor-default select-none"
    >
      <div className="w-full flex flex-row items-center md:py-px">
        <div
          className={`flex flex-col flex-1 md:flex-row md:items-center md:justify-between px-4 py-3.5
          relative overflow-hidden md:rounded-xl z-0`}
        >
          <div className="w-full md:w-60 flex items-center gap-2.5">
            <NotificationDot isRead={true} hideWhenRead />
            <div className="w-5 h-5 rounded-full bg-c-on-bg/40"></div>
            <div className="flex-1 flex justify-start">
              <p
                className="bg-c-on-bg/40 rounded-full text-transparent flex-shrink font-semibold whitespace-nowrap 
                overflow-hidden text-base"
              >
                {sender}
              </p>
            </div>
            <p className="bg-c-on-bg/20 rounded-full text-transparent md:hidden w-16 text-right text-base">
              {dateStr}
            </p>
          </div>
          {/* Desktop */}
          <p className="hidden md:flex whitespace-nowrap flex-1 overflow-hidden text-c-on-bg/60 text-base">
            <span className="bg-c-on-bg/30 rounded-full text-transparent">
              {title}
            </span>
            <span className="bg-transparent rounded-full text-transparent px-0.25ch">
              {" "}
            </span>
            <span className="bg-c-on-bg/20 rounded-full text-transparent flex-1 overflow-hidden">
              {body}
            </span>
          </p>
          <div className="hidden md:flex justify-end w-18 text-right text-base">
            <p className="bg-c-on-bg/20 max-w-full rounded-full text-transparent">
              {dateStr}
            </p>
          </div>
          {/* Mobile */}
          <p
            className="bg-c-on-bg/30 rounded-full text-transparent md:hidden w-full whitespace-nowrap 
            overflow-hidden mt-1 text-base"
          >
            Loading
          </p>
          <p
            className="bg-c-on-bg/20 rounded-full text-transparent md:hidden w-full whitespace-nowrap 
            overflow-hidden mt-1 text-base"
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

const NotificationDot = ({
  isRead,
  hideWhenRead = false,
  className,
}: {
  isRead: boolean;
  className?: string;
  hideWhenRead?: boolean;
}) => (
  <div
    className={`w-1.5 h-1.5 md:w-3px md:h-4.5 md:absolute md:left-0 md:top-1/2 transform md:-translate-y-1/2 
    rounded-full flex-shrink-0 ${
      isRead ? "bg-c-notification-blue/0 hidden" : "bg-c-notification-blue"
    } ${className ?? ""}`}
  />
);
