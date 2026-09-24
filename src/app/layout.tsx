import type { ReactNode } from "react";

// Locale layouts under [locale] render the <html> shell; this root
// layout only satisfies the App Router requirement for a root file.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
