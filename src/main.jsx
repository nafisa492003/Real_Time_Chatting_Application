import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { DarkModeProvider } from "../src/Component/NavBar/DarkModeProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Store.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </PersistGate>
  </Provider>
);
