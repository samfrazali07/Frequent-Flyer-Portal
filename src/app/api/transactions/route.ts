import { NextRequest, NextResponse } from "next/server";
import {
  recordTransactionInDb,
  getAllTransactionsFromDb,
  seedDemoDataIfEmpty,
} from "@/lib/db-service";
import { validateTransactionInput } from "@/lib/validation";
import { TransactionInput } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await seedDemoDataIfEmpty();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 30);
    const list = await getAllTransactionsFromDb(limit);

    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch transactions";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await seedDemoDataIfEmpty();
    const body = (await request.json()) as Partial<TransactionInput>;
    const validation = validateTransactionInput(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const result = await recordTransactionInDb(body as TransactionInput);
    return NextResponse.json(
      {
        success: true,
        data: result.transaction,
        updatedMember: result.updatedMember,
        message: `Successfully processed ${body.type} of ${Number(body.amount).toLocaleString()} points for ${body.memberId}`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process transaction";
    const status = message.toLowerCase().includes("insufficient")
      ? 422
      : message.toLowerCase().includes("not found")
      ? 404
      : 500;

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
