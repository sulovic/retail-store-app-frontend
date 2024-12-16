"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  successMessage?: string;
  warnMessage?: string;
  errorMessage?: string;
};

const Toast = ({ successMessage, warnMessage, errorMessage }: ToastProps) => {
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }

    if (warnMessage) {
      toast.warn(warnMessage);
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, warnMessage, errorMessage]);

  return null; // This component doesn't render anything directly, it just triggers toasts
};

export default Toast;
