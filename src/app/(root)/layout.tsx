import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <Header />
      <main className="flex-1 pl-8 pt-4">{children}</main>
    </div>
  );
};
export default RootLayout;
