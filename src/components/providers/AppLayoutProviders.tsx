import GeneralHotkeyProvider from "@components/providers/GeneralHotkeyProvider";

export default function AppLayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GeneralHotkeyProvider>{children}</GeneralHotkeyProvider>;
}
