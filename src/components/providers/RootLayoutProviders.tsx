import GeneralHotkeyProvider from "@components/providers/GeneralHotkeyProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneralHotkeyProvider>{children}</GeneralHotkeyProvider>
    </QueryClientProvider>
  );
}
