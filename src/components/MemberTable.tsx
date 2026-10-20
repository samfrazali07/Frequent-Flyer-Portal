"use client";

import React from "react";
import { Search, Filter, Eye, Edit3, Trash2, ArrowLeftRight, UserX } from "lucide-react";
import { Member, MembershipStatus, MembershipTier } from "@/types";

interface MemberTableProps {
  members: Member[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTier: string;
  onTierChange: (t: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  onResetFilters: () => void;
  onViewMember: (member: Member) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (member: Member) => void;
  onTransactionMember: (member: Member) => void;
  onOpenAddMember: () => void;
}

export function MemberTable({
  members,
  isLoading,
  searchQuery,
  onSearchChange,
  selectedTier,
  onTierChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  onViewMember,
  onEditMember,
  onDeleteMember,
  onTransactionMember,
  onOpenAddMember,
}: MemberTableProps) {
  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedTier !== "All" || selectedStatus !== "All"
  );

  const getTierBadge = (tier: MembershipTier) => {
    switch (tier) {
      case "Platinum":
        return (
          <span className="inline-flex items-center rounded bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
            Platinum
          </span>
        );
      case "Gold":
        return (
          <span className="inline-flex items-center rounded border border-slate-400 bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-900">
            Gold
          </span>
        );
      case "Silver":
        return (
          <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
            Silver
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
            Standard
          </span>
        );
    }
  };

  const getStatusBadge = (status: MembershipStatus) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" aria-hidden="true" />
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
            Inactive
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-800">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" aria-hidden="true" />
            Suspended
          </span>
        );
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-xs">
      {/* Search and Filters Bar */}
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <label htmlFor="member-search-input" className="sr-only">
              Search members by name or membership ID
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
            <input
              id="member-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by member name, ID (e.g. FF-10021), or email..."
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Tier Filter */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="tier-filter-select" className="text-xs font-medium text-slate-600">
                Tier:
              </label>
              <select
                id="tier-filter-select"
                value={selectedTier}
                onChange={(e) => onTierChange(e.target.value)}
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="All">All Tiers</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Standard">Standard</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="status-filter-select" className="text-xs font-medium text-slate-600">
                Status:
              </label>
              <select
                id="status-filter-select"
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Loading State */}
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center p-12 text-sm text-slate-500"
        >
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-slate-900 mr-2" />
          <span>Loading member records...</span>
        </div>
      )}

      {/* Empty State: No search results */}
      {!isLoading && members.length === 0 && hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center p-12 text-center"
        >
          <div className="rounded-full bg-slate-100 p-3 text-slate-500">
            <Filter className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-slate-900">No data found</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            No frequent flyer records match your search query &quot;{searchQuery}&quot; or selected filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Empty State: Zero members in directory */}
      {!isLoading && members.length === 0 && !hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center p-12 text-center"
        >
          <div className="rounded-full bg-slate-100 p-3 text-slate-500">
            <UserX className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-slate-900">No members registered yet</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            The frequent flyer directory is currently empty. Get started by adding a member.
          </p>
          <button
            type="button"
            onClick={onOpenAddMember}
            className="mt-4 inline-flex items-center rounded-md bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Add first member
          </button>
        </div>
      )}

      {/* Data Table */}
      {!isLoading && members.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Member ID
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Passenger Details
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Tier
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-right">
                  Points Balance
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {members.map((member) => (
                <tr
                  key={member.memberId}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-6 font-mono text-xs font-bold text-slate-900">
                    {member.memberId}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6">
                    <div className="font-semibold text-slate-900">{member.fullName}</div>
                    <div className="text-xs text-slate-500">{member.email}</div>
                    {member.phone && (
                      <div className="text-xs text-slate-400">{member.phone}</div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                    {getTierBadge(member.tier)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-6 text-right font-mono font-bold text-slate-950">
                    {member.balance.toLocaleString()} <span className="text-xs font-normal text-slate-500">pts</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => onTransactionMember(member)}
                        title={`Record points transaction for ${member.fullName}`}
                        aria-label={`Record transaction for ${member.fullName}`}
                        className="rounded p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewMember(member)}
                        title={`View details for ${member.fullName}`}
                        aria-label={`View details for ${member.fullName}`}
                        className="rounded p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditMember(member)}
                        title={`Edit profile for ${member.fullName}`}
                        aria-label={`Edit profile for ${member.fullName}`}
                        className="rounded p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteMember(member)}
                        title={`Delete member ${member.memberId}`}
                        aria-label={`Delete member ${member.memberId}`}
                        className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
