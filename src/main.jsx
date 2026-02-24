// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

console.log("PayPal ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID?.slice(0,10));
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD"
            }}
          >
        <App />
        </PayPalScriptProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>
);
