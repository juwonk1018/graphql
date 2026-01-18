import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] border border-green-500/50 backdrop-blur-sm">
        <span className="text-xl">🔔</span>
        <div>
          <p className="font-bold text-sm text-green-100">알림</p>
          <p className="font-medium text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};
