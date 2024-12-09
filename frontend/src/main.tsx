import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserDataProvider } from "@/contexts/UserDataProvider";
import App from "./App";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
