import { describe, it, expect, beforeEach, vi } from "vitest";
import { FrequentFlyerStore, calculateDashboardStats } from "@/lib/services";
import { validateMemberInput, validateTransactionInput } from "@/lib/validation";
import { logAnalyticsEvent } from "@/lib/telemetry";

describe("Frequent Flyer Portal - Comprehensive Edge Cases & Filters", () => {
  let store: FrequentFlyerStore;

  beforeEach(() => {
    store = new FrequentFlyerStore();
    store.addMember({
      memberId: "FF-20001",
      fullName: "Alex O'Connor",
      email: "alex.oconnor@air-test.com",
      tier: "Platinum",
      balance: 100000,
      status: "Active",
    });
    store.addMember({
      memberId: "FF-20002",
      fullName: "Beatrice Morales",
      email: "beatrice.m@air-test.com",
      tier: "Gold",
      balance: 50000,
      status: "Inactive",
    });
    store.addMember({
      memberId: "FF-20003",
      fullName: "Chen Wei",
      email: "chen.w@air-test.com",
      tier: "Silver",
      balance: 20000,
      status: "Suspended",
    });
  });

  it("filters members by status correctly", () => {
    const active = store.searchMembers("", "All", "Active");
    expect(active.length).toBe(1);
    expect(active[0].memberId).toBe("FF-20001");

    const inactive = store.searchMembers("", "All", "Inactive");
    expect(inactive.length).toBe(1);
    expect(inactive[0].memberId).toBe("FF-20002");

    const suspended = store.searchMembers("", "All", "Suspended");
    expect(suspended.length).toBe(1);
    expect(suspended[0].memberId).toBe("FF-20003");
  });

  it("filters members by tier correctly", () => {
    const goldOnly = store.searchMembers("", "Gold", "All");
    expect(goldOnly.length).toBe(1);
    expect(goldOnly[0].memberId).toBe("FF-20002");

    const platinumOnly = store.searchMembers("", "Platinum", "All");
    expect(platinumOnly.length).toBe(1);
    expect(platinumOnly[0].memberId).toBe("FF-20001");
  });

  it("handles case-insensitive search queries and whitespace trimming", () => {
    const resUpper = store.searchMembers("BEATRICE");
    expect(resUpper.length).toBe(1);

    const resPadded = store.searchMembers("  ff-20003   ");
    expect(resPadded.length).toBe(1);
    expect(resPadded[0].memberId).toBe("FF-20003");
  });

  it("redacts sensitive fields in analytics events", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logAnalyticsEvent("create_member", {
      memberId: "FF-9999",
      email: "sensitive@customer.com",
      phone: "+1 555-0199",
      password: "secretpassword",
      tier: "Platinum",
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] User interacted with End-to-End Frequent Flyer Portal",
      expect.objectContaining({
        action: "create_member",
        email: "[REDACTED]",
        phone: "[REDACTED]",
        password: "[REDACTED]",
        tier: "Platinum",
      })
    );

    consoleSpy.mockRestore();
  });

  it("validates transaction type correctly", () => {
    const invalidType = validateTransactionInput({
      memberId: "FF-20001",
      type: "invalid_action" as unknown as "credit",
      amount: 100,
    });
    expect(invalidType.isValid).toBe(false);
    expect(invalidType.errors.type).toBeDefined();
  });

  it("handles empty member array in calculateDashboardStats without division by zero", () => {
    const emptyStats = calculateDashboardStats([]);
    expect(emptyStats.totalMembers).toBe(0);
    expect(emptyStats.activeMembers).toBe(0);
    expect(emptyStats.inactiveMembers).toBe(0);
    expect(emptyStats.totalMiles).toBe(0);
    expect(emptyStats.recentTransactionsCount).toBe(0);
  });
});
