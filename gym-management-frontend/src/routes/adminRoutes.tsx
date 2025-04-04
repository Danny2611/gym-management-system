// Route admin: quản lý hội viên, gói tập, báo cáo.

import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/user/Dashboard";
import RoleBasedRoute from "./roleBasedRoute";

const adminRoutes = {
  path: "admin",
  element: <RoleBasedRoute allowedRoles={["admin"]} />,
  children: [
    {
      element: <DashboardLayout />,
      children: [{ path: "dashboard", element: <Dashboard /> }],
    },
  ],
};

export default adminRoutes;
