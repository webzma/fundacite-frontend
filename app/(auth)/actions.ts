"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(
  _: any,
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios" };
  }

  const res = await fetch(
    "https://fundacite-backend-production.up.railway.app/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data?.message || "Credenciales inválidas" };
  }

  const { token, user } = await res.json();

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  (await cookies()).set("user", JSON.stringify(user), {
    httpOnly: false,
    path: "/",
  });

  redirect("/dashboard");
}

const formSchemaRegister = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export async function register(prevState: any, formData: FormData) {
  // Extraer valores del formulario
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validar los datos usando el esquema
  const result = formSchemaRegister.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  // Si hay errores de validación, devolverlos
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach((error) => {
      const field = error.path[0];
      if (field) {
        fieldErrors[field as string] = error.message;
      }
    });
    return { success: false, errors: fieldErrors };
  }

  const res = await fetch(
    "https://fundacite-backend-production.up.railway.app/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      success: false,
      errors: { email: data?.message || "Error al registrar" },
    };
  }

  redirect("/login");
}

export async function logout() {
  (await cookies()).delete("token");
  (await cookies()).delete("user");
}
