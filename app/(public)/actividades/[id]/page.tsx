"use client";

import { CardFooter } from "@/components/ui/card";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourses } from "@/context/course-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  BookOpen,
  User,
  MapPin,
  Share2,
  Download,
  MessageSquare,
} from "lucide-react";

export default function CursoDetalle({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { courses } = useCourses();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === params.id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // Redirigir si no se encuentra el curso
      router.push("/cursos");
    }
  }, [courses, params.id, router]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Cargando información del curso...</p>
        </div>
      </div>
    );
  }

  // Calcular porcentaje de ocupación
  const ocupacionPorcentaje =
    course.capacity > 0
      ? Math.round((course.students / course.capacity) * 100)
      : 0;

  // Datos simulados para el temario
  const temario = [
    { id: 1, titulo: "Introducción al curso", duracion: "1 hora" },
    { id: 2, titulo: "Fundamentos básicos", duracion: "2 horas" },
    { id: 3, titulo: "Herramientas y metodologías", duracion: "3 horas" },
    { id: 4, titulo: "Aplicaciones prácticas", duracion: "4 horas" },
    { id: 5, titulo: "Proyecto final", duracion: "2 horas" },
  ];

  // Datos simulados para los requisitos
  const requisitos = [
    "Conocimientos básicos de computación",
    "Laptop o computadora con acceso a internet",
    "Software específico (se proporcionarán instrucciones de instalación)",
    "Interés en aprender y participar activamente",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb y navegación */}
      <div className="bg-muted/30 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Inicio
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/cursos"
              className="text-muted-foreground hover:text-foreground"
            >
              Cursos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium truncate">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Encabezado del curso */}
      <section className="py-8 md:py-12 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="w-10 h-10 shrink-0"
          >
            <Link href="/actividades">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-primary/10 text-primary border-primary/20">
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

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {course.title}
            </h1>

            <p className="text-muted-foreground mb-6">
              {course.description ||
                "Este curso está diseñado para proporcionar a los estudiantes una comprensión profunda de los conceptos fundamentales y aplicaciones prácticas en el campo."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duración</p>
                  <p className="font-medium">{course.duration} horas</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estudiantes</p>
                  <p className="font-medium">{course.students} inscritos</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 sm:flex-none">
                Inscribirse Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Solicitar Información
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-8 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="descripcion">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="temario">Temario</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="descripcion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de este curso</CardTitle>
                    <CardDescription>
                      Información detallada sobre el contenido y objetivos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      {course.description ||
                        `Este ${
                          course.type === "taller"
                            ? "taller"
                            : course.type === "curso"
                            ? "curso"
                            : "charla"
                        } está diseñado para proporcionar a los estudiantes una comprensión profunda de los conceptos fundamentales y aplicaciones prácticas en el campo.`}
                    </p>
                    <p>
                      A lo largo de las {course.duration} horas de duración, los
                      participantes adquirirán habilidades prácticas y
                      conocimientos teóricos que podrán aplicar inmediatamente
                      en su entorno profesional o académico.
                    </p>
                    <p>
                      El contenido ha sido cuidadosamente estructurado para
                      garantizar una progresión lógica, comenzando con los
                      fundamentos básicos y avanzando hacia conceptos más
                      complejos y aplicaciones del mundo real.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lo que aprenderás</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>Dominar los conceptos fundamentales del tema</p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>Aplicar técnicas avanzadas en situaciones reales</p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>
                          Desarrollar proyectos prácticos con feedback
                          personalizado
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>Resolver problemas complejos de manera eficiente</p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>Colaborar efectivamente en entornos de equipo</p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p>Mantenerse actualizado con las últimas tendencias</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requisitos.map((requisito, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <span>{requisito}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="temario">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenido del curso</CardTitle>
                    <CardDescription>
                      Desglose detallado de los temas que se cubrirán
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {temario.map((tema, index) => (
                        <div
                          key={tema.id}
                          className="border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start gap-3">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-medium">{tema.titulo}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {tema.duracion}
                                </p>
                              </div>
                            </div>
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca del instructor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {course.instructor}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Especialista en{" "}
                          {course.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="mb-4">
                          Profesional con amplia experiencia en el campo,
                          combinando conocimientos teóricos sólidos con
                          experiencia práctica en la industria. Dedicado a
                          proporcionar una experiencia de aprendizaje de alta
                          calidad.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            5+ años de experiencia
                          </Badge>
                          <Badge variant="outline">Certificado</Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Experiencia</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>
                            Más de 5 años de experiencia en la industria
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Ha impartido más de 20 cursos y talleres</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>
                            Colabora con empresas líderes en el sector
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ocupación</span>
                    <span className="font-medium">{ocupacionPorcentaje}%</span>
                  </div>
                  <Progress value={ocupacionPorcentaje} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {course.students} de {course.capacity} plazas ocupadas
                  </p>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Fecha de inicio
                        </p>
                        <p className="font-medium">Próximamente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Duración total
                        </p>
                        <p className="font-medium">{course.duration} horas</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Modalidad
                        </p>
                        <p className="font-medium">Presencial / Virtual</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparte este curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-.237 0-5.223-.006-6.24-3.456-.505-1.724.414-3.5 2.48-3.5 1.283 0 2.27.917 2.79 1.38.196.177.356.358.51.538.448-.368.988-.623 1.571-.623 1.074 0 1.92.83 1.92 1.92 0 1.738-1.874 3.742-3.031 3.742zm5.356-8.501c-.835.24-1.68.4-2.53.482.85-.182 1.68-.442 2.476-.775.81-.337 1.6-.74 2.323-1.21.725-.47 1.393-1.01 1.976-1.61.585-.598 1.1-1.243 1.525-1.93.43-.684.77-1.41 1.02-2.16.252-.75.38-1.525.38-2.3 0-.21-.01-.43-.03-.63.49.39.92.84 1.27 1.33-.51-.23-1.03-.41-1.57-.54.56.34.99.87 1.19 1.5-.51-.3-1.07-.52-1.67-.64.24.38.37.82.37 1.29 0 .62-.17 1.19-.48 1.68-.32.49-.77.88-1.32 1.15.56-.06 1.07-.21 1.54-.46-.38.56-.86 1.03-1.43 1.38.17.52.26 1.07.26 1.64 0 .94-.23 1.82-.7 2.58-.46.77-1.13 1.37-1.98 1.8.92-.23 1.78-.61 2.52-1.16-.17.93-.55 1.77-1.14 2.48.88-.43 1.69-.99 2.4-1.68-.43.93-1.01 1.76-1.74 2.46.73-.36 1.42-.8 2.05-1.32-.55.79-1.21 1.51-1.97 2.11.65-.23 1.28-.51 1.88-.84-.64.65-1.36 1.22-2.16 1.69.68-.12 1.35-.29 1.99-.5-.71.5-1.48.92-2.3 1.25.6-.04 1.2-.11 1.78-.23-.76.34-1.56.61-2.39.8.51.04 1.03.06 1.55.06.24 0 .48-.01.71-.02-.81.19-1.64.31-2.49.36.31.05.62.08.94.08 1.9 0 3.67-.73 5.05-1.95 1.38-1.22 2.4-2.93 2.91-4.92.51-1.99.38-4.08-.39-5.95-.77-1.87-2.09-3.49-3.8-4.56-1.7-1.08-3.74-1.54-5.77-1.29-2.03.25-3.92 1.23-5.32 2.75-1.4 1.51-2.22 3.51-2.31 5.58-.09 2.07.54 4.13 1.78 5.8 1.24 1.66 3.07 2.87 5.13 3.37 2.06.5 4.22.27 6.09-.66-2.3 2.27-5.8 2.95-8.88 1.73-3.08-1.22-5.26-4.12-5.48-7.38-.22-3.26 1.51-6.42 4.35-8.05 2.85-1.63 6.43-1.45 9.09.45 2.67 1.91 3.97 5.25 3.3 8.41-.66 3.16-3.25 5.63-6.47 6.2 1.76-.48 3.38-1.51 4.61-2.98 1.23-1.46 1.96-3.31 2.05-5.23.09-1.92-.45-3.85-1.53-5.45-1.08-1.6-2.67-2.8-4.52-3.4-1.85-.6-3.88-.55-5.68.15-1.81.7-3.36 2.01-4.39 3.71-1.03 1.7-1.48 3.72-1.25 5.7.22 1.98 1.11 3.86 2.5 5.27 1.39 1.41 3.29 2.27 5.27 2.37-2.46.63-5.11.03-7.07-1.63-1.96-1.66-3.03-4.3-2.85-6.88.18-2.58 1.62-5 3.83-6.42 2.21-1.42 5.02-1.72 7.51-.8 2.48.92 4.46 2.99 5.23 5.53.77 2.54.21 5.34-1.5 7.47-1.7 2.13-4.44 3.22-7.13 2.87 1.41.39 2.91.33 4.28-.19 1.37-.52 2.58-1.45 3.49-2.7.91-1.24 1.48-2.75 1.63-4.31.15-1.56-.12-3.14-.78-4.54-.66-1.4-1.69-2.59-2.99-3.43-1.29-.84-2.84-1.3-4.4-1.3-1.56 0-3.1.46-4.4 1.3-1.29.84-2.32 2.03-2.98 3.43-.66 1.4-.93 2.98-.78 4.54.15 1.56.72 3.07 1.63 4.31.91 1.24 2.12 2.18 3.49 2.7 1.37.52 2.87.58 4.28.19-1.35.18-2.74-.04-3.99-.64-1.25-.6-2.33-1.56-3.09-2.77-.76-1.21-1.19-2.65-1.22-4.11-.03-1.47.34-2.92 1.05-4.16.71-1.25 1.75-2.26 2.97-2.91 1.22-.65 2.62-.92 3.99-.77 1.37.15 2.69.7 3.76 1.58 1.07.88 1.85 2.07 2.25 3.4.4 1.33.4 2.77 0 4.1-.4 1.33-1.18 2.52-2.25 3.4-1.07.88-2.39 1.43-3.76 1.58-1.37.15-2.77-.12-3.99-.77-1.22-.65-2.26-1.66-2.97-2.91-.71-1.25-1.08-2.7-1.05-4.16.03-1.47.46-2.9 1.22-4.11.76-1.21 1.84-2.17 3.09-2.77 1.25-.6 2.64-.82 3.99-.64-1.41-.39-2.91-.33-4.28.19-1.37.52-2.58 1.45-3.49 2.7-.91 1.24-1.48 2.75-1.63 4.31-.15 1.56.12 3.14.78 4.54.66 1.4 1.69 2.59 2.98 3.43 1.3.84 2.84 1.3 4.4 1.3 1.56 0 3.11-.46 4.4-1.3 1.3-.84 2.33-2.03 2.99-3.43.66-1.4.93-2.98.78-4.54-.15-1.56-.72-3.07-1.63-4.31-.91-1.24-2.12-2.18-3.49-2.7-1.37-.52-2.87-.58-4.28-.19 2.69-.35 5.43.74 7.13 2.87 1.71 2.13 2.27 4.93 1.5 7.47-.77 2.54-2.75 4.61-5.23 5.53-2.49.92-5.3.62-7.51-.8-2.21-1.42-3.65-3.84-3.83-6.42-.18-2.58.89-5.22 2.85-6.88 1.96-1.66 4.61-2.26 7.07-1.63-1.98.1-3.88.96-5.27 2.37-1.39 1.41-2.28 3.29-2.5 5.27-.23 1.98.22 4 1.25 5.7 1.03 1.7 2.58 3.01 4.39 3.71 1.8.7 3.83.75 5.68.15 1.85-.6 3.44-1.8 4.52-3.4 1.08-1.6 1.62-3.53 1.53-5.45-.09-1.92-.82-3.77-2.05-5.23-1.23-1.47-2.85-2.5-4.61-2.98 3.22.57 5.81 3.04 6.47 6.2.67 3.16-.63 6.5-3.3 8.41-2.66 1.9-6.24 2.08-9.09.45-2.84-1.63-4.57-4.79-4.35-8.05.22-3.26 2.4-6.16 5.48-7.38 3.08-1.22 6.58-.54 8.88 1.73-1.87-.93-4.03-1.16-6.09-.66-2.06.5-3.89 1.71-5.13 3.37-1.24 1.67-1.87 3.73-1.78 5.8.09 2.07.91 4.07 2.31 5.58 1.4 1.52 3.29 2.5 5.32 2.75 2.03.25 4.07-.21 5.77-1.29 1.71-1.07 3.03-2.69 3.8-4.56.77-1.87.9-3.96.39-5.95-.51-1.99-1.53-3.7-2.91-4.92-1.38-1.22-3.15-1.95-5.05-1.95-.32 0-.63.03-.94.08.85.05 1.68.17 2.49.36-.23-.01-.47-.02-.71-.02-.52 0-1.04.02-1.55.06.83.19 1.63.46 2.39.8-.58-.12-1.18-.19-1.78-.23.82.33 1.59.75 2.3 1.25-.64-.21-1.31-.38-1.99-.5.8.47 1.52 1.04 2.16 1.69-.6-.33-1.23-.61-1.88-.84.76.6 1.42 1.32 1.97 2.11-.63-.52-1.32-.96-2.05-1.32.73.7 1.31 1.53 1.74 2.46-.71-.69-1.52-1.25-2.4-1.68.59.71.97 1.55 1.14 2.48-.74-.55-1.6-.93-2.52-1.16.85.43 1.52 1.03 1.98 1.8.47.76.7 1.64.7 2.58 0 .57-.09 1.12-.26 1.64.57-.35 1.05-.82 1.43-1.38-.47.25-.98.4-1.54.46.55-.27 1-.66 1.32-1.15.31-.49.48-1.06.48-1.68 0-.47-.13-.91-.37-1.29.6.12 1.16.34 1.67.64-.2-.63-.63-1.16-1.19-1.5.54.13 1.06.31 1.57.54-.35-.49-.78-.94-1.27-1.33.02.2.03.42.03.63 0 .775-.128 1.55-.38 2.3-.25.75-.59 1.476-1.02 2.16-.425.687-.94 1.332-1.525 1.93-.583.6-1.25 1.14-1.976 1.61-.723.47-1.513.873-2.323 1.21-.796.333-1.626.593-2.476.775.85-.082 1.695-.242 2.53-.482.83-.19 1.63-.46 2.39-.8-.58.12-1.18.19-1.78.23.82-.33 1.59-.75 2.3-1.25-.64.21-1.31.38-1.99.5.8-.47 1.52-1.04 2.16-1.69-.6.33-1.23.61-1.88.84.76-.6 1.42-1.32 1.97-2.11-.63.52-1.32.96-2.05 1.32.73-.7 1.31-1.53 1.74-2.46-.71.69-1.52 1.25-2.4 1.68.59-.71.97-1.55 1.14-2.48-.74.55-1.6.93-2.52 1.16.85-.43 1.52-1.03 1.98-1.8.47-.76.7-1.64.7-2.58 0-.57-.09-1.12-.26-1.64.57.35 1.05.82 1.43 1.38-.47-.25-.98-.4-1.54-.46.55.27 1 .66 1.32 1.15.31.49.48 1.06.48 1.68 0 .47-.13.91-.37 1.29.6-.12 1.16-.34 1.67-.64-.2.63-.63 1.16-1.19 1.5.54-.13 1.06-.31 1.57-.54-.35.49-.78.94-1.27 1.33.02-.2.03-.42.03-.63 0-.775-.128-1.55-.38-2.3-.25-.75-.59-1.476-1.02-2.16-.425-.687-.94-1.332-1.525-1.93-.583-.6-1.25-1.14-1.976-1.61-.723-.47-1.513-.873-2.323-1.21-.796-.333-1.626-.593-2.476-.775.85.082 1.695.242 2.53.482.83.19 1.63.46 2.39.8-.58-.12-1.18-.19-1.78-.23.82.33 1.59.75 2.3 1.25-.64-.21-1.31-.38-1.99-.5.8.47 1.52 1.04 2.16 1.69-.6-.33-1.23-.61-1.88-.84.76.6 1.42 1.32 1.97 2.11-.63-.52-1.32-.96-2.05-1.32.73.7 1.31 1.53 1.74 2.46-.71-.69-1.52-1.25-2.4-1.68.59.71.97 1.55 1.14 2.48-.74-.55-1.6-.93-2.52-1.16.85.43 1.52 1.03 1.98 1.8.47.76.7 1.64.7 2.58 0 .57-.09 1.12-.26 1.64.57-.35 1.05-.82 1.43-1.38-.47.25-.98.4-1.54.46.55-.27 1-.66 1.32-1.15.31-.49.48-1.06.48-1.68 0-.47-.13-.91-.37-1.29.6.12 1.16.34 1.67.64-.2-.63-.63-1.16-1.19-1.5.54.13 1.06.31 1.57.54-.35-.49-.78-.94-1.27-1.33.02.2.03.42.03.63 0 .775-.128 1.55-.38 2.3-.25.75-.59 1.476-1.02 2.16-.425.687-.94 1.332-1.525 1.93-.583.6-1.25 1.14-1.976 1.61-.723.47-1.513.873-2.323 1.21-.796.333-1.626.593-2.476.775.85-.082 1.695-.242 2.53-.482.83-.19 1.63-.46 2.39-.8-.58.12-1.18.19-1.78.23.82-.33 1.59-.75 2.3-1.25-.64.21-1.31.38-1.99.5.8-.47 1.52-1.04 2.16-1.69-.6.33-1.23.61-1.88.84.76-.6 1.42-1.32 1.97-2.11-.63.52-1.32.96-2.05-1.32.73.7 1.31 1.53 1.74 2.46-.71-.69-1.52-1.25-2.4-1.68.59.71.97 1.55 1.14 2.48-.74-.55-1.6-.93-2.52-1.16.85.43 1.52 1.03 1.98 1.8.47.76.7 1.64.7 2.58 0 .57-.09 1.12-.26 1.64.57-.35 1.05-.82 1.43-1.38-.47.25-.98.4-1.54.46.55-.27 1-.66 1.32-1.15.31-.49.48-1.06.48-1.68 0-.47-.13-.91-.37-1.29.6.12 1.16.34 1.67.64-.2-.63-.63-1.16-1.19-1.5.54.13 1.06.31 1.57.54-.35-.49-.78-.94-1.27-1.33.02.2.03.42.03.63 0 .775-.128 1.55-.38 2.3-.25.75-.59 1.476-1.02 2.16-.425.687-.94 1.332-1.525 1.93-.583.6-1.25 1.14-1.976 1.61-.723.47-1.513.873-2.323 1.21-.796.333-1.626.593-2.476.775.85-.082 1.695-.242 2.53-.482z" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir enlace
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Material adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Guía del curso (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Recursos complementarios
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>¿Necesitas ayuda?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contactar con soporte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos relacionados */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Cursos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses
              .filter((c) => c.id !== course.id && c.status === "active")
              .slice(0, 3)
              .map((relatedCourse) => (
                <Card
                  key={relatedCourse.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <Badge className="mb-2 w-fit">
                      {relatedCourse.type === "taller"
                        ? "Taller"
                        : relatedCourse.type === "curso"
                        ? "Curso"
                        : "Charla"}
                    </Badge>
                    <CardTitle className="text-lg">
                      {relatedCourse.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedCourse.description ||
                        "Sin descripción disponible"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Instructor: </span>
                      <span className="font-medium ml-1">
                        {relatedCourse.instructor}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/cursos/${relatedCourse.id}`}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
