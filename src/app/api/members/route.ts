import { NextRequest, NextResponse } from "next/server";
import {
  getMembersFromDb,
  createMemberInDb,
  seedDemoDataIfEmpty,
} from "@/lib/db-service";
import { validateMemberInput } from "@/lib/validation";
import { MemberInput } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await seedDemoDataIfEmpty();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const tier = searchParams.get("tier") || undefined;
    const status = searchParams.get("status") || undefined;

    const memberList = await getMembersFromDb(search, tier, status);
    return NextResponse.json({
      success: true,
      data: memberList,
      count: memberList.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch members";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<MemberInput>;
    const validation = validateMemberInput(body);

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

    const created = await createMemberInDb(body as MemberInput);
    return NextResponse.json(
      {
        success: true,
        data: created,
        message: `Member ${created.memberId} registered successfully`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create member";
    const status = message.toLowerCase().includes("already exists") ? 409 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
