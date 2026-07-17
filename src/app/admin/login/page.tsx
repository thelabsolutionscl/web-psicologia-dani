import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { adminConfigured, sesionAdminActiva } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  if (await sesionAdminActiva()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm pt-10">
      <Card>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Acceso al panel
        </h1>
        {adminConfigured() ? (
          <div className="mt-5">
            <LoginForm />
          </div>
        ) : (
          <p className="mt-4 text-base text-quebrada/90">
            El panel aún no está habilitado: falta configurar la variable de
            entorno <code className="font-sans">ADMIN_PASSWORD</code>.
          </p>
        )}
      </Card>
    </div>
  );
}
