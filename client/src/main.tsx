import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import "./index.css";
import App from "./App.js";

// GitHub Pages cannot serve client-side paths such as /Budgetica/auth directly.
const Router = import.meta.env.BASE_URL === "/" ? BrowserRouter : HashRouter;

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>,
);
