import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <PayPalScriptProvider
            options={{
              "client-id": "ASBSvq2DNI-epeu2u5wWj-3oB4Ta-3QzoVBwmo1LMu4XtZqqumV9igt5-qCQXydYVueRjmtSnHXFSXXi",
              currency: "USD"
            }}
          >
        <App />
        </PayPalScriptProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
