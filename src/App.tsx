import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/components/user-context";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
  return (
    <UserProvider>
      <SidebarProvider>
        <Router>
          <AppSidebar variant="floating" />
          <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <AppRoutes />
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </div>
        </Router>
      </SidebarProvider>
    </UserProvider>
  );
}
