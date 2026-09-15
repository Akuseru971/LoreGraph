import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { emptyProgress, PROGRESS_VERSION } from "@/lib/progress/model";
import type { UserProgress } from "@/types";

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ progress: null, mode: "local" });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ progress: null, mode: "local" });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("user_progress")
    .select("payload")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const progress = (data?.payload as UserProgress | null) ?? emptyProgress();
  return NextResponse.json({ progress, mode: "supabase" });
}

export async function PUT(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: true, mode: "local" });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "local" });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { progress?: UserProgress };
  const progress = body.progress ?? emptyProgress();

  const { error } = await supabase.from("user_progress").upsert({
    user_id: user.id,
    version: PROGRESS_VERSION,
    xp: progress.xp,
    payload: progress,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase.from("user_progress").delete().eq("user_id", user.id);
  return NextResponse.json({ ok: true });
}
