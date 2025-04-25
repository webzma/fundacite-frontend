"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardList, Edit, Plus, Search, Trash2, Users } from "lucide-react";

const MOCK_COURSES = [
  {
    id: "1",
    title: "Introducción a React",
    description:
      "Aprende los fundamentos de React y crea tu primera aplicación.",
    instructor: "Juan Pérez",
    duration: 12,
    capacity: 20,
    students: 15,
    status: "active",
    type: "curso",
  },
  {
    id: "2",
    title: "Diseño UX/UI Avanzado",
    description:
      "Técnicas avanzadas de diseño de interfaces y experiencia de usuario.",
    instructor: "María González",
    duration: 16,
    capacity: 15,
    students: 10,
    status: "active",
    type: "taller",
  },
  {
    id: "3",
    title: "Node.js para Principiantes",
    description: "Introducción al desarrollo backend con Node.js y Express.",
    instructor: "Carlos Rodríguez",
    duration: 10,
    capacity: 25,
    students: 18,
    status: "pending",
    type: "curso",
  },
  {
    id: "4",
    title: "Desarrollo Mobile con Flutter",
    description: "Crea aplicaciones móviles multiplataforma con Flutter.",
    instructor: "Ana Martínez",
    duration: 20,
    capacity: 15,
    students: 12,
    status: "active",
    type: "taller",
  },
  {
    id: "5",
    title: "Introducción a la Inteligencia Artificial",
    description: "Conceptos básicos de IA y su aplicación en la industria.",
    instructor: "Roberto Sánchez",
    duration: 2,
    capacity: 50,
    students: 45,
    status: "active",
    type: "charla",
  },
];

export default function actividadesPage() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Actividades
        </h1>
        <Button asChild>
          <Link href="/dashboard/actividades/crear">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Actividad
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar actividades..."
            className="pl-8"
            value={searchTerm}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Lista de Actividades</CardTitle>
          <CardDescription>
            Gestiona todas las actividades disponibles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Estudiantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron actividades. ¿Deseas{" "}
                      <Link
                        href="/dashboard/actividades/crear"
                        className="text-primary hover:underline"
                      >
                        crear una nueva
                      </Link>
                      ?
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        {course.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10">
                          {course.type === "taller"
                            ? "Taller"
                            : course.type === "curso"
                            ? "Curso"
                            : "Charla"}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.duration} horas</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            course.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {course.status === "active" ? "Activo" : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {course.students}/{course.capacity || "∞"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Asistencia"
                          >
                            <Link
                              href={`/dashboard/actividades/asistencia/${course.id}`}
                            >
                              <ClipboardList className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Inscripciones"
                          >
                            <Link
                              href={`/dashboard/actividades/inscripciones/${course.id}`}
                            >
                              <Users className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Editar"
                          >
                            <Link
                              href={`/dashboard/actividades/editar/${course.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" title="Eliminar">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
