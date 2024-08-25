import React from "react";
import Router from "./Router/Router";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/ConfigureStore";
import { ContextProvider } from "./Utils/Context";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
