import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@context/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <HelmetProvider>
        <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster />
      </ThemeContextProvider>
      </HelmetProvider>
    </div>
  );
}
