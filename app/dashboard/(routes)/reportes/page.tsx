"use client"

import { useState } from "react"
import { useCourses } from "@/context/course-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  BarChart,
  PieChart,
  LineChart,
  Bar,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from "recharts"
import {
  Download,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Users,
  Calendar,
  Filter,
  FileText,
  Printer,
  Share2,
  RadarIcon,
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function Reportes() {
  const { courses } = useCourses()
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [instructor, setInstructor] = useState("todos")
  const [status, setStatus] = useState("todos")
  const [reportType, setReportType] = useState("general")

  // Obtener lista única de instructores
  const instructores = ["todos", ...new Set(courses.map((course) => course.instructor))]

  // Datos para el gráfico de barras - Estudiantes por taller
  const estudiantesPorTaller = courses.map((course) => ({
    name: course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title,
    estudiantes: course.students,
    capacidad: course.capacity || 0,
  }))

  // Datos para el gráfico circular - Distribución por estado
  const talleresActivos = courses.filter((course) => course.status === "active").length
  const talleresPendientes = courses.filter((course) => course.status === "pending").length
  const distribucionEstados = [
    { name: "Activos", value: talleresActivos, color: "#0284c7" },
    { name: "Pendientes", value: talleresPendientes, color: "#f59e0b" },
  ]

  // Datos para el gráfico de líneas - Tendencia de inscripciones (simulado)
  const tendenciaInscripciones = [
    { name: "Ene", inscripciones: 12 },
    { name: "Feb", inscripciones: 19 },
    { name: "Mar", inscripciones: 15 },
    { name: "Abr", inscripciones: 25 },
    { name: "May", inscripciones: 32 },
    { name: "Jun", inscripciones: 28 },
    { name: "Jul", inscripciones: 40 },
    { name: "Ago", inscripciones: 45 },
    { name: "Sep", inscripciones: 50 },
    { name: "Oct", inscripciones: 55 },
    { name: "Nov", inscripciones: 48 },
    { name: "Dic", inscripciones: 52 },
  ]

  // Datos para el gráfico de radar - Evaluación de talleres (simulado)
  const evaluacionTalleres = [
    { subject: "Contenido", A: 120, B: 110, fullMark: 150 },
    { subject: "Instructor", A: 98, B: 130, fullMark: 150 },
    { subject: "Materiales", A: 86, B: 130, fullMark: 150 },
    { subject: "Instalaciones", A: 99, B: 100, fullMark: 150 },
    { subject: "Organización", A: 85, B: 90, fullMark: 150 },
    { subject: "Utilidad", A: 65, B: 85, fullMark: 150 },
  ]

  // Datos para el gráfico de área - Asistencia por semana (simulado)
  const asistenciaSemanal = [
    { name: "Semana 1", asistencia: 90, ausencia: 10 },
    { name: "Semana 2", asistencia: 85, ausencia: 15 },
    { name: "Semana 3", asistencia: 88, ausencia: 12 },
    { name: "Semana 4", asistencia: 80, ausencia: 20 },
    { name: "Semana 5", asistencia: 92, ausencia: 8 },
    { name: "Semana 6", asistencia: 78, ausencia: 22 },
    { name: "Semana 7", asistencia: 82, ausencia: 18 },
    { name: "Semana 8", asistencia: 87, ausencia: 13 },
  ]

  // Datos para análisis por instructor (simulado)
  const analisisPorInstructor = [
    {
      nombre: "Juan Pérez",
      talleres: 3,
      estudiantes: 45,
      satisfaccion: 92,
      asistencia: 88,
      completitud: 95,
    },
    {
      nombre: "María González",
      talleres: 2,
      estudiantes: 30,
      satisfaccion: 88,
      asistencia: 92,
      completitud: 90,
    },
    {
      nombre: "Carlos Rodríguez",
      talleres: 1,
      estudiantes: 18,
      satisfaccion: 85,
      asistencia: 80,
      completitud: 85,
    },
    {
      nombre: "Ana Martínez",
      talleres: 1,
      estudiantes: 12,
      satisfaccion: 90,
      asistencia: 95,
      completitud: 100,
    },
  ]

  // Datos para análisis de asistencia (simulado)
  const analisisAsistencia = [
    { dia: "Lunes", porcentaje: 92, color: "#10b981" },
    { dia: "Martes", porcentaje: 88, color: "#10b981" },
    { dia: "Miércoles", porcentaje: 95, color: "#10b981" },
    { dia: "Jueves", porcentaje: 90, color: "#10b981" },
    { dia: "Viernes", porcentaje: 85, color: "#f59e0b" },
    { dia: "Sábado", porcentaje: 75, color: "#ef4444" },
  ]

  // Calcular estadísticas generales
  const totalEstudiantes = courses.reduce((acc, course) => acc + course.students, 0)
  const totalCapacidad = courses.reduce((acc, course) => acc + course.capacity, 0)
  const porcentajeOcupacion = totalCapacidad > 0 ? Math.round((totalEstudiantes / totalCapacidad) * 100) : 0
  const promedioEstudiantesPorTaller = courses.length > 0 ? Math.round(totalEstudiantes / courses.length) : 0

  // Función para exportar reportes (simulada)
  const exportarReporte = (formato) => {
    toast({
      title: "Reporte exportado",
      description: `El reporte ha sido exportado en formato ${formato}`,
      duration: 3000,
    })
  }

  // Función para imprimir reporte (simulada)
  const imprimirReporte = () => {
    toast({
      title: "Imprimiendo reporte",
      description: "El reporte se ha enviado a la impresora",
      duration: 3000,
    })
  }

  // Función para compartir reporte (simulada)
  const compartirReporte = () => {
    toast({
      title: "Compartir reporte",
      description: "Se ha generado un enlace para compartir el reporte",
      duration: 3000,
    })
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">Análisis detallado de talleres y estudiantes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de reporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="instructores">Por instructores</SelectItem>
              <SelectItem value="asistencia">Asistencia</SelectItem>
              <SelectItem value="evaluacion">Evaluaciones</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportarReporte("PDF")}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportarReporte("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" onClick={imprimirReporte}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" onClick={compartirReporte}>
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros de Reportes
          </CardTitle>
          <CardDescription>Personaliza los datos mostrados en los reportes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <div className="w-full md:w-64">
              <Select value={instructor} onValueChange={setInstructor}>
                <SelectTrigger>
                  <SelectValue placeholder="Instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructores.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst === "todos" ? "Todos los instructores" : inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {reportType === "general" && (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="dashboard-card">
              <CardHeader className="dashboard-card-header">
                <CardTitle className="dashboard-card-title">Total Talleres</CardTitle>
                <Calendar className="dashboard-card-icon" />
              </CardHeader>
              <CardContent className="dashboard-card-content">
                <div className="dashboard-card-value">{courses.length}</div>
                <p className="dashboard-card-label">Talleres registrados</p>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="dashboard-card-header">
                <CardTitle className="dashboard-card-title">Total Estudiantes</CardTitle>
                <Users className="dashboard-card-icon" />
              </CardHeader>
              <CardContent className="dashboard-card-content">
                <div className="dashboard-card-value">{totalEstudiantes}</div>
                <p className="dashboard-card-label">Estudiantes inscritos</p>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="dashboard-card-header">
                <CardTitle className="dashboard-card-title">Ocupación</CardTitle>
                <BarChart3 className="dashboard-card-icon" />
              </CardHeader>
              <CardContent className="dashboard-card-content">
                <div className="dashboard-card-value">{porcentajeOcupacion}%</div>
                <p className="dashboard-card-label">De la capacidad total</p>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="dashboard-card-header">
                <CardTitle className="dashboard-card-title">Promedio</CardTitle>
                <Users className="dashboard-card-icon" />
              </CardHeader>
              <CardContent className="dashboard-card-content">
                <div className="dashboard-card-value">{promedioEstudiantesPorTaller}</div>
                <p className="dashboard-card-label">Estudiantes por taller</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs de gráficos */}
          <Tabs defaultValue="estudiantes" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="estudiantes" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Estudiantes</span>
                <span className="sm:hidden">Est.</span>
              </TabsTrigger>
              <TabsTrigger value="estados" className="flex items-center">
                <PieChartIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Estados</span>
                <span className="sm:hidden">Est.</span>
              </TabsTrigger>
              <TabsTrigger value="tendencias" className="flex items-center">
                <LineChartIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Tendencias</span>
                <span className="sm:hidden">Tend.</span>
              </TabsTrigger>
              <TabsTrigger value="evaluacion" className="flex items-center">
                <RadarIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Evaluación</span>
                <span className="sm:hidden">Eval.</span>
              </TabsTrigger>
              <TabsTrigger value="asistencia" className="flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Asistencia</span>
                <span className="sm:hidden">Asist.</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="estudiantes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Estudiantes por Taller</CardTitle>
                  <CardDescription>
                    Comparativa de estudiantes inscritos vs. capacidad máxima por taller
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {estudiantesPorTaller.length === 0 ? (
                    <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No hay datos disponibles para mostrar</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={estudiantesPorTaller} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => {
                              return [value, name === "estudiantes" ? "Estudiantes Inscritos" : "Capacidad Máxima"]
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="estudiantes"
                            name="Estudiantes Inscritos"
                            fill="#0369a1"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar dataKey="capacidad" name="Capacidad Máxima" fill="#7dd3fc" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estados">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Distribución por Estado</CardTitle>
                  <CardDescription>Proporción de talleres según su estado actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%" className="max-w-md mx-auto">
                      <PieChart>
                        <Pie
                          data={distribucionEstados}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {distribucionEstados.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} talleres`, "Cantidad"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tendencias">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Tendencia de Inscripciones</CardTitle>
                  <CardDescription>Evolución mensual de inscripciones a talleres</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tendenciaInscripciones} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="inscripciones"
                          name="Inscripciones"
                          stroke="#0284c7"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluacion">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Evaluación de Talleres</CardTitle>
                  <CardDescription>Comparativa de evaluaciones por categoría</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={evaluacionTalleres}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar name="Promedio" dataKey="A" stroke="#0284c7" fill="#0284c7" fillOpacity={0.6} />
                        <Radar name="Objetivo" dataKey="fullMark" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="asistencia">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Asistencia Semanal</CardTitle>
                  <CardDescription>Evolución de la asistencia a lo largo del curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={asistenciaSemanal} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="asistencia"
                          name="Asistencia %"
                          stackId="1"
                          stroke="#0284c7"
                          fill="#0284c7"
                        />
                        <Area
                          type="monotone"
                          dataKey="ausencia"
                          name="Ausencia %"
                          stackId="1"
                          stroke="#f87171"
                          fill="#f87171"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tabla de resumen */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Resumen de Talleres</CardTitle>
              <CardDescription>Datos consolidados de todos los talleres</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th>Taller</th>
                      <th>Instructor</th>
                      <th>Estudiantes</th>
                      <th>Capacidad</th>
                      <th>Ocupación</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => {
                      const ocupacion = course.capacity > 0 ? Math.round((course.students / course.capacity) * 100) : 0

                      return (
                        <tr key={course.id}>
                          <td className="font-medium">{course.title}</td>
                          <td>{course.instructor}</td>
                          <td>{course.students}</td>
                          <td>{course.capacity}</td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    ocupacion > 80 ? "bg-red-500" : ocupacion > 60 ? "bg-yellow-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${ocupacion}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{ocupacion}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${course.status === "active" ? "badge-success" : "badge-warning"}`}>
                              {course.status === "active" ? "Activo" : "Pendiente"}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {reportType === "instructores" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Rendimiento por Instructor</CardTitle>
                <CardDescription>Comparativa de métricas clave por instructor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={analisisPorInstructor}
                      margin={{ top: 20, right: 30, left: 70, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="nombre" width={70} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="satisfaccion" name="Satisfacción %" fill="#3b82f6" />
                      <Bar dataKey="asistencia" name="Asistencia %" fill="#10b981" />
                      <Bar dataKey="completitud" name="Completitud %" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Distribución de Estudiantes</CardTitle>
                <CardDescription>Cantidad de estudiantes por instructor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analisisPorInstructor}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="estudiantes"
                        nameKey="nombre"
                        label={({ nombre, percent }) => `${nombre}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analisisPorInstructor.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45 + 180}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} estudiantes`, "Cantidad"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Análisis Detallado por Instructor</CardTitle>
              <CardDescription>Métricas de desempeño y estadísticas por instructor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {analisisPorInstructor.map((instructor, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{instructor.nombre}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" /> {instructor.talleres} talleres
                          </span>
                          <span className="flex items-center">
                            <Users className="mr-1 h-4 w-4" /> {instructor.estudiantes} estudiantes
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10">
                          <TrendingUp className="mr-1 h-3 w-3" /> {instructor.satisfaccion}% satisfacción
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Satisfacción</span>
                          <span className="font-medium">{instructor.satisfaccion}%</span>
                        </div>
                        <Progress value={instructor.satisfaccion} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Asistencia</span>
                          <span className="font-medium">{instructor.asistencia}%</span>
                        </div>
                        <Progress value={instructor.asistencia} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completitud</span>
                          <span className="font-medium">{instructor.completitud}%</span>
                        </div>
                        <Progress value={instructor.completitud} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-muted/40">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Talleres activos</p>
                              <p className="text-xl font-semibold">{Math.round(instructor.talleres * 0.7)}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Talleres pendientes</p>
                              <p className="text-xl font-semibold">{Math.round(instructor.talleres * 0.3)}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-yellow-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Promedio estudiantes</p>
                              <p className="text-xl font-semibold">
                                {Math.round(instructor.estudiantes / instructor.talleres)}
                              </p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Horas impartidas</p>
                              <p className="text-xl font-semibold">{instructor.talleres * 12}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-purple-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {index < analisisPorInstructor.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {reportType === "asistencia" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Asistencia por Día</CardTitle>
                <CardDescription>Porcentaje de asistencia según el día de la semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analisisAsistencia} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dia" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="porcentaje" name="Asistencia %" fill="#3b82f6">
                        {analisisAsistencia.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Evolución de Asistencia</CardTitle>
                <CardDescription>Tendencia de asistencia a lo largo del curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={asistenciaSemanal} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="asistencia"
                        name="Asistencia %"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Análisis Detallado de Asistencia</CardTitle>
              <CardDescription>Métricas de asistencia por taller</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th>Taller</th>
                      <th>Instructor</th>
                      <th>Estudiantes</th>
                      <th>Asistencia</th>
                      <th>Puntualidad</th>
                      <th>Deserción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => {
                      // Datos simulados
                      const asistencia = Math.floor(Math.random() * 20) + 75 // 75-95%
                      const puntualidad = Math.floor(Math.random() * 15) + 80 // 80-95%
                      const desercion = Math.floor(Math.random() * 10) + 1 // 1-10%

                      return (
                        <tr key={course.id}>
                          <td className="font-medium">{course.title}</td>
                          <td>{course.instructor}</td>
                          <td>{course.students}</td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    asistencia < 80 ? "bg-red-500" : asistencia < 90 ? "bg-yellow-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${asistencia}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{asistencia}%</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${puntualidad < 85 ? "bg-yellow-500" : "bg-green-500"}`}
                                  style={{ width: `${puntualidad}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{puntualidad}%</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${desercion > 5 ? "bg-red-500" : "bg-yellow-500"}`}
                                  style={{ width: `${desercion}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{desercion}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Factores de Inasistencia</CardTitle>
                <CardDescription>Principales razones reportadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Enfermedad", value: 35, color: "#ef4444" },
                          { name: "Trabajo", value: 25, color: "#f59e0b" },
                          { name: "Transporte", value: 15, color: "#3b82f6" },
                          { name: "Familiar", value: 15, color: "#8b5cf6" },
                          { name: "Otros", value: 10, color: "#6b7280" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[...Array(5)].map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#6b7280"][index]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Horarios con Mayor Asistencia</CardTitle>
                <CardDescription>Porcentaje de asistencia por horario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mañana (8:00 - 12:00)</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tarde (12:00 - 17:00)</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Noche (17:00 - 21:00)</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fin de semana</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Estrategias de Mejora</CardTitle>
                <CardDescription>Recomendaciones para aumentar asistencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Recordatorios automáticos</p>
                      <p className="text-sm text-muted-foreground">Enviar recordatorios 24h antes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Material previo</p>
                      <p className="text-sm text-muted-foreground">Compartir material antes de la sesión</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Incentivos por asistencia</p>
                      <p className="text-sm text-muted-foreground">Reconocimientos por asistencia perfecta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Seguimiento personalizado</p>
                      <p className="text-sm text-muted-foreground">Contactar a estudiantes con baja asistencia</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {reportType === "evaluacion" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Evaluación por Categoría</CardTitle>
                <CardDescription>Puntuación promedio en diferentes aspectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={evaluacionTalleres}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar name="Promedio" dataKey="A" stroke="#0284c7" fill="#0284c7" fillOpacity={0.6} />
                      <Radar name="Objetivo" dataKey="fullMark" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Satisfacción General</CardTitle>
                <CardDescription>Nivel de satisfacción de los participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Muy satisfecho", value: 45, color: "#10b981" },
                          { name: "Satisfecho", value: 35, color: "#3b82f6" },
                          { name: "Neutral", value: 15, color: "#f59e0b" },
                          { name: "Insatisfecho", value: 5, color: "#ef4444" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[...Array(4)].map((_, index) => (
                          <Cell key={`cell-${index}`} fill={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Evaluación Detallada por Taller</CardTitle>
              <CardDescription>Puntuaciones en diferentes categorías por taller</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th>Taller</th>
                      <th>Instructor</th>
                      <th>Contenido</th>
                      <th>Instructor</th>
                      <th>Materiales</th>
                      <th>Organización</th>
                      <th>Satisfacción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => {
                      // Datos simulados
                      const contenido = Math.floor(Math.random() * 1.5) + 8.5 // 8.5-10
                      const instructorScore = Math.floor(Math.random() * 2) + 8 // 8-10
                      const materiales = Math.floor(Math.random() * 2) + 8 // 8-10
                      const organizacion = Math.floor(Math.random() * 2.5) + 7.5 // 7.5-10
                      const satisfaccion = ((contenido + instructorScore + materiales + organizacion) / 4).toFixed(1)

                      return (
                        <tr key={course.id}>
                          <td className="font-medium">{course.title}</td>
                          <td>{course.instructor}</td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    contenido < 8 ? "bg-red-500" : contenido < 9 ? "bg-yellow-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${contenido * 10}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{contenido}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    instructorScore < 8
                                      ? "bg-red-500"
                                      : instructorScore < 9
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${instructorScore * 10}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{instructorScore}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    materiales < 8 ? "bg-red-500" : materiales < 9 ? "bg-yellow-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${materiales * 10}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{materiales}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="w-full bg-secondary h-2 rounded-full mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    organizacion < 8
                                      ? "bg-red-500"
                                      : organizacion < 9
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${organizacion * 10}%` }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">{organizacion}</span>
                            </div>
                          </td>
                          <td>
                            <Badge
                              className={
                                Number.parseFloat(satisfaccion) < 8
                                  ? "bg-red-100 text-red-800"
                                  : Number.parseFloat(satisfaccion) < 9
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {satisfaccion}/10
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Comentarios Destacados</CardTitle>
                <CardDescription>Opiniones relevantes de los participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="italic text-sm">
                      "El contenido del taller fue excelente y muy práctico. El instructor explicó los conceptos de
                      manera clara y concisa."
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">Taller: Introducción a React</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="italic text-sm">
                      "Los materiales proporcionados fueron muy útiles. Sin embargo, me hubiera gustado tener más
                      ejercicios prácticos."
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">Taller: Diseño UX/UI Avanzado</p>
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="italic text-sm">
                      "El instructor demostró un gran conocimiento del tema y respondió todas las preguntas de manera
                      clara. Muy recomendable."
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">Taller: Node.js para Principiantes</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Áreas de Mejora</CardTitle>
                <CardDescription>Aspectos a mejorar según las evaluaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Duración de las sesiones</span>
                      <span className="font-medium">8.2/10</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ejercicios prácticos</span>
                      <span className="font-medium">7.8/10</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Instalaciones</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Material complementario</span>
                      <span className="font-medium">7.5/10</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Recomendaciones de mejora</h3>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Aumentar ejercicios prácticos</p>
                      <p className="text-sm text-muted-foreground">
                        Incluir más actividades hands-on durante las sesiones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Mejorar material complementario</p>
                      <p className="text-sm text-muted-foreground">Proporcionar recursos adicionales más completos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Optimizar duración de sesiones</p>
                      <p className="text-sm text-muted-foreground">Ajustar tiempos para evitar sesiones muy largas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

