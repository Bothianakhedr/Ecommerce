import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@context/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster />
      </ThemeContextProvider>
    </div>
  );
}
