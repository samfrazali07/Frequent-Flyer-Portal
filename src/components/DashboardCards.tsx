"use client";

import React from "react";
import { Users, UserCheck, Award, History } from "lucide-react";
import { DashboardStats } from "@/types";

interface DashboardCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export function DashboardCards({ stats, loading }: DashboardCardsProps) {
  const cards = [
    {
      id: "total-members",
      label: "Total Registered Members",
      value: stats ? stats.totalMembers.toLocaleString() : "--",
      subtext: stats ? `${stats.inactiveMembers} inactive/suspended` : "Loading...",
      icon: Users,
    },
    {
      id: "active-members",
      label: "Active Members",
      value: stats ? stats.activeMembers.toLocaleString() : "--",
      subtext: stats && stats.totalMembers > 0
        ? `${Math.round((stats.activeMembers / stats.totalMembers) * 100)}% active rate`
        : "Standard status",
      icon: UserCheck,
    },
    {
      id: "total-miles",
      label: "Aggregate Points / Miles",
      value: stats ? stats.totalMiles.toLocaleString() : "--",
      subtext: "Across all active tiers",
      icon: Award,
    },
    {
      id: "recent-txns",
      label: "Recent Transactions",
      value: stats ? stats.recentTransactionsCount.toLocaleString() : "--",
      subtext: "Credits and redemptions",
      icon: History,
    },
  ];

  return (
    <section aria-labelledby="dashboard-overview-heading" className="my-6">
      <h2 id="dashboard-overview-heading" className="sr-only">
        Operations Overview
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {card.label}
                </span>
                <div className="rounded-md bg-slate-100 p-2 text-slate-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-3">
                {loading && !stats ? (
                  <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />
                ) : (
                  <p className="text-2xl font-bold tracking-tight text-slate-900">
                    {card.value}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
