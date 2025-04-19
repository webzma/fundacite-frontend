import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL(
      "/",
      process.env.NEXT_PUBLIC_BASE_URL || "https://fundacite.vercel.app"
    )
  );

  // Eliminar cookies desde la respuesta (así afecta SOLO al cliente que hace la solicitud)
  response.cookies.set("token", "", { path: "/", maxAge: 0 });
  response.cookies.set("user", "", { path: "/", maxAge: 0 });

  return response;
}
