import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/admin/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ResourcePage from "./pages/admin/ResourcePage";
import ContactsPage from "./pages/admin/ContactsPage";
import TestimonialsPage from "./pages/admin/TestimonialsPage";
import TemplatesPage from "./pages/admin/TemplatesPage";
import ChatbotPage from "./pages/admin/ChatbotPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import RealProjectsPage from "./pages/RealProjectsPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import { ToastProvider } from "./components/Toast";
import { useAuth } from "./contexts/AuthContext";
import { AuthSkeleton } from "./components/Skeleton";

function RequireAdmin({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <AuthSkeleton />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function AdminLoginRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <AuthSkeleton />;
  if (isAuthenticated) return <Navigate to="/admin" replace />;
  return <LoginPage />;
}

function App() {
  return (
    <ToastProvider>
      <Routes>
      <Route
        path="/"
        element={
          <ThemeProvider>
            <AppProvider>
              <HomePage />
            </AppProvider>
          </ThemeProvider>
        }
      />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/real-projects" element={<RealProjectsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/admin/login" element={<AdminLoginRoute />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="projects" element={<ResourcePage resource="projects" />} />
        <Route path="services" element={<ResourcePage resource="services" />} />
        <Route path="skills" element={<ResourcePage resource="skills" />} />
        <Route path="experiences" element={<ResourcePage resource="experiences" />} />
        <Route path="certifications" element={<ResourcePage resource="certifications" />} />
        <Route path="faqs" element={<ResourcePage resource="faqs" />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
      </Route>
    </Routes>
    </ToastProvider>
  );
}

export default App;
