import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  (await cookieStore).delete("token");
  (await cookieStore).delete("user");

  return NextResponse.redirect(
    new URL(
      "/",
      process.env.NEXT_PUBLIC_BASE_URL || "https://fundacite.vercel.app"
    )
  );
}
