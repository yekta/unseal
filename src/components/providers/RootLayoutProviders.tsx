"use client";

import GeneralHotkeyProvider from "@components/providers/GeneralHotkeyProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

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
