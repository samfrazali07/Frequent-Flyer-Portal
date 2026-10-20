"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 text-white shadow-xl transition-all"
    >
      {isSuccess && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />}
      {isError && <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" aria-hidden="true" />}
      {!isSuccess && !isError && <AlertCircle className="h-5 w-5 shrink-0 text-slate-300" aria-hidden="true" />}
      
      <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
      
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
