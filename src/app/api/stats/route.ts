import { NextResponse } from "next/server";
import { getDashboardStatsFromDb, seedDemoDataIfEmpty } from "@/lib/db-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await seedDemoDataIfEmpty();
    const stats = await getDashboardStatsFromDb();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to calculate statistics";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
