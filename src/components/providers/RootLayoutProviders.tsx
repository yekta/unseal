import GeneralHotkeyProvider from "@components/providers/GeneralHotkeyProvider";
import { ThemeProvider } from "@components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GeneralHotkeyProvider>{children}</GeneralHotkeyProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
