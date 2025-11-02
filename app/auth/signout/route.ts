import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookiesStore = await cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookiesStore
  });

  const {data: { session }} = await supabase.auth.getSession();

  if ( session ) {
    await supabase.auth.signOut();
  };

  return NextResponse.redirect(new URL('/', req.url), { status: 302 });
}