import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <Sidebar />
        <Header />
        <main className="flex-1 pl-8 pt-4">{children}</main>
      </div>
    </SidebarProvider>
  );
};
export default RootLayout;
