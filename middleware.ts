import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function supabaseEnabled(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key || key.length < 20) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }
    // Skip refresh when env vars are still placeholders from a template.
    if (
      url.includes("your-project") ||
      url.includes("example.supabase") ||
      key === "your-anon-key"
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Refreshes the Supabase auth session when properly configured.
 *
 * LoreGraph must never crash in demo mode: if Supabase is missing, misconfigured,
 * or throws on the Edge runtime, we fall through to a normal response.
 */
export async function middleware(request: NextRequest) {
  if (!supabaseEnabled()) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();

  try {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Edge middleware: only mutate the response cookies, not the request.
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    await supabase.auth.getUser();
    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
