import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BlogPost from './pages/BlogPost';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;