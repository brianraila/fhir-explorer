import React from "react";
import ReactDOM from "react-dom";

import _App from "./App";

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <_App />
    </ChakraProvider>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));
