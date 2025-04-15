"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  ExternalLink,
  Play,
  Settings,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function Ayuda() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Datos simulados para las preguntas frecuentes
  const faqs = [
    {
      question: "¿Cómo puedo crear una nueva actividad?",
      answer:
        "Para crear una nueva actividad, ve a la sección 'Actividades' en el menú lateral y haz clic en el botón 'Crear Actividad'. Completa el formulario con la información requerida como título, tipo (taller, curso o charla), descripción, instructor, duración y capacidad. Finalmente, haz clic en 'Crear Actividad' para guardar los cambios.",
      category: "talleres",
    },
    {
      question:
        "¿Cuál es la diferencia entre un taller, un curso y una charla?",
      answer:
        "Un taller es una actividad práctica donde los participantes aprenden haciendo. Un curso es una actividad más estructurada con un programa de estudio definido que se desarrolla en varias sesiones. Una charla es una presentación o conferencia de corta duración sobre un tema específico, generalmente informativa y con menos interacción práctica.",
      category: "talleres",
    },
    {
      question: "¿Cómo puedo editar la información de una actividad existente?",
      answer:
        "Para editar una actividad, ve a la sección 'Actividades', localiza la actividad que deseas modificar y haz clic en el icono de edición (lápiz) en la columna de acciones. Actualiza la información necesaria en el formulario y haz clic en 'Guardar Cambios'.",
      category: "talleres",
    },
    {
      question: "¿Cómo puedo ver los reportes de asistencia?",
      answer:
        "Para ver los reportes de asistencia, ve a la sección 'Reportes' en el menú lateral. Una vez allí, selecciona 'Asistencia' en el selector de tipo de reporte en la parte superior de la página. Podrás ver gráficos y tablas detalladas sobre la asistencia a los talleres.",
      category: "reportes",
    },
    {
      question: "¿Cómo puedo filtrar los datos en los reportes?",
      answer:
        "En la sección de 'Reportes', encontrarás un panel de filtros en la parte superior. Puedes filtrar por rango de fechas, instructor y estado del taller. Selecciona los filtros deseados y los reportes se actualizarán automáticamente para mostrar solo los datos relevantes.",
      category: "reportes",
    },
    {
      question: "¿Cómo puedo exportar un reporte?",
      answer:
        "En la sección de 'Reportes', encontrarás botones para exportar en diferentes formatos (PDF, Excel) en la parte superior derecha. Haz clic en el formato deseado y el reporte se descargará automáticamente.",
      category: "reportes",
    },
    {
      question: "¿Cómo puedo cambiar mi contraseña?",
      answer:
        "Para cambiar tu contraseña, ve a la sección 'Configuración' en el menú lateral y selecciona la pestaña 'Seguridad'. Ingresa tu contraseña actual y la nueva contraseña dos veces para confirmarla. Haz clic en 'Guardar cambios' para actualizar tu contraseña.",
      category: "cuenta",
    },
    {
      question: "¿Cómo puedo actualizar mi información de perfil?",
      answer:
        "Para actualizar tu información de perfil, ve a la sección 'Configuración' en el menú lateral y selecciona la pestaña 'Perfil'. Actualiza la información deseada como nombre, correo electrónico, biografía o teléfono. Haz clic en 'Guardar cambios' para actualizar tu perfil.",
      category: "cuenta",
    },
    {
      question: "¿Cómo puedo configurar mis preferencias de notificaciones?",
      answer:
        "Para configurar tus preferencias de notificaciones, ve a la sección 'Configuración' en el menú lateral y selecciona la pestaña 'Notificaciones'. Activa o desactiva las opciones según tus preferencias y haz clic en 'Guardar preferencias' para aplicar los cambios.",
      category: "cuenta",
    },
  ];

  // Filtrar FAQs basado en la búsqueda
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  // Agrupar FAQs por categoría
  const talleresFaqs = filteredFaqs.filter(
    (faq) => faq.category === "talleres"
  );
  const reportesFaqs = filteredFaqs.filter(
    (faq) => faq.category === "reportes"
  );
  const cuentaFaqs = filteredFaqs.filter((faq) => faq.category === "cuenta");

  // Datos simulados para guías
  const guides = [
    {
      title: "Guía de inicio rápido",
      description: "Aprende lo básico para comenzar a usar el sistema",
      icon: BookOpen,
      progress: 0,
      link: "#guia-inicio",
    },
    {
      title: "Gestión de talleres",
      description: "Cómo crear, editar y administrar talleres",
      icon: FileText,
      progress: 0,
      link: "#gestion-talleres",
    },
    {
      title: "Análisis de reportes",
      description: "Cómo interpretar y utilizar los reportes",
      icon: HelpCircle,
      progress: 0,
      link: "#analisis-reportes",
    },
    {
      title: "Configuración de cuenta",
      description: "Personaliza tu perfil y preferencias",
      icon: Settings,
      progress: 0,
      link: "#configuracion-cuenta",
    },
  ];

  // Datos simulados para videos tutoriales
  const tutorials = [
    {
      title: "Introducción al sistema",
      duration: "3:45",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#video-intro",
    },
    {
      title: "Cómo crear un nuevo taller",
      duration: "5:20",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#video-crear-taller",
    },
    {
      title: "Generación de reportes",
      duration: "4:15",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#video-reportes",
    },
    {
      title: "Configuración avanzada",
      duration: "6:30",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#video-config",
    },
  ];

  // Función para manejar la descarga de guías (simulada)
  const handleDownloadGuide = (guideTitle: string) => {
    toast({
      title: "Descarga iniciada",
      description: `La guía "${guideTitle}" se está descargando.`,
      duration: 3000,
    });
  };

  // Función para manejar el envío del formulario de contacto (simulada)
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description:
        "Tu mensaje ha sido enviado. Te responderemos a la brevedad.",
      duration: 3000,
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            Centro de Ayuda
          </h1>
          <p className="text-muted-foreground">
            Encuentra respuestas a tus preguntas y aprende a usar el sistema
          </p>
        </div>
      </div>

      {/* Buscador */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar en la ayuda..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setSearchQuery("crear")}
            >
              Crear taller
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setSearchQuery("reportes")}
            >
              Reportes
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setSearchQuery("contraseña")}
            >
              Contraseña
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setSearchQuery("perfil")}
            >
              Perfil
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setSearchQuery("exportar")}
            >
              Exportar
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contenido principal */}
      <Tabs defaultValue="faqs" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="faqs" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Preguntas Frecuentes</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Guías</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            <span>Tutoriales</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Contacto</span>
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Preguntas Frecuentes */}
        <TabsContent value="faqs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Preguntas Frecuentes
                  </CardTitle>
                  <CardDescription>
                    Respuestas a las preguntas más comunes sobre el sistema
                    administrativo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFaqs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No se encontraron resultados
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        No hay preguntas frecuentes que coincidan con tu
                        búsqueda. Intenta con otros términos o contacta con
                        soporte.
                      </p>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {talleresFaqs.length > 0 && (
                        <>
                          <h3 className="text-lg font-medium mb-2 text-muted-foreground">
                            Actividades
                          </h3>
                          {talleresFaqs.map((faq, index) => (
                            <AccordionItem
                              key={`talleres-${index}`}
                              value={`talleres-${index}`}
                            >
                              <AccordionTrigger className="text-left">
                                <div className="flex items-start">
                                  <span>{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-4 border-l-2 border-muted">
                                  <p className="text-muted-foreground">
                                    {faq.answer}
                                  </p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </>
                      )}

                      {reportesFaqs.length > 0 && (
                        <>
                          <h3 className="text-lg font-medium mb-2 mt-6 text-muted-foreground">
                            Reportes y Estadísticas
                          </h3>
                          {reportesFaqs.map((faq, index) => (
                            <AccordionItem
                              key={`reportes-${index}`}
                              value={`reportes-${index}`}
                            >
                              <AccordionTrigger className="text-left">
                                <div className="flex items-start">
                                  <span>{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-4 border-l-2 border-muted">
                                  <p className="text-muted-foreground">
                                    {faq.answer}
                                  </p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </>
                      )}

                      {cuentaFaqs.length > 0 && (
                        <>
                          <h3 className="text-lg font-medium mb-2 mt-6 text-muted-foreground">
                            Cuenta y Configuración
                          </h3>
                          {cuentaFaqs.map((faq, index) => (
                            <AccordionItem
                              key={`cuenta-${index}`}
                              value={`cuenta-${index}`}
                            >
                              <AccordionTrigger className="text-left">
                                <div className="flex items-start">
                                  <span>{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-4 border-l-2 border-muted">
                                  <p className="text-muted-foreground">
                                    {faq.answer}
                                  </p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </>
                      )}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    ¿No encuentras lo que buscas?
                  </CardTitle>
                  <CardDescription>
                    Otras formas de obtener ayuda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Contacta con soporte</h4>
                      <p className="text-sm text-muted-foreground">
                        Nuestro equipo de soporte está disponible para ayudarte
                        con cualquier problema.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        asChild
                      >
                        <Link href="#contact">Contactar ahora</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Consulta las guías</h4>
                      <p className="text-sm text-muted-foreground">
                        Tenemos guías detalladas sobre todas las funcionalidades
                        del sistema.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        asChild
                      >
                        <Link href="#guides">Ver guías</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <Video className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tutoriales en video</h4>
                      <p className="text-sm text-muted-foreground">
                        Aprende visualmente con nuestros tutoriales paso a paso.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        asChild
                      >
                        <Link href="#videos">Ver tutoriales</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Consejos rápidos
                  </CardTitle>
                  <CardDescription>
                    Aprende a usar el sistema más eficientemente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Usa los filtros en reportes</p>
                      <p className="text-sm text-muted-foreground">
                        Filtra por fecha e instructor para análisis más
                        precisos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Atajos de teclado</p>
                      <p className="text-sm text-muted-foreground">
                        Presiona Ctrl+B para alternar la barra lateral.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Exporta tus reportes</p>
                      <p className="text-sm text-muted-foreground">
                        Descarga en PDF o Excel para compartir o archivar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Guías */}
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Guías de Uso
                  </CardTitle>
                  <CardDescription>
                    Documentación detallada sobre cómo utilizar todas las
                    funcionalidades del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div id="guia-inicio">
                      <h3 className="text-lg font-medium mb-2">
                        Guía de inicio rápido
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            1. Acceso al sistema
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Para acceder al sistema, ingresa tus credenciales en
                            la página de inicio de sesión. Si es tu primera vez,
                            utiliza las credenciales proporcionadas por el
                            administrador.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Básico</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Acceso al sistema")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            2. Navegación por el dashboard
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            El dashboard principal muestra un resumen de la
                            información más relevante. Utiliza el menú lateral
                            para acceder a las diferentes secciones del sistema.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Básico</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide(
                                  "Navegación por el dashboard"
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            3. Personalización de la cuenta
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Configura tu perfil y preferencias en la sección de
                            Configuración. Puedes cambiar tu contraseña,
                            información personal y preferencias de
                            notificaciones.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Básico</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide(
                                  "Personalización de la cuenta"
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div id="gestion-talleres">
                      <h3 className="text-lg font-medium mb-2">
                        Gestión de actividades
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            1. Creación de actividades
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Aprende a crear nuevas actividades (talleres, cursos
                            o charlas), configurar sus detalles como título,
                            descripción, instructor, duración y capacidad.
                            También verás cómo establecer el estado de la
                            actividad.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Intermedio</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Creación de actividades")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            2. Edición y actualización
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Guía detallada sobre cómo editar la información de
                            talleres existentes, actualizar el estado y
                            gestionar la inscripción de estudiantes.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Intermedio</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Edición y actualización")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            3. Gestión de estudiantes
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Aprende a gestionar la inscripción de estudiantes,
                            seguimiento de asistencia y evaluación de desempeño
                            en los talleres.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Avanzado</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Gestión de estudiantes")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div id="analisis-reportes">
                      <h3 className="text-lg font-medium mb-2">
                        Análisis de reportes
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            1. Reportes generales
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Guía sobre cómo interpretar los reportes generales,
                            incluyendo estadísticas de talleres, estudiantes y
                            ocupación.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Intermedio</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Reportes generales")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            2. Reportes por instructor
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Aprende a analizar el desempeño de los instructores,
                            satisfacción de los estudiantes y métricas de
                            asistencia por instructor.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Avanzado</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Reportes por instructor")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            3. Exportación y compartición
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Guía detallada sobre cómo exportar reportes en
                            diferentes formatos, compartirlos con otros usuarios
                            y programar envíos automáticos.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Intermedio</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide(
                                  "Exportación y compartición"
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div id="configuracion-cuenta">
                      <h3 className="text-lg font-medium mb-2">
                        Configuración de cuenta
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            1. Perfil de usuario
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Aprende a actualizar tu información personal,
                            cambiar tu foto de perfil y gestionar tus datos de
                            contacto.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Básico</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Perfil de usuario")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            2. Seguridad de la cuenta
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Guía sobre cómo cambiar tu contraseña, configurar
                            opciones de seguridad adicionales y proteger tu
                            cuenta.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Intermedio</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide("Seguridad de la cuenta")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            3. Preferencias de notificaciones
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Aprende a configurar qué notificaciones recibes,
                            cómo y cuándo las recibes para mantenerte informado
                            sin distracciones.
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline">Básico</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadGuide(
                                  "Preferencias de notificaciones"
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Guías populares
                  </CardTitle>
                  <CardDescription>
                    Las guías más consultadas por los usuarios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {guides.map((guide, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <guide.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">{guide.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>Progreso: {guide.progress}%</span>
                          </div>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-primary"
                            asChild
                          >
                            <Link href={guide.link}>
                              Ver guía <ChevronRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                        {guide.progress > 0 && (
                          <Progress
                            value={guide.progress}
                            className="h-1 mt-1"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Recursos adicionales
                  </CardTitle>
                  <CardDescription>
                    Material complementario para aprender más
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Manual completo del sistema</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Documentación detallada de todas las funcionalidades.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        size="sm"
                      >
                        Descargar PDF <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Glosario de términos</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Definiciones de los términos utilizados en el sistema.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        size="sm"
                      >
                        Ver glosario <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Video className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Webinars de capacitación</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Sesiones grabadas de capacitación para usuarios.
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        size="sm"
                      >
                        Ver biblioteca <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Tutoriales en Video */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Tutoriales en Video
              </CardTitle>
              <CardDescription>
                Aprende visualmente con nuestros tutoriales paso a paso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="group">
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="w-full h-auto aspect-video object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <h4 className="font-medium">{tutorial.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        Tutorial
                      </Badge>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-sm"
                        asChild
                      >
                        <Link href={tutorial.link}>
                          Ver tutorial <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4">
                  Series de tutoriales
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          Curso para principiantes
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Serie de 5 videos que cubren los conceptos básicos del
                          sistema administrativo.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>5 videos • 25 minutos en total</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver serie
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          Análisis avanzado de reportes
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Serie de 3 videos sobre cómo interpretar y utilizar
                          los reportes avanzados.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>3 videos • 18 minutos en total</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver serie
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          Configuración y personalización
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Serie de 4 videos sobre cómo configurar y personalizar
                          el sistema según tus necesidades.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>4 videos • 22 minutos en total</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver serie
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Contacto */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Contacta con Soporte
                  </CardTitle>
                  <CardDescription>
                    Envíanos tus preguntas o problemas y te responderemos a la
                    brevedad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nombre completo
                        </label>
                        <Input id="name" placeholder="Tu nombre" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Correo electrónico
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Asunto
                      </label>
                      <Input
                        id="subject"
                        placeholder="Asunto de tu consulta"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Categoría
                      </label>
                      <select
                        id="category"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="technical">Problema técnico</option>
                        <option value="account">Cuenta y acceso</option>
                        <option value="billing">Facturación</option>
                        <option value="feature">
                          Sugerencia de funcionalidad
                        </option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Describe tu consulta o problema en detalle"
                        required
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground"
                      >
                        Acepto que mi información sea utilizada para responder a
                        mi consulta
                      </label>
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>
                    Otras formas de contactarnos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Correo electrónico</h4>
                      <p className="text-sm text-muted-foreground">
                        soporte@sistemadmin.com
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tiempo de respuesta: 24-48 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-sm text-muted-foreground">
                        +52 (55) 1234-5678
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Lunes a viernes: 9:00 - 18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Chat en vivo</h4>
                      <p className="text-sm text-muted-foreground">
                        Disponible en horario de oficina
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-sm mt-1"
                      >
                        Iniciar chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Preguntas frecuentes
                  </CardTitle>
                  <CardDescription>
                    Respuestas rápidas a dudas comunes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger className="text-sm">
                        ¿Cuál es el tiempo de respuesta de soporte?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Nuestro equipo de soporte responde en un plazo de
                          24-48 horas hábiles. Para casos urgentes, recomendamos
                          utilizar el chat en vivo o llamar por teléfono.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-2">
                      <AccordionTrigger className="text-sm">
                        ¿Ofrecen capacitaciones personalizadas?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Sí, ofrecemos sesiones de capacitación personalizadas
                          para equipos. Contacta con nuestro departamento de
                          soporte para programar una sesión.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-3">
                      <AccordionTrigger className="text-sm">
                        ¿Cómo puedo reportar un error en el sistema?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Puedes reportar errores a través del formulario de
                          contacto seleccionando la categoría "Problema
                          técnico". Incluye capturas de pantalla y pasos para
                          reproducir el error.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
