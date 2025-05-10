import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/components/providers/auth-provider";
import MainContent from "@/components/main/main-content";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default RootLayout;
