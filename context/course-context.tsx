"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

// Datos de cursos hardcodeados
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

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  capacity: number;
  students: number;
  status: "active" | "pending";
  type: "taller" | "curso" | "charla";
};

type CourseContextType = {
  courses: Course[];
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);

  // Cargar cursos del localStorage o usar los mock data
  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (error) {
        console.error("Error parsing stored courses:", error);
        setCourses(MOCK_COURSES as Course[]);
        localStorage.setItem("courses", JSON.stringify(MOCK_COURSES));
      }
    } else {
      setCourses(MOCK_COURSES as Course[]);
      localStorage.setItem("courses", JSON.stringify(MOCK_COURSES));
    }
  }, []);

  // Guardar cursos en localStorage cuando cambien
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = {
      ...course,
      id: Date.now().toString(),
      students: course.students || 0,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses debe ser usado dentro de un CourseProvider");
  }
  return context;
}
