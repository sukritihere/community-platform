"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      // disableTransitionOnChange={false}
      // forcedTheme="dark"
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
