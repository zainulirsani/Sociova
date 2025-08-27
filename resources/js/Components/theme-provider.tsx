// Buat file baru di: resources/js/Components/theme-provider.tsx
// Lalu salin dan tempel kode di bawah ini ke dalamnya.

"use client" // Direktif ini tidak berpengaruh di Vite, tapi aman untuk dibiarkan

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
