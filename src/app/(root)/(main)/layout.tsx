import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/components/providers/auth-provider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex w-screen">
          <Sidebar />
          <Header />
          <main className="flex-1 pl-8 pt-4">{children}</main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};
export default RootLayout;
