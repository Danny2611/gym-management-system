// userRoutes.js
import Profile from "~/pages/user/Profile";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/user/Dashboard";
import ChangePassword from "~/pages/user/ChangePassword";
import PackagesPage from "~/pages/user/Packages";
import MyPackagesPage from "~/pages/user/Memberships";
import PersonalSchedulePage from "~/pages/user/schedules/PersonalSchedulePage";
import ScheduleDetail from "~/pages/user/schedules/ScheduleDetail";
import ProtectedRoute from "./roleBasedRoute";
import RoleBasedRoute from "./roleBasedRoute";
import PackageDetailPage from "~/pages/user/PackageDetail";
import PackageRegistrationPage from "~/pages/user/PackageRegistrationPage";
import PaymentStatusPage from "~/pages/user/PaymentStatusPage";
import MyPackagesPage1 from "~/pages/user/Memberships copy";
import TrainerList from "~/pages/user/appointments/TrainerList";
import BookingPage from "~/pages/user/appointments/BookingPage";
import AppointmentsPage from "~/pages/user/appointments/Appointments";
import TrainerList1 from "~/pages/user/appointments/TrainerList copy";

const userRoutes = {
  path: "user", // Lưu ý: Ở đây không cần dấu "/" vì đã nested
  element: <RoleBasedRoute allowedRoles={["member"]} />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "packages", element: <PackagesPage /> },
        { path: "package-detail/:id", element: <PackageDetailPage /> },
        { path: "packages-register/:id", element: <PackageRegistrationPage /> },
        {
          path: "payment",
          children: [
            { path: "success", element: <PaymentStatusPage /> },
            { path: "failed", element: <PaymentStatusPage /> }
          ]
        },
        { path: "my-packages", element: <MyPackagesPage /> },
        { path: "my-packages-clone", element: <MyPackagesPage1 /> },
        // apointment
        { path: "list-trainer", element: <TrainerList /> },
        { path: "list-trainer-copy", element: <TrainerList1 /> },
        { path: "book-appointment/:trainerId", element: <BookingPage /> },
        { path: "my-appointment", element: <AppointmentsPage /> },

        { path: "my-schedule", element: <PersonalSchedulePage /> },
     
      ],
    },
  ],
};

export default userRoutes;
