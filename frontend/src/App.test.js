import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  root.unmount();
});
