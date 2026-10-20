"use client";

import React from "react";
import { Plane, PlusCircle, ArrowLeftRight, RotateCcw } from "lucide-react";

interface NavbarProps {
  onOpenAddMember: () => void;
  onOpenTransaction: () => void;
  onResetDemoData: () => void;
  isResetting: boolean;
}

export function Navbar({
  onOpenAddMember,
  onOpenTransaction,
  onResetDemoData,
  isResetting,
}: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Plane className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-950">
                  Frequent Flyer Portal
                </span>
                <span className="hidden sm:inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  ENG-163087
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Floor Staff Desk Operations &bull; Digital Member Registry
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onResetDemoData}
              disabled={isResetting}
              title="Restore clean sample data records"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isResetting ? "animate-spin" : ""}`} aria-hidden="true" />
              <span className="hidden md:inline">Reset Demo Data</span>
            </button>

            <button
              type="button"
              onClick={onOpenTransaction}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Points +/-</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddMember}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-xs"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
