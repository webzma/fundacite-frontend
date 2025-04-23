import { cookies } from "next/headers";

//import { useCourses } from "@/context/course-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = (await cookies()).get("user")?.value;
  const { name, email } = JSON.parse(user ?? "{}");

  // Simulación de datos de cursos en el cliente
  /*   const { courses } = useCourses();

  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students,
    0
  );
  const activeWorkshops = courses.filter(
    (course) => course.status === "active"
  ).length;
 */
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido, {name}</p>
        </div>
        <Button asChild>
          <Link
            href="/dashboard/actividades/crear"
            className="inline-flex items-center"
          >
            Crear actividad
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">
              Total Actividades
            </CardTitle>
            <BookOpen className="dashboard-card-icon" />
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">{/* {courses.length} */}</div>
            <p className="dashboard-card-label">Actividades registradas</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">
              Actividades Activas
            </CardTitle>
            <Calendar className="dashboard-card-icon" />
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">
              {/* {activeWorkshops} */}
            </div>
            <p className="dashboard-card-label">En progreso</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">
              Total Estudiantes
            </CardTitle>
            <Users className="dashboard-card-icon" />
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">{/* {totalStudents} */}</div>
            <p className="dashboard-card-label">Inscritos en talleres</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">
              Promedio Asistencia
            </CardTitle>
            <TrendingUp className="dashboard-card-icon" />
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">87%</div>
            <p className="dashboard-card-label">Tasa de asistencia</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Actividades Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* {courses.slice(0, 5).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border-b border-border pb-4"
                >
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.type === "taller"
                        ? "Taller"
                        : course.type === "curso"
                        ? "Curso"
                        : "Charla"}{" "}
                      • {course.instructor}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`badge ${
                        course.status === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {course.status === "active" ? "Activo" : "Pendiente"}
                    </span>
                  </div>
                </div>
              ))} */}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/talleres">
                  Ver todas las actividades
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Nuevo taller creado</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Taller actualizado</p>
                  <p className="text-xs text-muted-foreground">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    Nuevo estudiante inscrito
                  </p>
                  <p className="text-xs text-muted-foreground">Hace 1 día</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Taller cancelado</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
