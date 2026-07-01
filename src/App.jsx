import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, message } from "antd";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";
import VideoGalleryPage from "./pages/VideoGalleryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const { Header, Content, Footer } = Layout;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function NavigationHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully");
    navigate("/login");
  };

  const getSelectedKey = () => {
    if (location.pathname === "/") return "1";
    if (location.pathname === "/video-library") return "2";
    if (location.pathname === "/gallery") return "3";
    return "";
  };

  const menuItems = isAuthenticated
    ? [
        { key: "1", label: <Link to="/">Process Workspace</Link> },
        { key: "2", label: <Link to="/video-library">Video Library</Link> },
        { key: "3", label: <Link to="/gallery">Frames Gallery</Link> },
        {
          key: "4",
          label: <span style={{ color: "#ff4d4f" }}>Logout ({username})</span>,
          onClick: handleLogout,
          style: { marginLeft: "auto" },
        },
      ]
    : [];

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          marginRight: "40px",
          fontSize: "18px",
        }}
      >
        🧠 Video AI Classifier
      </div>
      {isAuthenticated && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ flex: 1 }}
        />
      )}
    </Header>
  );
}

function App() {
  return (
    <HashRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <NavigationHeader />

        <Content style={{ padding: "0 50px", marginTop: "24px" }}>
          <div
            style={{
              background: "#fff",
              padding: "24px",
              minHeight: "380px",
              borderRadius: "8px",
            }}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/video-library"
                element={
                  <ProtectedRoute>
                    <VideoGalleryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gallery"
                element={
                  <ProtectedRoute>
                    <GalleryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/frame/:frameId"
                element={
                  <ProtectedRoute>
                    <DetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Video Classification Project ©2026 Powered by Django & PyTorch
          Ensemble
        </Footer>
      </Layout>
    </HashRouter>
  );
}

export default App;
