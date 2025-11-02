import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookiesStore = await cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookiesStore
  });

  const { searchParams } = new URL(req.url);

  const code = searchParams.get('code');

  if(code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/watch-list', req.url));
}