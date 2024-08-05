// src/components/Toast.js

import React, { useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  useEffect(() => {
    // toast("Welcome !");
    toast("🦄 Welcome !", { position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce, });
    // toast.error("Error Notification !", { position: "top-left" });
    // toast.warn("Warning Notification !", { position: "bottom-left" });
    // toast.info("Info Notification !", { position: "bottom-center" });
    // toast("Custom Style Notification with css class!", { position: "bottom-right", className: 'foo-bar' });
  }, []);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
};

export default Toast;
