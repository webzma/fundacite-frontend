"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  Bell,
  Settings,
  Shield,
  Save,
  Upload,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Palette,
  Globe,
  Clock,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Configuracion() {
  const { user, updateUserProfile } = useAuth()
  const { toast } = useToast()
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados para los formularios
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    role: user?.role || "admin",
    phone: user?.phone || "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newWorkshop: true,
    workshopUpdates: true,
    studentRegistration: true,
    systemUpdates: false,
  })

  const [generalSettings, setGeneralSettings] = useState({
    language: "es",
    timezone: "America/Mexico_City",
    dateFormat: "DD/MM/YYYY",
    theme: "light",
  })

  // Manejadores de cambios en formularios
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key, value) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleGeneralSettingChange = (key, value) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }))
  }

  // Manejadores de envío de formularios
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    // Simulamos una actualización con un pequeño retraso
    setTimeout(() => {
      try {
        // Aquí iría la lógica real para actualizar el perfil
        // updateUserProfile(profileForm)

        toast({
          title: "Perfil actualizado",
          description: "Tu información de perfil ha sido actualizada correctamente.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        })

        setSuccessMessage("Perfil actualizado correctamente")
      } catch (error) {
        setErrorMessage("Ocurrió un error al actualizar el perfil")
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    // Validación básica
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden")
      setIsSubmitting(false)
      return
    }

    // Simulamos una actualización con un pequeño retraso
    setTimeout(() => {
      try {
        // Aquí iría la lógica real para cambiar la contraseña

        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña ha sido actualizada correctamente.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        })

        setSuccessMessage("Contraseña actualizada correctamente")
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } catch (error) {
        setErrorMessage("Ocurrió un error al actualizar la contraseña")
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  const handleNotificationsSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos una actualización con un pequeño retraso
    setTimeout(() => {
      toast({
        title: "Preferencias guardadas",
        description: "Tus preferencias de notificaciones han sido actualizadas.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleGeneralSettingsSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos una actualización con un pequeño retraso
    setTimeout(() => {
      toast({
        title: "Configuración guardada",
        description: "La configuración general ha sido actualizada.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en el sistema</p>
        </div>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="perfil" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
            <span className="sm:hidden">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Seguridad</span>
            <span className="sm:hidden">Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Notificaciones</span>
            <span className="sm:hidden">Notif.</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">General</span>
            <span className="sm:hidden">General</span>
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Perfil */}
        <TabsContent value="perfil">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Información de Perfil</CardTitle>
                <CardDescription>Actualiza tu información personal y detalles de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {successMessage && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>¡Éxito!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}

                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {profileForm.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Cambiar foto
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                          value={profileForm.role}
                          onValueChange={(value) => setProfileForm((prev) => ({ ...prev, role: value }))}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="instructor">Instructor</SelectItem>
                            <SelectItem value="user">Usuario</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          placeholder="Tu número de teléfono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        placeholder="Cuéntanos sobre ti..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Pestaña de Seguridad */}
        <TabsContent value="seguridad">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Seguridad de la Cuenta</CardTitle>
                <CardDescription>Actualiza tu contraseña y configura opciones de seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {successMessage && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>¡Éxito!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}

                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cambiar contraseña</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">
                            {showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          </span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        La contraseña debe tener al menos 8 caracteres y contener letras y números.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Opciones de seguridad adicionales</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactorAuth">Autenticación de dos factores</Label>
                        <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                      </div>
                      <Switch id="twoFactorAuth" disabled />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sessionTimeout">Tiempo de inactividad</Label>
                        <p className="text-sm text-muted-foreground">
                          Cerrar sesión automáticamente después de un periodo de inactividad
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger id="sessionTimeout" className="w-[180px]">
                          <SelectValue placeholder="Seleccionar tiempo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Pestaña de Notificaciones */}
        <TabsContent value="notificaciones">
          <Card>
            <form onSubmit={handleNotificationsSubmit}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Preferencias de Notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications" className="text-base">
                        Notificaciones por correo
                      </Label>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium pt-2">Tipos de notificaciones</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newWorkshop">Nuevos talleres</Label>
                        <p className="text-sm text-muted-foreground">Cuando se crea un nuevo taller en el sistema</p>
                      </div>
                      <Switch
                        id="newWorkshop"
                        checked={notificationSettings.newWorkshop}
                        onCheckedChange={(checked) => handleNotificationChange("newWorkshop", checked)}
                        disabled={!notificationSettings.emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="workshopUpdates">Actualizaciones de talleres</Label>
                        <p className="text-sm text-muted-foreground">Cuando se actualiza la información de un taller</p>
                      </div>
                      <Switch
                        id="workshopUpdates"
                        checked={notificationSettings.workshopUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("workshopUpdates", checked)}
                        disabled={!notificationSettings.emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="studentRegistration">Inscripción de estudiantes</Label>
                        <p className="text-sm text-muted-foreground">Cuando un estudiante se inscribe en un taller</p>
                      </div>
                      <Switch
                        id="studentRegistration"
                        checked={notificationSettings.studentRegistration}
                        onCheckedChange={(checked) => handleNotificationChange("studentRegistration", checked)}
                        disabled={!notificationSettings.emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="systemUpdates">Actualizaciones del sistema</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificaciones sobre actualizaciones y mantenimiento del sistema
                        </p>
                      </div>
                      <Switch
                        id="systemUpdates"
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("systemUpdates", checked)}
                        disabled={!notificationSettings.emailNotifications}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar preferencias
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Pestaña de Configuración General */}
        <TabsContent value="general">
          <Card>
            <form onSubmit={handleGeneralSettingsSubmit}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Configuración General</CardTitle>
                <CardDescription>Personaliza la apariencia y comportamiento del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Idioma y región
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select
                          value={generalSettings.language}
                          onValueChange={(value) => handleGeneralSettingChange("language", value)}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Zona horaria</Label>
                        <Select
                          value={generalSettings.timezone}
                          onValueChange={(value) => handleGeneralSettingChange("timezone", value)}
                        >
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Seleccionar zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                            <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                            <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                            <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                            <SelectItem value="Asia/Tokyo">Tokio (GMT+9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Apariencia
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Tema</Label>
                        <Select
                          value={generalSettings.theme}
                          onValueChange={(value) => handleGeneralSettingChange("theme", value)}
                        >
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Seleccionar tema" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Oscuro</SelectItem>
                            <SelectItem value="system">Automático (según sistema)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Formato de fecha</Label>
                        <Select
                          value={generalSettings.dateFormat}
                          onValueChange={(value) => handleGeneralSettingChange("dateFormat", value)}
                        >
                          <SelectTrigger id="dateFormat">
                            <SelectValue placeholder="Seleccionar formato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Comportamiento del sistema
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoSave">Guardado automático</Label>
                        <p className="text-sm text-muted-foreground">
                          Guardar automáticamente los cambios en formularios
                        </p>
                      </div>
                      <Switch id="autoSave" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="confirmActions">Confirmar acciones</Label>
                        <p className="text-sm text-muted-foreground">
                          Mostrar diálogos de confirmación antes de acciones importantes
                        </p>
                      </div>
                      <Switch id="confirmActions" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itemsPerPage">Elementos por página</Label>
                      <Select defaultValue="10">
                        <SelectTrigger id="itemsPerPage" className="w-[180px]">
                          <SelectValue placeholder="Seleccionar cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 elementos</SelectItem>
                          <SelectItem value="10">10 elementos</SelectItem>
                          <SelectItem value="20">20 elementos</SelectItem>
                          <SelectItem value="50">50 elementos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar configuración
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

