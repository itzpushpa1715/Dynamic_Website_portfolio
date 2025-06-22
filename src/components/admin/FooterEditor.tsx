import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useData, FooterInfo } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

const FooterEditor: React.FC = () => {
  const { footerInfo, updateFooterInfo } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FooterInfo>({
    defaultValues: footerInfo
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links'
  });

  const onSubmit = async (data: FooterInfo) => {
    setIsLoading(true);
    try {
      updateFooterInfo(data);
      toast.success('Footer information updated successfully!');
    } catch (error) {
      toast.error('Failed to update footer information');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Footer Settings
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Footer Text
          </label>
          <input
            type="text"
            {...register('text', { required: 'Footer text is required' })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="© 2024 Your Name. All rights reserved."
          />
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Footer Links
            </label>
            <button
              type="button"
              onClick={() => append({ name: '', url: '' })}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={16} />
              <span>Add Link</span>
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Link Name
                  </label>
                  <input
                    type="text"
                    {...register(`links.${index}.name`, { required: 'Link name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Privacy Policy"
                  />
                  {errors.links?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.links[index]?.name?.message}</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      {...register(`links.${index}.url`, { required: 'URL is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="/privacy"
                    />
                    {errors.links?.[index]?.url && (
                      <p className="text-red-500 text-sm mt-1">{errors.links[index]?.url?.message}</p>
                    )}
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterEditor;