import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        richColors
        expand
        toastOptions={{
          style: {
            background: "#caeb66",
            color: "#03373d",
            border: "1px solid rgba(3, 55, 61, 0.2)",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(3, 55, 61, 0.16)",
            fontFamily: '"Urbanist", sans-serif',
            fontWeight: 600,
            padding: "14px 16px",
          },
          className: "backdrop-blur-sm",
          closeButton: true,
        }}
      />

      <Analytics />
    </AuthProvider>
  </StrictMode>,
);
