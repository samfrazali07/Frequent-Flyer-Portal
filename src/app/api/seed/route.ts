import { NextResponse } from "next/server";
import { db } from "@/db";
import { members, transactions } from "@/db/schema";
import { resetMemoryStore, seedDemoDataIfEmpty } from "@/lib/db-service";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // Clear and re-seed
    if (db) {
      await db.delete(transactions);
      await db.delete(members);
    } else {
      resetMemoryStore();
    }
    await seedDemoDataIfEmpty();

    return NextResponse.json({
      success: true,
      message: "Sample demo dataset restored successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reset sample data";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
