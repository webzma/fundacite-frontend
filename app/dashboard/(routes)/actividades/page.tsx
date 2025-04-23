"use client";

import { useState } from "react";
import { useCourses } from "@/context/course-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreVertical, Plus, Search, Trash2, Filter } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Actividades() {
  const { courses, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  // Añadir estado para el filtro de tipo de actividad
  const [activityType, setActivityType] = useState("");

  // Actualizar el filtrado de cursos para incluir el tipo de actividad
  const filteredCourses = courses.filter(
    (course) =>
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activityType === "todos" ||
        activityType === "" ||
        course.type === activityType)
  );

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Actividades</h1>
          <p className="text-muted-foreground">
            Gestiona talleres, cursos y charlas desde aquí
          </p>
        </div>
        <Button asChild>
          <Link
            href="/dashboard/actividades/crear"
            className="inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Crear Actividad
          </Link>
        </Button>
      </div>

      {/* Añadir filtro por tipo de actividad */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary">
            Buscar Actividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por título o instructor..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Select
                value={activityType || "todos"}
                onValueChange={(value) => setActivityType(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipo de actividad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="taller">Talleres</SelectItem>
                  <SelectItem value="curso">Cursos</SelectItem>
                  <SelectItem value="charla">Charlas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Más Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border rounded-lg shadow-sm overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <Table className="data-table ">
            {/* Añadir columna de tipo de actividad en la tabla */}
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="hidden md:table-cell">Duración</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Estudiantes
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No se encontraron actividades
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {course.type === "taller"
                          ? "Taller"
                          : course.type === "curso"
                          ? "Curso"
                          : "Charla"}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.duration}{" "}
                      {course.type === "charla" ? "horas" : "horas"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {course.students}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          course.status === "active"
                            ? "badge-success"
                            : "badge-warning"
                        }
                      >
                        {course.status === "active" ? "Activo" : "Pendiente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/actividades/editar/${course.id}`}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => deleteCourse(course.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
