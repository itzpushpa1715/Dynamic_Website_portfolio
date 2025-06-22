import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Award } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { format } from 'date-fns';

const Certificates: React.FC = () => {
  const { certificates } = useData();

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in cybersecurity and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-yellow-500 text-white p-2 rounded-full">
                  <Award size={20} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {certificate.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Issued by {certificate.issuer}
                </p>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar size={16} />
                  <span>{format(new Date(certificate.date), 'MMM dd, yyyy')}</span>
                </div>
                
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    <span>View Credential</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;