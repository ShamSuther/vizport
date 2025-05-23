import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";

// clerk PUBLISHABLE_KEY
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/login"}>
      <AuthProvider>
        <Provider>
          <App />
          <Toaster />
        </Provider>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
