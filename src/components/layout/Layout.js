import Sidebar from "./Sidemenu";
import Navbar from "./header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;