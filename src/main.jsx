import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./themes/theme.js";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import App from "./App.jsx";
import "./index.css";

// Inicializa el atributo data-theme para que CSS vea light/dark
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("chakra-ui-color-mode") || "light"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      <BrowserRouter>
        <TaskProvider>
          <App />
        </TaskProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
