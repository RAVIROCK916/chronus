import Sidebar from "@/components/side-bar";
import Header from "@/components/header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen w-screen pl-4 pt-4">
      <Sidebar />
      <Header />
      <main className="">{children}</main>
    </div>
  );
};
export default DashboardLayout;
