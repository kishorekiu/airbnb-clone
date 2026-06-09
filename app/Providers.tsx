"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // We initialize the client inside state so it doesn't get recreated on every render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data fresh for 5 minutes. If they hit back within 5 mins, zero API calls!
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false, // Prevents annoying refetches when switching tabs
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
