// src/contexts/ThemeContext.js
import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context with a default value
const Context = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const showMessage = (type, message) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <Context.Provider value={{ showMessage }}>
      <ToastContainer />
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };