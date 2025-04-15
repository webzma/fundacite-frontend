import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      {/* Panel izquierdo - Imagen/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10"></div>
        <div className="absolute inset-0 opacity-20">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-20 max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-4">
            Sistema Administrativo de Actividades
          </h1>
          <p className="text-white/80 mb-6">
            Plataforma integral para la gestión eficiente de talleres y cursos
            educativos. Administra instructores, estudiantes y contenidos en un
            solo lugar.
          </p>
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-white/40"></div>
            <div className="h-2 w-2 rounded-full bg-white/60"></div>
            <div className="h-2 w-2 rounded-full bg-white/80"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary">Iniciar Sesión</h1>
            <p className="text-muted-foreground mt-1">
              Accede a tu cuenta para continuar
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto font-semibold"
              >
                <Link href="/registro">Regístrate aquí</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
