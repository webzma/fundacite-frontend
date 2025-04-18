"use client";

import { login } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useActionState, useState } from "react";

export function LoginForm() {
  const [state, formAction, isLoading] = useActionState(login, { error: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="border-border shadow-lg overflow-hidden">
      <div className="h-1 bg-primary w-full"></div>
      <form action={formAction}>
        <CardContent className="space-y-4 pt-6">
          {state.error && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="h-10"
              required
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="h-10"
              required
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
                Iniciando sesión...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar sesión
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
