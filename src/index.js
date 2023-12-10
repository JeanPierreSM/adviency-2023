import { createRoot } from "react-dom/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <CSSReset />
    <App />
  </ChakraProvider>
);
