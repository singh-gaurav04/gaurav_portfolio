import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./components/Toast";
import PageLoader from "./components/PageLoader";
import { AuthSkeleton } from "./components/Skeleton";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const RealProjectsPage = lazy(() => import("./pages/RealProjectsPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/admin/ProfilePage"));
const ResourcePage = lazy(() => import("./pages/admin/ResourcePage"));
const ContactsPage = lazy(() => import("./pages/admin/ContactsPage"));
const TestimonialsPage = lazy(() => import("./pages/admin/TestimonialsPage"));
const TemplatesPage = lazy(() => import("./pages/admin/TemplatesPage"));
const ChatbotPage = lazy(() => import("./pages/admin/ChatbotPage"));

function AdminAuthShell() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

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
      <Suspense fallback={<PageLoader />}>
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

          <Route element={<AdminAuthShell />}>
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
          </Route>
        </Routes>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
