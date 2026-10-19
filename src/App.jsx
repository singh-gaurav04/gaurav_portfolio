import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { ToastProvider } from "./components/Toast";
import PageLoader from "./components/PageLoader";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const RealProjectsPage = lazy(() => import("./pages/RealProjectsPage"));
const Chatbot = lazy(() => import("./components/chatbot/Chatbot"));

function PublicChatbot() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Chatbot isOpen={open} setIsOpen={setOpen} />
    </Suspense>
  );
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
          <Route path="/services/*" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <PublicChatbot />
    </ToastProvider>
  );
}

export default App;
