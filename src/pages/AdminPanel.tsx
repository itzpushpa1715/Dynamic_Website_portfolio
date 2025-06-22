import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Briefcase, FileText, Award, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PersonalInfoEditor from '../components/admin/PersonalInfoEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import BlogEditor from '../components/admin/BlogEditor';
import CertificatesEditor from '../components/admin/CertificatesEditor';
import FooterEditor from '../components/admin/FooterEditor';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'footer', label: 'Footer', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'blog':
        return <BlogEditor />;
      case 'certificates':
        return <CertificatesEditor />;
      case 'footer':
        return <FooterEditor />;
      default:
        return <PersonalInfoEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;