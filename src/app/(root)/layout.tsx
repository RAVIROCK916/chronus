import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen w-screen pl-4 pt-4">
      <Sidebar />
      <Header />
      <main className="">{children}</main>
    </div>
  );
};
export default RootLayout;
