"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCourses } from "@/context/course-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronLeft,
  Download,
  Plus,
  Save,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function AsistenciaPage() {
  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/dashboard/actividades">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Control de Asistencia
            </h1>
          </div>
          <p className="text-muted-foreground">
            Curso de Inteligencia Artificial
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Fecha
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="registro">Registro de Asistencia</TabsTrigger>
          <TabsTrigger value="historial">Historial de Fechas</TabsTrigger>
        </TabsList>

        <TabsContent value="registro" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Registro de Asistencia</CardTitle>
                  <CardDescription>
                    Selecciona una fecha para registrar la asistencia
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Seleccionar fecha</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar estudiantes..."
                  className="pl-8"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Asistencia</TableHead>
                      <TableHead>Notas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[""].length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No hay estudiantes inscritos en este curso.
                        </TableCell>
                      </TableRow>
                    ) : (
                      [
                        {
                          id: 1,
                          name: "Wilberk",
                          email: "wilberk@gmail.com",
                        },
                      ].map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.name}
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Notas (opcional)"
                              className="w-full"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Asistencia</CardTitle>
              <CardDescription>
                Registro histórico de asistencia para Inteligencia Artificial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Asistencia</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody></TableBody>
                  </Table>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Estadísticas por Estudiante
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Estudiante</TableHead>
                          <TableHead>Asistencia</TableHead>
                          <TableHead>Porcentaje</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Wilberk</TableCell>
                          <TableCell>stats</TableCell>
                          <TableCell>
                            <Badge>%</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmación para guardar asistencia */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar registro de asistencia</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas guardar este nuevo registro de
              asistencia?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">Fecha: </p>
            <p className="text-sm text-muted-foreground mt-1">Presentes </p>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button>Guardas registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
