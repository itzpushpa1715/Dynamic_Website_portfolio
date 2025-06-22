import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData, Certificate } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

const CertificatesEditor: React.FC = () => {
  const { certificates, addCertificate, deleteCertificate, updateCertificates } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Certificate>();

  const onSubmit = (data: Certificate) => {
    const certificateData = {
      ...data,
      id: editingCertificate?.id || Date.now().toString()
    };

    if (editingCertificate) {
      // Update existing certificate
      const updatedCertificates = certificates.map(c => 
        c.id === editingCertificate.id ? certificateData : c
      );
      updateCertificates(updatedCertificates);
      toast.success('Certificate updated successfully!');
    } else {
      // Add new certificate
      addCertificate(certificateData);
      toast.success('Certificate added successfully!');
    }

    handleCancel();
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsEditing(true);
    reset(certificate);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      deleteCertificate(id);
      toast.success('Certificate deleted successfully!');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingCertificate(null);
    reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Certificates Management
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Certificate</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issuer
                </label>
                <input
                  type="text"
                  {...register('issuer', { required: 'Issuer is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {errors.issuer && <p className="text-red-500 text-sm mt-1">{errors.issuer.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  {...register('image', { required: 'Image is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Credential URL (optional)
              </label>
              <input
                type="url"
                {...register('credentialUrl')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <Save size={16} />
                <span>{editingCertificate ? 'Update' : 'Add'} Certificate</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {certificate.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Issued by {certificate.issuer}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  {new Date(certificate.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(certificate)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(certificate.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesEditor;