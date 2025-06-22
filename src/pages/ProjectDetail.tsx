import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { format } from 'date-fns';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useData();
  
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <span>{format(new Date(project.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About This Project
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {project.longDescription}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;