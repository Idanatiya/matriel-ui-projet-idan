import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "context/AppContext";

const Provider: React.FC = ({ children }) => (
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

export default Provider;
