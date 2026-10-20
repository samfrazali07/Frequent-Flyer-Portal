"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Member } from "@/types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onConfirm: (member: Member) => Promise<boolean>;
}

export function DeleteConfirmModal({
  isOpen,
  member,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !member) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const ok = await onConfirm(member);
      if (ok) {
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete member";
      setError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 id="delete-modal-title" className="text-base font-bold text-slate-950">
              Confirm Member Deletion
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete member record{" "}
              <strong className="font-semibold text-slate-900">{member.fullName}</strong> (
              <span className="font-mono">{member.memberId}</span>)?
            </p>
            <p className="mt-1 text-xs text-rose-600 font-medium">
              This action cannot be undone. Active points balance ({member.balance.toLocaleString()} pts) will be cleared.
            </p>

            {error && (
              <div className="mt-3 rounded border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">
                {error}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-50"
          >
            {isDeleting && (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            <span>Delete Member Record</span>
          </button>
        </div>
      </div>
    </div>
  );
}
