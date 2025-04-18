import { register } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, UserPlus } from "lucide-react";
import { useActionState } from "react";

const initialState = {
  errors: {},
  success: false,
};

export function RegistroForm() {
  const [state, formAction] = useActionState(register, initialState);

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
            <Input id="name" name="name" placeholder="Wilberk Ledezma" />
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
            />
            {state?.errors?.email && (
              <p className="text-xs text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
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
              type="password"
              placeholder="••••••••"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-xs text-red-500">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button type="submit" className="w-full h-10">
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Crear Cuenta
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
