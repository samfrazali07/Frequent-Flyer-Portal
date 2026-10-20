"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ArrowLeftRight, Clock, Award, Mail, Phone, Calendar, History } from "lucide-react";
import { Member, Transaction } from "@/types";

interface MemberDetailModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onOpenTransaction: (member: Member) => void;
}

export function MemberDetailModal({
  isOpen,
  member,
  onClose,
  onOpenTransaction,
}: MemberDetailModalProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!member) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/members/${member.memberId}`);
      if (!res.ok) throw new Error("Failed to load member profile");
      const json = await res.json();
      if (json.success && json.data.transactions) {
        setTransactions(json.data.transactions);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error loading transactions";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [member]);

  useEffect(() => {
    if (isOpen && member) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [isOpen, member, fetchTransactions]);

  if (!isOpen || !member) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="member-detail-title" className="text-xl font-bold text-slate-950">
                {member.fullName}
              </h2>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {member.memberId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Frequent flyer floor profile &bull; Status: {member.status}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTransaction(member);
              }}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Points +/-</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-5 flex-1 pr-1">
          {/* Summary Badges & Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
              <span className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-slate-700" />
                Tier Level
              </span>
              <p className="mt-1 text-lg font-bold text-slate-900">{member.tier}</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
              <span className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-700" />
                Balance
              </span>
              <p className="mt-1 font-mono text-lg font-bold text-slate-950">
                {member.balance.toLocaleString()} <span className="text-xs font-normal text-slate-500">pts</span>
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
              <span className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-700" />
                Joined
              </span>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {new Date(member.joinDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Passenger Contact Information
            </h3>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{member.phone || "No phone registered"}</span>
              </div>
            </div>
          </div>

          {/* Transaction History Section */}
          <div>
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <History className="h-4 w-4 text-slate-700" />
                Points Transaction History
              </h3>
              <span className="text-xs text-slate-500">
                {transactions.length} record{transactions.length === 1 ? "" : "s"}
              </span>
            </div>

            {isLoading && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center justify-center p-8 text-xs text-slate-500"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-slate-900 mr-2" />
                <span>Loading transaction logs...</span>
              </div>
            )}

            {error && (
              <div className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {error}
              </div>
            )}

            {!isLoading && transactions.length === 0 && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-lg border border-dashed border-slate-300 p-6 text-center"
              >
                <p className="text-sm font-semibold text-slate-800">No data found</p>
                <p className="text-xs text-slate-500 mt-1">
                  No points credits or redemptions have been recorded for this member yet.
                </p>
              </div>
            )}

            {!isLoading && transactions.length > 0 && (
              <div className="rounded-lg border border-slate-200 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Txn ID</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                      <th className="px-3 py-2 text-right">New Balance</th>
                      <th className="px-3 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                    {transactions.map((txn) => {
                      const isCredit = txn.type === "credit";
                      return (
                        <tr key={txn.id} className="hover:bg-slate-50">
                          <td className="px-3 py-2 font-bold text-slate-900">{txn.transactionId}</td>
                          <td className="px-3 py-2 text-slate-500 whitespace-nowrap">
                            {new Date(txn.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                isCredit ? "bg-slate-900 text-white" : "border border-slate-300 bg-slate-100 text-slate-900"
                              }`}
                            >
                              {txn.type}
                            </span>
                          </td>
                          <td
                            className={`px-3 py-2 text-right font-bold ${
                              isCredit ? "text-slate-900" : "text-rose-700"
                            }`}
                          >
                            {isCredit ? "+" : "-"}{txn.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 text-right font-bold text-slate-950">
                            {txn.resultingBalance.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 font-sans text-slate-600 max-w-[150px] truncate" title={txn.description}>
                            {txn.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 pt-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
