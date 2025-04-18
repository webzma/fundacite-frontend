import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CourseProvider } from "@/context/course-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema Administrativo de Talleres y Cursos",
  description: "Gestiona tus talleres y cursos fácilmente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CourseProvider>{children}</CourseProvider>
        <Toaster />
      </body>
    </html>
  );
}
