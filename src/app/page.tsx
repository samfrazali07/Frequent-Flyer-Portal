"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { DashboardCards } from "@/components/DashboardCards";
import { MemberTable } from "@/components/MemberTable";
import { MemberModal } from "@/components/MemberModal";
import { TransactionModal } from "@/components/TransactionModal";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Toast, ToastMessage } from "@/components/Toast";
import { logAnalyticsEvent } from "@/lib/telemetry";
import { Member, MemberInput, TransactionInput, DashboardStats, Transaction } from "@/types";
import { ShieldCheck, Info, Clock, AlertCircle } from "lucide-react";

export default function FrequentFlyerPortalPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Active view tab: "members" or "activity"
  const [activeTab, setActiveTab] = useState<"members" | "activity">("members");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMemberForEdit, setSelectedMemberForEdit] = useState<Member | null>(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedMemberForTxn, setSelectedMemberForTxn] = useState<Member | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemberForDetail, setSelectedMemberForDetail] = useState<Member | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMemberForDelete, setSelectedMemberForDelete] = useState<Member | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastMessage["type"] = "success") => {
    setToast({
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
    });
  };

  // Fetch all members, stats, and recent transactions
  const loadPortalData = useCallback(async () => {
    setIsLoading(true);
    setGeneralError(null);
    try {
      // 1. Load members with current filters
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (selectedTier !== "All") params.set("tier", selectedTier);
      if (selectedStatus !== "All") params.set("status", selectedStatus);

      const [membersRes, statsRes, txnsRes] = await Promise.all([
        fetch(`/api/members?${params.toString()}`),
        fetch("/api/stats"),
        fetch("/api/transactions?limit=15"),
      ]);

      if (!membersRes.ok) throw new Error("Failed to load members directory");
      if (!statsRes.ok) throw new Error("Failed to load dashboard metrics");

      const membersData = await membersRes.json();
      const statsData = await statsRes.json();
      const txnsData = txnsRes.ok ? await txnsRes.json() : { data: [] };

      if (membersData.success) {
        setMembers(membersData.data || []);
      }
      if (statsData.success) {
        setStats(statsData.data || null);
      }
      if (txnsData.success) {
        setRecentTransactions(txnsData.data || []);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to reach database";
      setGeneralError(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedTier, selectedStatus]);

  useEffect(() => {
    loadPortalData();
  }, [loadPortalData]);

  // Handlers for Member Management
  const handleAddMember = async (input: MemberInput): Promise<boolean> => {
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to register member");
      }

      showToast(`Member ${input.fullName} (${input.memberId}) registered successfully!`);
      logAnalyticsEvent("add_member", { memberId: input.memberId, tier: input.tier });
      await loadPortalData();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating member";
      showToast(msg, "error");
      throw err;
    }
  };

  const handleEditMember = async (input: MemberInput): Promise<boolean> => {
    if (!selectedMemberForEdit) return false;
    try {
      const res = await fetch(`/api/members/${selectedMemberForEdit.memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update member profile");
      }

      showToast(`Member ${input.fullName} updated successfully!`);
      logAnalyticsEvent("edit_member", { memberId: input.memberId });
      await loadPortalData();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating member";
      showToast(msg, "error");
      throw err;
    }
  };

  const handleDeleteMember = async (member: Member): Promise<boolean> => {
    try {
      const res = await fetch(`/api/members/${member.memberId}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete member");
      }

      showToast(`Member ${member.fullName} (${member.memberId}) removed.`);
      logAnalyticsEvent("delete_member", { memberId: member.memberId });
      await loadPortalData();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting member";
      showToast(msg, "error");
      throw err;
    }
  };

  // Handler for Points Transaction
  const handleProcessTransaction = async (input: TransactionInput): Promise<boolean> => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Transaction failed");
      }

      showToast(
        `Successfully ${input.type === "credit" ? "credited" : "redeemed"} ${Number(input.amount).toLocaleString()} points for ${input.memberId}. New balance: ${json.updatedMember.balance.toLocaleString()} pts`
      );
      logAnalyticsEvent("process_transaction", {
        memberId: input.memberId,
        type: input.type,
        amount: input.amount,
      });

      // Update local member details modal if open
      if (selectedMemberForDetail && selectedMemberForDetail.memberId === input.memberId) {
        setSelectedMemberForDetail(json.updatedMember);
      }

      await loadPortalData();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to process transaction";
      showToast(msg, "error");
      throw err;
    }
  };

  // Reset sample dataset
  const handleResetDemoData = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to restore sample data");
      }

      showToast("Sample demo frequent flyer records restored.");
      logAnalyticsEvent("reset_demo_data");
      setSearchQuery("");
      setSelectedTier("All");
      setSelectedStatus("All");
      await loadPortalData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Reset failed";
      showToast(msg, "error");
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTier("All");
    setSelectedStatus("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Top Banner Notice: Monochromatic enterprise design */}
      <aside aria-label="System Notice" className="bg-slate-900 px-4 py-2 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>
              <strong>Desk Terminal Session:</strong> Floor Operations Portal Active &bull; Sample Airline Data Environment
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span>Ticket: ENG-163087</span>
            <span>PostgreSQL &bull; Drizzle ORM</span>
          </div>
        </div>
      </aside>

      {/* Navigation Header */}
      <Navbar
        onOpenAddMember={() => setIsAddModalOpen(true)}
        onOpenTransaction={() => {
          setSelectedMemberForTxn(members[0] || null);
          setIsTransactionModalOpen(true);
        }}
        onResetDemoData={handleResetDemoData}
        isResetting={isResetting}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Error Recovery Banner */}
        {generalError && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
              <span>{generalError}</span>
            </div>
            <button
              type="button"
              onClick={loadPortalData}
              className="rounded font-semibold underline hover:text-rose-950 focus:outline-none"
            >
              Retry
            </button>
          </div>
        )}

        {/* Operational Overview Cards */}
        <DashboardCards stats={stats} loading={isLoading} />

        {/* View Switcher Tabs */}
        <div className="mt-8 mb-4 border-b border-slate-200">
          <nav aria-label="Portal Sections" className="flex space-x-6">
            <button
              type="button"
              onClick={() => setActiveTab("members")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "members"
                  ? "border-slate-900 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Frequent Flyer Registry
              {stats && (
                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {stats.totalMembers}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "activity"
                  ? "border-slate-900 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Recent Floor Activity Log
              <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                {recentTransactions.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Tab 1: Member Management Table */}
        {activeTab === "members" && (
          <section aria-labelledby="member-directory-title">
            <h2 id="member-directory-title" className="sr-only">
              Member Directory
            </h2>
            <MemberTable
              members={members}
              isLoading={isLoading}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTier={selectedTier}
              onTierChange={setSelectedTier}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onResetFilters={handleResetFilters}
              onViewMember={(m) => {
                setSelectedMemberForDetail(m);
                setIsDetailModalOpen(true);
              }}
              onEditMember={(m) => {
                setSelectedMemberForEdit(m);
                setIsEditModalOpen(true);
              }}
              onDeleteMember={(m) => {
                setSelectedMemberForDelete(m);
                setIsDeleteModalOpen(true);
              }}
              onTransactionMember={(m) => {
                setSelectedMemberForTxn(m);
                setIsTransactionModalOpen(true);
              }}
              onOpenAddMember={() => setIsAddModalOpen(true)}
            />
          </section>
        )}

        {/* Tab 2: Recent Transactions Audit Stream */}
        {activeTab === "activity" && (
          <section aria-labelledby="activity-log-title" className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 id="activity-log-title" className="text-base font-bold text-slate-950">
                  Floor Activity & Points Transaction Audit
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time ledger of point adjustments, ticket miles, and lounge redemptions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedMemberForTxn(members[0] || null);
                  setIsTransactionModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <span>Record New Transaction</span>
              </button>
            </div>

            {recentTransactions.length === 0 ? (
              <div
                role="status"
                aria-live="polite"
                className="p-12 text-center"
              >
                <p className="text-sm font-semibold text-slate-800">No data found</p>
                <p className="mt-1 text-xs text-slate-500">No transactions recorded yet.</p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 uppercase text-slate-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Txn Reference</th>
                      <th className="px-4 py-3">Member ID</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3 text-right">Points Amount</th>
                      <th className="px-4 py-3 text-right">Balance Result</th>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">Audit Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {recentTransactions.map((txn) => {
                      const isCredit = txn.type === "credit";
                      return (
                        <tr key={txn.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-950">{txn.transactionId}</td>
                          <td className="px-4 py-3 font-semibold text-slate-700">{txn.memberId}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isCredit
                                  ? "bg-slate-900 text-white"
                                  : "border border-slate-300 bg-slate-100 text-slate-900"
                              }`}
                            >
                              {txn.type}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-bold ${
                              isCredit ? "text-slate-900" : "text-rose-700"
                            }`}
                          >
                            {isCredit ? "+" : "-"}{txn.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">
                            {txn.resultingBalance.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                            {new Date(txn.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-3 font-sans text-slate-600 max-w-xs truncate" title={txn.description}>
                            {txn.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Frequent Flyer Portal</span>
            <span>&bull;</span>
            <span>Ticket ENG-163087</span>
            <span>&bull;</span>
            <span>P1 High &bull; 5 Story Points</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Corporate Floor Staff Digital Desk</span>
            <span>Accessible WCAG AA Compliant</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <MemberModal
        isOpen={isAddModalOpen}
        mode="create"
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
      />

      <MemberModal
        isOpen={isEditModalOpen}
        mode="edit"
        initialMember={selectedMemberForEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMemberForEdit(null);
        }}
        onSubmit={handleEditMember}
      />

      <TransactionModal
        isOpen={isTransactionModalOpen}
        members={members}
        preselectedMember={selectedMemberForTxn}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedMemberForTxn(null);
        }}
        onSubmit={handleProcessTransaction}
      />

      <MemberDetailModal
        isOpen={isDetailModalOpen}
        member={selectedMemberForDetail}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedMemberForDetail(null);
        }}
        onOpenTransaction={(m) => {
          setSelectedMemberForTxn(m);
          setIsTransactionModalOpen(true);
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        member={selectedMemberForDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMemberForDelete(null);
        }}
        onConfirm={handleDeleteMember}
      />

      {/* Live Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
