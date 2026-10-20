"use client";

import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Member, MemberInput, MembershipTier, MembershipStatus } from "@/types";
import { validateMemberInput } from "@/lib/validation";

interface MemberModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialMember?: Member | null;
  onClose: () => void;
  onSubmit: (data: MemberInput) => Promise<boolean>;
}

export function MemberModal({
  isOpen,
  mode,
  initialMember,
  onClose,
  onSubmit,
}: MemberModalProps) {
  const [formData, setFormData] = useState<MemberInput>({
    memberId: "",
    fullName: "",
    email: "",
    phone: "",
    tier: "Standard",
    status: "Active",
    balance: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialMember) {
      setFormData({
        memberId: initialMember.memberId,
        fullName: initialMember.fullName,
        email: initialMember.email,
        phone: initialMember.phone || "",
        tier: initialMember.tier,
        status: initialMember.status,
        balance: initialMember.balance,
      });
    } else {
      // Auto-suggest next member ID for create mode
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      setFormData({
        memberId: `FF-${randomSuffix}`,
        fullName: "",
        email: "",
        phone: "",
        tier: "Standard",
        status: "Active",
        balance: 0,
      });
    }
    setErrors({});
    setGeneralError(null);
  }, [isOpen, mode, initialMember]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof MemberInput,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "balance" ? Number(value) : value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const validation = validateMemberInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setGeneralError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 id="member-modal-title" className="text-lg font-bold text-slate-950">
              {mode === "create" ? "Add New Frequent Flyer Member" : "Edit Member Profile"}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === "create"
                ? "Enter floor desk registry details to issue a membership."
                : `Updating records for Member ID ${initialMember?.memberId}`}
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
          {/* Member ID */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-member-id"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Member ID <span className="text-rose-600">*</span>
              </label>
              {errors.memberId && (
                <span id="memberId-error" className="text-xs font-medium text-rose-600">
                  {errors.memberId}
                </span>
              )}
            </div>
            <input
              id="input-member-id"
              type="text"
              required
              disabled={mode === "edit"}
              value={formData.memberId}
              onChange={(e) => handleChange("memberId", e.target.value)}
              aria-invalid={Boolean(errors.memberId)}
              aria-describedby={errors.memberId ? "memberId-error" : undefined}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 ${
                errors.memberId
                  ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900"
              } ${mode === "edit" ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`}
              placeholder="e.g. FF-10029"
            />
          </div>

          {/* Full Name */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-fullname"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Passenger Full Name <span className="text-rose-600">*</span>
              </label>
              {errors.fullName && (
                <span id="fullName-error" className="text-xs font-medium text-rose-600">
                  {errors.fullName}
                </span>
              )}
            </div>
            <input
              id="input-fullname"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                errors.fullName
                  ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900"
              }`}
              placeholder="e.g. Jane Doe"
            />
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Email Address <span className="text-rose-600">*</span>
              </label>
              {errors.email && (
                <span id="email-error" className="text-xs font-medium text-rose-600">
                  {errors.email}
                </span>
              )}
            </div>
            <input
              id="input-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900"
              }`}
              placeholder="e.g. passenger@flight-sample.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="input-phone"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Contact Phone <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="input-phone"
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              placeholder="+1 (555) 012-3456"
            />
          </div>

          {/* Tier and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="input-tier"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Membership Tier
              </label>
              <select
                id="input-tier"
                value={formData.tier}
                onChange={(e) => handleChange("tier", e.target.value as MembershipTier)}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="Standard">Standard</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="input-status"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Account Status
              </label>
              <select
                id="input-status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value as MembershipStatus)}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Balance */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-balance"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                {mode === "create" ? "Initial Points Balance" : "Current Points Balance"} <span className="text-rose-600">*</span>
              </label>
              {errors.balance && (
                <span id="balance-error" className="text-xs font-medium text-rose-600">
                  {errors.balance}
                </span>
              )}
            </div>
            <input
              id="input-balance"
              type="number"
              min="0"
              required
              value={formData.balance}
              onChange={(e) => handleChange("balance", e.target.value)}
              aria-invalid={Boolean(errors.balance)}
              aria-describedby={errors.balance ? "balance-error" : undefined}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 ${
                errors.balance
                  ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900"
              }`}
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
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
            >
              {isSubmitting && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-white" />
              )}
              <span>{mode === "create" ? "Register Member" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
