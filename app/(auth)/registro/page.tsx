import { RegistroForm } from "@/app/(auth)/registro/components/registro-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Registro() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10"></div>
        <div className="absolute inset-0 opacity-20">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          ></svg>
        </div>
        <div className="relative z-20 max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-4">
            Únete a Nuestra Plataforma
          </h1>
          <p className="text-white/80 mb-6">
            Crea una cuenta para acceder a todas las funcionalidades de nuestro
            sistema de gestión de talleres y cursos. Comienza a administrar tus
            programas educativos de manera eficiente.
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary">Crear Cuenta</h1>
            <p className="text-muted-foreground mt-1">
              Regístrate para comenzar
            </p>
          </div>
          <RegistroForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto font-semibold"
              >
                <Link href="/">Inicia sesión</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
