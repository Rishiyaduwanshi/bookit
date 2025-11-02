'use client';
import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showError = msg => {
    toast.error(msg);
  };

  const showInfo = msg => {
    toast.info(msg);
  };

  const showSuccess = msg => {
    toast.success(msg);
  };

  const showWarning = msg => {
    toast.warn(msg);
  };

  return (
    <ToastContext.Provider
      value={{ showError, showWarning, showSuccess, showInfo }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
