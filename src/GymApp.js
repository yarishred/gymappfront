import React from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";

import "./GymApp.css";

import { GymRutas } from "./Rutas/GymRutas";

export const GymApp = () => {
  return (
    <Provider store={store}>
      <GymRutas />
    </Provider>
  );
};
