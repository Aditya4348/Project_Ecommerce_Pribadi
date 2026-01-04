import AdminRoute from "@/pages/Admin/AdminRoute";
import SidebarAdmin from "@/components/Admin/SidebarAdmin";

const AdminLayout = ({ children }) => {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-slate-50 flex">
        {/* SIDEBAR */}
        <SidebarAdmin />

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">{children}</main>
      </div>
    </AdminRoute>
  );
};

export default AdminLayout;
