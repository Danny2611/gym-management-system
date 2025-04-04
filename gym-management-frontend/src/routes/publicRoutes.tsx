import Home from "../pages/public/Home/Home";
import About from "../pages/public/About/About";
import Services from "../pages/public/Services/Services";
import ServiceDetail from "../pages/public/ServiceDetail/ServiceDetail";
import Schedule from "../pages/public/Schedule/Schedule";
import Blog from "../pages/public/Blog/Blog";
import BlogDetail from "../pages/public/BlogDetail/BlogDetail";
import Contact from "../pages/public/Contact/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import OAuthCallback from "~/pages/auth/OAuthCallback";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "about", element: <About /> },
  { path: "services", element: <Services /> },
  { path: "services/:id", element: <ServiceDetail /> },
  { path: "schedule", element: <Schedule /> },
  { path: "blog", element: <Blog /> },
  { path: "blog/:postId", element: <BlogDetail /> },
  { path: "contact", element: <Contact /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "verify-otp", element: <VerifyOTP /> },
  { path: "oauth/callback", element: <OAuthCallback /> },
];

export default publicRoutes;
