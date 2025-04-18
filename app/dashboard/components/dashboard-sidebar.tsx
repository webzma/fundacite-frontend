"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  LogOut,
  Menu,
  X,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  // Actualizar el nombre del elemento de navegación para reflejar los tres tipos de actividades
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Actividades", href: "/dashboard/talleres", icon: BookOpen },
    { name: "Reportes", href: "/dashboard/reportes", icon: BarChart3 },
    { name: "Configuración", href: "/dashboard/configuracion", icon: Settings },
  ];

  const secondaryNavigation = [
    {
      name: "Ayuda",
      href: "/dashboard/ayuda",
      icon: HelpCircle,
      disabled: false,
    },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-card border-b sidebar-header lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="font-bold text-primary">Sistema Administrativo</div>
        <div className="w-10" />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-card p-0 shadow-lg transform transition-transform duration-200",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b sidebar-header">
            <div className="font-bold text-xl text-primary">Sistema Admin</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
            <div className="flex-1 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                  PRINCIPAL
                </h2>
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start sidebar-link",
                        pathname === item.href ? "sidebar-link-active" : "",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      asChild={!item.disabled}
                      onClick={() => {
                        if (!item.disabled) setIsOpen(false);
                      }}
                      disabled={item.disabled}
                    >
                      {!item.disabled ? (
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      ) : (
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-2" />
                          {item.name}
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2 mt-6">
                <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                  CONFIGURACIÓN
                </h2>
                <div className="space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start sidebar-link",
                        pathname === item.href ? "sidebar-link-active" : "",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      asChild={!item.disabled}
                      disabled={item.disabled}
                      onClick={() => {
                        if (!item.disabled) setIsOpen(false);
                      }}
                    >
                      {!item.disabled ? (
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      ) : (
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-2" />
                          {item.name}
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-primary/10 text-primary"></AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium"></div>
                  <div className="text-xs text-muted-foreground"></div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 sidebar">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b sidebar-header">
            <div className="font-bold text-xl text-primary">Sistema Admin</div>
          </div>

          <div className="flex-1 py-4 overflow-y-auto">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                PRINCIPAL
              </h2>
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start sidebar-link",
                      pathname === item.href ? "sidebar-link-active" : "",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    asChild={!item.disabled}
                    disabled={item.disabled}
                  >
                    {!item.disabled ? (
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ) : (
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div className="px-3 py-2 mt-6">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                CONFIGURACIÓN
              </h2>
              <div className="space-y-1">
                {secondaryNavigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start sidebar-link",
                      pathname === item.href ? "sidebar-link-active" : "",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    asChild={!item.disabled}
                    disabled={item.disabled}
                  >
                    {!item.disabled ? (
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ) : (
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/avatar.jpg" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary"></AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium"></div>
                <div className="text-xs text-muted-foreground"></div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
