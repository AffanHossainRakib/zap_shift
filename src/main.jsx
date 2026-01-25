import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Analytics />
    </AuthProvider>
  </StrictMode>,
);
