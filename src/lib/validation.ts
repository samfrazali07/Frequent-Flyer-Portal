import { MemberInput, TransactionInput, ValidationResult } from "@/types";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateMemberInput(
  input: Partial<MemberInput>
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};

  if (!input.memberId || !input.memberId.trim()) {
    errors.memberId = "Member ID is required.";
  } else if (!/^[A-Za-z0-9-_]+$/.test(input.memberId.trim())) {
    errors.memberId = "Member ID must contain only alphanumeric characters and hyphens.";
  }

  if (!input.fullName || !input.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (input.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!input.email || !input.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (input.balance !== undefined && input.balance !== null) {
    const num = Number(input.balance);
    if (isNaN(num) || num < 0) {
      errors.balance = "Starting points balance must be a non-negative number.";
    }
  } else {
    errors.balance = "Points balance is required.";
  }

  const validTiers = ["Standard", "Silver", "Gold", "Platinum"];
  if (input.tier && !validTiers.includes(input.tier)) {
    errors.tier = "Invalid membership tier.";
  }

  const validStatuses = ["Active", "Inactive", "Suspended"];
  if (input.status && !validStatuses.includes(input.status)) {
    errors.status = "Invalid membership status.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTransactionInput(
  input: Partial<TransactionInput>
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};

  if (!input.memberId || !input.memberId.trim()) {
    errors.memberId = "Member ID is required.";
  }

  if (!input.type || !["credit", "redemption"].includes(input.type)) {
    errors.type = "Transaction type must be 'credit' or 'redemption'.";
  }

  if (input.amount === undefined || input.amount === null) {
    errors.amount = "Transaction amount is required.";
  } else {
    const num = Number(input.amount);
    if (isNaN(num) || num <= 0) {
      errors.amount = "Transaction amount must be greater than 0.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
