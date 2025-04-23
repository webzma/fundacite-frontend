"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/context/course-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

export default function CursosPublicos() {
  const { courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  // Cambiamos el valor inicial a "all" en lugar de cadena vacía
  const [activityType, setActivityType] = useState("all");

  // Filtrar solo cursos activos
  const activeCourses = courses.filter((course) => course.status === "active");

  // Aplicar filtros de búsqueda y tipo
  const filteredCourses = activeCourses.filter(
    (course) =>
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activityType === "all" || course.type === activityType)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Descubre nuestras actividades educativas
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Explora nuestra amplia oferta de actividades educativas diseñadas
              para impulsar tu desarrollo personal y profesional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#actividades">Ver Todos los Cursos</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
              >
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="py-8 container mx-auto px-4" id="actividades">
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Buscar Actividades</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por título o instructor..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo de actividad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="taller">Talleres</SelectItem>
                  <SelectItem value="curso">Cursos</SelectItem>
                  <SelectItem value="charla">Charlas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Actividades Disponibles</h2>
            <p className="text-muted-foreground">
              {filteredCourses.length} resultados
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                No se encontraron actividades
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta con otros términos de búsqueda o filtros
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setActivityType("all");
                }}
              >
                Ver todas las actividades
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="h-full flex flex-col hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <Badge className="mb-2">
                        {course.type === "taller"
                          ? "Taller"
                          : course.type === "curso"
                          ? "Curso"
                          : "Charla"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Disponible
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description || "Sin descripción disponible"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Instructor: </span>
                        <span className="font-medium ml-1">
                          {course.instructor}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Duración: </span>
                        <span className="font-medium ml-1">
                          {course.duration} horas
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Capacidad: </span>
                        <span className="font-medium ml-1">
                          {course.students}/{course.capacity} estudiantes
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/actividades/${course.id}`}>
                        Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Categorías Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </div>
                <CardTitle>Desarrollo Web</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprende las últimas tecnologías en desarrollo web, desde HTML
                  y CSS hasta frameworks modernos.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Explorar Categoría</Button>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <CardTitle>Diseño UX/UI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Domina el arte del diseño de interfaces y experiencia de
                  usuario con herramientas profesionales.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Explorar Categoría</Button>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <CardTitle>Inteligencia Artificial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explora los fundamentos y aplicaciones prácticas de la
                  inteligencia artificial y machine learning.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Explorar Categoría</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar tu aprendizaje?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Regístrate hoy y comienza tu viaje de aprendizaje con acceso a todos
            nuestros cursos y talleres.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/registro">Crear Cuenta</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
              asChild
            >
              <Link href="/">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
