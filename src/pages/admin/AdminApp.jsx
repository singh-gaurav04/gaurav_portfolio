import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminLayout from "./AdminLayout";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import ResourcePage from "./ResourcePage";
import ContactsPage from "./ContactsPage";
import TestimonialsPage from "./TestimonialsPage";
import TemplatesPage from "./TemplatesPage";
import ChatbotPage from "./ChatbotPage";
import { AuthSkeleton } from "../../components/Skeleton";

function Guard() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <AuthSkeleton />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

export default function AdminApp() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AuthSkeleton />;
  }

  return (
    <Routes>
      <Route path="login" element={isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage />} />
      <Route element={<Guard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="projects" element={<ResourcePage resource="projects" />} />
          <Route path="services" element={<ResourcePage resource="services" />} />
          <Route path="skills" element={<ResourcePage resource="skills" />} />
          <Route path="experiences" element={<ResourcePage resource="experiences" />} />
          <Route path="certifications" element={<ResourcePage resource="certifications" />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
