import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  calculateDashboardStats,
  FrequentFlyerStore,
  safeSanitize,
} from "@/lib/services";
import {
  validateMemberInput,
  validateTransactionInput,
} from "@/lib/validation";
import { logAnalyticsEvent } from "@/lib/telemetry";
import type { Member, Transaction } from "@/types";

describe("End-to-End Frequent Flyer Portal - Acceptance Criteria Suite (ENG-163087)", () => {
  let store: FrequentFlyerStore;

  const sampleMembers: Member[] = [
    {
      id: 1,
      memberId: "FF-10001",
      fullName: "Jane Doe",
      email: "jane.doe@sampleflight.com",
      phone: "+1 555-0192",
      tier: "Platinum",
      balance: 125000,
      status: "Active",
      joinDate: "2023-01-15T00:00:00.000Z",
    },
    {
      id: 2,
      memberId: "FF-10002",
      fullName: "Marcus Vance",
      email: "marcus.v@sampleflight.com",
      tier: "Gold",
      balance: 45000,
      status: "Active",
      joinDate: "2023-04-10T00:00:00.000Z",
    },
    {
      id: 3,
      memberId: "FF-10003",
      fullName: "Elena Rostova",
      email: "elena.r@sampleflight.com",
      tier: "Silver",
      balance: 18000,
      status: "Inactive",
      joinDate: "2023-06-22T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    store = new FrequentFlyerStore();
  });

  // Requirement 1: Dashboard statistics are calculated correctly
  it("Requirement 1: Dashboard statistics are calculated correctly from underlying records", () => {
    const stats = calculateDashboardStats(sampleMembers, [
      {
        id: 1,
        transactionId: "TX-1001",
        memberId: "FF-10001",
        type: "credit",
        amount: 5000,
        description: "Flight bonus",
        resultingBalance: 125000,
        createdAt: "2024-01-10T00:00:00.000Z",
      },
    ]);

    expect(stats.totalMembers).toBe(3);
    expect(stats.activeMembers).toBe(2);
    expect(stats.inactiveMembers).toBe(1);
    expect(stats.totalMiles).toBe(188000); // 125000 + 45000 + 18000
    expect(stats.recentTransactionsCount).toBe(1);
  });

  // Requirement 2: A member can be added with valid input
  it("Requirement 2: A member can be added with valid input", () => {
    const newMemberInput = {
      memberId: "FF-10004",
      fullName: "Carlos Rivera",
      email: "carlos.r@sampleflight.com",
      tier: "Gold" as const,
      status: "Active" as const,
      balance: 25000,
    };

    const added = store.addMember(newMemberInput);
    expect(added.memberId).toBe("FF-10004");
    expect(added.balance).toBe(25000);
    expect(store.getMemberByMemberId("FF-10004")).toBeDefined();
  });

  // Requirement 3: Invalid member input is rejected
  it("Requirement 3: Invalid member input is rejected (missing required fields, bad email, negative balance)", () => {
    const invalidEmail = validateMemberInput({
      memberId: "FF-99999",
      fullName: "Bad Email User",
      email: "not-an-email",
      tier: "Standard",
      status: "Active",
      balance: 100,
    });
    expect(invalidEmail.isValid).toBe(false);
    expect(invalidEmail.errors.email).toBeDefined();

    const missingName = validateMemberInput({
      memberId: "FF-99999",
      fullName: "   ",
      email: "valid@test.com",
      tier: "Standard",
      status: "Active",
      balance: 100,
    });
    expect(missingName.isValid).toBe(false);
    expect(missingName.errors.fullName).toBeDefined();

    const negativeBalance = validateMemberInput({
      memberId: "FF-99999",
      fullName: "Negative Balance User",
      email: "valid@test.com",
      tier: "Standard",
      status: "Active",
      balance: -500,
    });
    expect(negativeBalance.isValid).toBe(false);
    expect(negativeBalance.errors.balance).toBeDefined();
  });

  // Requirement 4: Duplicate member IDs are prevented
  it("Requirement 4: Duplicate member IDs are prevented", () => {
    store.addMember({
      memberId: "FF-DUPE-1",
      fullName: "User One",
      email: "one@test.com",
      tier: "Standard",
      status: "Active",
      balance: 1000,
    });

    expect(() => {
      store.addMember({
        memberId: "FF-DUPE-1",
        fullName: "User Two",
        email: "two@test.com",
        tier: "Silver",
        status: "Active",
        balance: 2000,
      });
    }).toThrow(/already exists/i);
  });

  // Requirement 5: Member search returns matching results
  it("Requirement 5: Member search returns matching results by name or member ID", () => {
    sampleMembers.forEach((m) => store.addMember(m));

    const nameMatches = store.searchMembers("Marcus");
    expect(nameMatches.length).toBe(1);
    expect(nameMatches[0].fullName).toBe("Marcus Vance");

    const idMatches = store.searchMembers("FF-10001");
    expect(idMatches.length).toBe(1);
    expect(idMatches[0].fullName).toBe("Jane Doe");
  });

  // Requirement 6: Empty search results show the correct empty state
  it("Requirement 6: Empty search results return empty array without crashing", () => {
    sampleMembers.forEach((m) => store.addMember(m));

    const results = store.searchMembers("Nonexistent Person 999");
    expect(results).toEqual([]);
    expect(results.length).toBe(0);
  });

  // Requirement 7: A member can be edited and deleted
  it("Requirement 7: A member can be edited and deleted with confirmation", () => {
    const member = store.addMember({
      memberId: "FF-EDIT-1",
      fullName: "Original Name",
      email: "original@test.com",
      tier: "Standard",
      status: "Active",
      balance: 1000,
    });

    // Edit
    const updated = store.updateMember(member.memberId, {
      fullName: "Updated Name",
      tier: "Platinum",
    });
    expect(updated.fullName).toBe("Updated Name");
    expect(updated.tier).toBe("Platinum");

    // Delete
    const deleteResult = store.deleteMember(member.memberId);
    expect(deleteResult).toBe(true);
    expect(store.getMemberByMemberId(member.memberId)).toBeUndefined();
  });

  // Requirement 8: A points credit updates the balance correctly
  it("Requirement 8: A points credit updates the balance correctly", () => {
    store.addMember({
      memberId: "FF-CREDIT-1",
      fullName: "Credit User",
      email: "credit@test.com",
      tier: "Standard",
      status: "Active",
      balance: 5000,
    });

    const txn = store.processTransaction({
      memberId: "FF-CREDIT-1",
      type: "credit",
      amount: 2500,
      description: "Flight JFK to LHR",
    });

    expect(txn.resultingBalance).toBe(7500);
    const member = store.getMemberByMemberId("FF-CREDIT-1");
    expect(member?.balance).toBe(7500);
  });

  // Requirement 9: Redemption cannot exceed the available balance
  it("Requirement 9: Redemption cannot exceed the available balance", () => {
    store.addMember({
      memberId: "FF-REDEEM-1",
      fullName: "Redeem User",
      email: "redeem@test.com",
      tier: "Gold",
      status: "Active",
      balance: 10000,
    });

    expect(() => {
      store.processTransaction({
        memberId: "FF-REDEEM-1",
        type: "redemption",
        amount: 15000, // exceeds 10000
        description: "Upgrade to First Class",
      });
    }).toThrow(/insufficient points balance/i);

    // Balance must remain unchanged
    const member = store.getMemberByMemberId("FF-REDEEM-1");
    expect(member?.balance).toBe(10000);
  });

  // Requirement 10: Invalid or negative transaction amounts are rejected
  it("Requirement 10: Invalid or negative transaction amounts are rejected", () => {
    const zeroValidation = validateTransactionInput({
      memberId: "FF-TEST",
      type: "credit",
      amount: 0,
      description: "Zero amount",
    });
    expect(zeroValidation.isValid).toBe(false);

    const negativeValidation = validateTransactionInput({
      memberId: "FF-TEST",
      type: "credit",
      amount: -500,
      description: "Negative amount",
    });
    expect(negativeValidation.isValid).toBe(false);
  });

  // Requirement 11: Transaction history matches successful balance changes
  it("Requirement 11: Transaction history matches successful balance changes", () => {
    store.addMember({
      memberId: "FF-HIST-1",
      fullName: "History User",
      email: "history@test.com",
      tier: "Silver",
      status: "Active",
      balance: 10000,
    });

    store.processTransaction({
      memberId: "FF-HIST-1",
      type: "credit",
      amount: 3000,
      description: "Flight Miles Bonus",
    });

    store.processTransaction({
      memberId: "FF-HIST-1",
      type: "redemption",
      amount: 4000,
      description: "Lounge Pass Redemption",
    });

    const history = store.getMemberTransactions("FF-HIST-1");
    expect(history.length).toBe(2);
    expect(history[0].type).toBe("credit");
    expect(history[0].resultingBalance).toBe(13000);
    expect(history[1].type).toBe("redemption");
    expect(history[1].resultingBalance).toBe(9000);
  });

  // Requirement 12: Loading and error states work correctly
  it("Requirement 12: Transaction execution fails gracefully on unknown member ID", () => {
    expect(() => {
      store.processTransaction({
        memberId: "FF-NONEXISTENT",
        type: "credit",
        amount: 1000,
        description: "Ghost member transaction",
      });
    }).toThrow(/member not found/i);
  });

  // Requirement 13: Malformed stored data does not crash the application
  it("Requirement 13: Malformed stored data does not crash store initialization", () => {
    const malformedJson = "{ invalid-json: true, ";
    expect(() => {
      store.loadFromJson(malformedJson);
    }).not.toThrow();

    // Store should remain operational with safe fallback
    expect(store.getAllMembers()).toBeDefined();
  });

  // Requirement 14: User-controlled text is rendered safely (XSS sanitization)
  it("Requirement 14: User-controlled text is sanitized against malicious HTML tags", () => {
    const maliciousInput = '<script>alert("xss")</script><img src="x" onerror="evil()" />Normal Name';
    const sanitized = safeSanitize(maliciousInput);
    expect(sanitized).not.toContain("<script>");
    expect(sanitized).not.toContain('onerror="evil()"');
    expect(sanitized).toContain("Normal Name");
  });

  // Requirement 15: Primary actions trigger the simulated analytics message
  it("Requirement 15: Primary actions trigger the simulated analytics message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logAnalyticsEvent("add_member", { memberId: "FF-12345" });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] User interacted with End-to-End Frequent Flyer Portal",
      expect.objectContaining({ action: "add_member" })
    );

    consoleSpy.mockRestore();
  });
});
