"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search, UserMinus, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InscripcionesCurso() {
  return (
    <div className="fade-in">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-2">
          <Link href="/dashboard/actividades">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Inscripciones
        </h1>
      </div>

      <Card className="border-border shadow-sm mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-primary">
            Inteligencia artificial
          </CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-primary/10">
                Taller
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                7 horas
              </Badge>
              <Badge
                variant="outline"
                className={
                  "active" === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                Activo
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p>
              <strong>Instructor:</strong> WIlberk
            </p>
            <p>
              <strong>Capacidad:</strong> 10 estudiantes
            </p>
            <p>
              <strong>Estudiantes inscritos:</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar estudiantes..."
            className="pl-8"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Inscribir Estudiantes
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Inscribir Estudiantes</DialogTitle>
              <DialogDescription>
                Selecciona los estudiantes que deseas inscribir en este curso.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="button">Inscribir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Estudiantes Inscritos 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["111", ["as"]].length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No se encontraron estudiantes con ese criterio de
                      búsqueda.
                    </TableCell>
                  </TableRow>
                ) : (
                  [
                    {
                      name: "Wilberk Ledezma",
                      email: "wilberk@gmail.com",
                      phone: "123456789",
                    },
                    {
                      name: "Belkis Hernández",
                      email: "belkis@gmail.com",
                      phone: "123456789",
                    },
                  ].map((student) => (
                    <TableRow key={student.name}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title="Dar de baja">
                          <UserMinus className="h-4 w-4 text-destructive" />
                        </Button>
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
