import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/AppRouter";

// PUBLIC_INTERFACE
function App() {
  /** Application entry component. Wraps routing for the Call Audit Platform. */
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
