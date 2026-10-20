"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowUpRight, ArrowDownLeft, AlertCircle } from "lucide-react";
import { Member, TransactionInput, TransactionType } from "@/types";
import { validateTransactionInput } from "@/lib/validation";

interface TransactionModalProps {
  isOpen: boolean;
  members: Member[];
  preselectedMember?: Member | null;
  onClose: () => void;
  onSubmit: (data: TransactionInput) => Promise<boolean>;
}

export function TransactionModal({
  isOpen,
  members,
  preselectedMember,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [type, setType] = useState<TransactionType>("credit");
  const [amount, setAmount] = useState<number | string>(1000);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (preselectedMember) {
      setSelectedMemberId(preselectedMember.memberId);
    } else if (members.length > 0) {
      setSelectedMemberId(members[0].memberId);
    }
    setType("credit");
    setAmount(1000);
    setDescription("");
    setErrors({});
    setGeneralError(null);
  }, [isOpen, preselectedMember, members]);

  if (!isOpen) return null;

  const currentMember = members.find(
    (m) => m.memberId.toLowerCase() === selectedMemberId.toLowerCase()
  );

  const numericAmount = Math.max(0, Math.floor(Number(amount) || 0));
  const currentBalance = currentMember ? currentMember.balance : 0;
  
  const projectedBalance =
    type === "credit"
      ? currentBalance + numericAmount
      : Math.max(0, currentBalance - numericAmount);

  const isRedemptionExceeding =
    type === "redemption" && numericAmount > currentBalance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const validation = validateTransactionInput({
      memberId: selectedMemberId,
      type,
      amount: Number(amount),
      description,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (type === "redemption" && isRedemptionExceeding) {
      setErrors((prev) => ({
        ...prev,
        amount: `Insufficient points balance. Member only has ${currentBalance.toLocaleString()} points.`,
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit({
        memberId: selectedMemberId,
        type,
        amount: numericAmount,
        description:
          description.trim() ||
          (type === "credit" ? "Floor staff manual point adjustment" : "Reward redemption deduction"),
      });

      if (success) {
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to complete transaction.";
      setGeneralError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="txn-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 id="txn-modal-title" className="text-lg font-bold text-slate-950">
              Record Points Transaction
            </h2>
            <p className="text-xs text-slate-500">
              Credit miles or deduct redemptions with strict balance verification.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* General Error Banner */}
        {generalError && (
          <div
            role="alert"
            className="mt-4 flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          {/* Member Selection */}
          <div>
            <label
              htmlFor="txn-select-member"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Select Member <span className="text-rose-600">*</span>
            </label>
            <select
              id="txn-select-member"
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value);
                setErrors({});
              }}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              {members.map((m) => (
                <option key={m.memberId} value={m.memberId}>
                  {m.memberId} — {m.fullName} ({m.balance.toLocaleString()} pts / {m.tier})
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Transaction Action <span className="text-rose-600">*</span>
            </label>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("credit")}
                className={`flex items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-semibold transition-all ${
                  type === "credit"
                    ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                <span>Credit Points (+)</span>
              </button>
              <button
                type="button"
                onClick={() => setType("redemption")}
                className={`flex items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-semibold transition-all ${
                  type === "redemption"
                    ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ArrowDownLeft className="h-4 w-4 text-rose-400" />
                <span>Redemption (-)</span>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="txn-input-amount"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Points Amount <span className="text-rose-600">*</span>
              </label>
              {errors.amount && (
                <span id="txn-amount-error" className="text-xs font-medium text-rose-600">
                  {errors.amount}
                </span>
              )}
            </div>
            <input
              id="txn-input-amount"
              type="number"
              min="1"
              step="1"
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.amount;
                    return next;
                  });
                }
              }}
              aria-invalid={Boolean(errors.amount || isRedemptionExceeding)}
              aria-describedby={errors.amount ? "txn-amount-error" : undefined}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 ${
                errors.amount || isRedemptionExceeding
                  ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900"
              }`}
              placeholder="e.g. 5000"
            />
            {isRedemptionExceeding && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                Cannot redeem more than available balance ({currentBalance.toLocaleString()} pts).
              </p>
            )}
          </div>

          {/* Live Balance Computation Box */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
            <div className="flex justify-between py-1">
              <span>Current Available Balance:</span>
              <span className="font-mono font-semibold text-slate-900">
                {currentBalance.toLocaleString()} pts
              </span>
            </div>
            <div className="flex justify-between py-1 border-t border-slate-200/60">
              <span>Transaction Impact:</span>
              <span className={`font-mono font-semibold ${type === "credit" ? "text-emerald-700" : "text-rose-700"}`}>
                {type === "credit" ? "+" : "-"}{numericAmount.toLocaleString()} pts
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-t border-slate-200 font-medium">
              <span className="text-slate-900 font-bold">Resulting Balance:</span>
              <span className={`font-mono text-sm font-bold ${isRedemptionExceeding ? "text-rose-600" : "text-slate-950"}`}>
                {isRedemptionExceeding ? "Insufficient Balance" : `${projectedBalance.toLocaleString()} pts`}
              </span>
            </div>
          </div>

          {/* Description / Reason */}
          <div>
            <label
              htmlFor="txn-input-description"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Description / Notes
            </label>
            <input
              id="txn-input-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              placeholder="e.g. Flight JFK-LHR seat upgrade or baggage adjustment"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isRedemptionExceeding || numericAmount <= 0}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-white" />
              )}
              <span>Commit Points Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
