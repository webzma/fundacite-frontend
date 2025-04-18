import type React from "react";
import { DashboardSidebar } from "@/app/dashboard/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 p-0">
        <div className="lg:ml-64">
          <div className="p-4 md:p-6 lg:p-8 fade-in">{children}</div>
        </div>
      </div>
    </div>
  );
}
