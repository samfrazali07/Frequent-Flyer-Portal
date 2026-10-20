import { NextRequest, NextResponse } from "next/server";
import {
  getMemberByMemberIdFromDb,
  updateMemberInDb,
  deleteMemberFromDb,
  getTransactionsForMemberFromDb,
} from "@/lib/db-service";
import { validateMemberInput } from "@/lib/validation";
import { MemberInput } from "@/types";

export const dynamic = "force-dynamic";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const member = await getMemberByMemberIdFromDb(id);

    if (!member) {
      return NextResponse.json(
        { success: false, error: `Member ${id} not found` },
        { status: 404 }
      );
    }

    const memberTransactions = await getTransactionsForMemberFromDb(member.memberId);

    return NextResponse.json({
      success: true,
      data: {
        member,
        transactions: memberTransactions,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve member";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<MemberInput>;

    // Partial validation for fields provided
    const validation = validateMemberInput({
      ...body,
      memberId: id, // ensure memberId is present for validation
    });

    // If certain fields aren't provided in partial update, strip irrelevant error
    if (!validation.isValid) {
      const relevantErrors: Record<string, string> = {};
      for (const [key, val] of Object.entries(validation.errors)) {
        if (body[key as keyof MemberInput] !== undefined) {
          relevantErrors[key] = val;
        }
      }
      if (Object.keys(relevantErrors).length > 0) {
        return NextResponse.json(
          { success: false, error: "Validation failed", errors: relevantErrors },
          { status: 400 }
        );
      }
    }

    const updated = await updateMemberInDb(id, body);
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Member ${id} updated successfully`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update member";
    const status = message.toLowerCase().includes("not found") ? 404 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteMemberFromDb(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Member ${id} not found or could not be removed` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Member ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete member";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
