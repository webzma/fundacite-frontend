// app/auth/actions.ts
"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(
    "fundacite-backend-production.up.railway.app/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) throw new Error("Credenciales incorrectas");

  const { token, user } = await res.json();

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  // opcional: guardar parte del user en otra cookie legible (NO datos sensibles)
  (await cookies()).set("user", JSON.stringify(user), {
    httpOnly: false,
    path: "/",
  });

  return user;
}

export async function register(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(
    "fundacite-backend-production.up.railway.app/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  if (!res.ok) throw new Error("Error en el registro");

  return true;
}

export async function logout() {
  (await cookies()).delete("token");
  (await cookies()).delete("user");
}
