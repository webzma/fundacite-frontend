"use client";

import { useState } from "react";
import { register } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useActionState } from "react";

const initialState = {
  errors: {},
  success: false,
};

export function RegistroForm() {
  const [state, formAction, isLoading] = useActionState(register, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="border-border shadow-lg overflow-hidden">
      <div className="h-1 bg-primary w-full"></div>
      <form action={formAction}>
        <CardContent className="space-y-4 pt-6">
          {state?.errors && Object.values(state.errors).length > 0 && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {Object.values(state.errors).join(" | ")}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              placeholder="Wilberk Ledezma"
              value={formData.name} // Vincula el valor al estado
              onChange={handleChange} // Actualiza el estado al cambiar
            />
            {state?.errors?.name && (
              <p className="text-xs text-red-500">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="wilberk@gmail.com"
              value={formData.email} // Vincula el valor al estado
              onChange={handleChange} // Actualiza el estado al cambiar
            />
            {state?.errors?.email && (
              <p className="text-xs text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password} // Vincula el valor al estado
              onChange={handleChange} // Actualiza el estado al cambiar
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-6 right-0 flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)} // Alterna el estado
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              </span>
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              La contraseña debe tener al menos 8 caracteres
            </p>
            {state?.errors?.password && (
              <p className="text-xs text-red-500">{state.errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword} // Vincula el valor al estado
              onChange={handleChange} // Actualiza el estado al cambiar
            />

            {state?.errors?.confirmPassword && (
              <p className="text-xs text-red-500">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button type="submit" className="w-full h-10" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Crear cuenta
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
