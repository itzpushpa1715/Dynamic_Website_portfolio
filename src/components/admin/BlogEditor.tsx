import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData, BlogPost } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

const BlogEditor: React.FC = () => {
  const { blogPosts, addBlogPost, deleteBlogPost, updateBlogPosts } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogPost>();

  const onSubmit = (data: BlogPost) => {
    const postData = {
      ...data,
      id: editingPost?.id || Date.now().toString(),
      tags: typeof data.tags === 'string' 
        ? (data.tags as string).split(',').map(s => s.trim()).filter(s => s.length > 0)
        : data.tags,
      slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    };

    if (editingPost) {
      // Update existing post
      const updatedPosts = blogPosts.map(p => 
        p.id === editingPost.id ? postData : p
      );
      updateBlogPosts(updatedPosts);
      toast.success('Blog post updated successfully!');
    } else {
      // Add new post
      addBlogPost(postData);
      toast.success('Blog post added successfully!');
    }

    handleCancel();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
    reset({
      ...post,
      tags: post.tags.join(', ') as any
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      toast.success('Blog post deleted successfully!');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost(null);
    reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blog Posts Management
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Post</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
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
                  Date
                </label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Excerpt
              </label>
              <textarea
                rows={3}
                {...register('excerpt', { required: 'Excerpt is required' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content (Markdown supported)
              </label>
              <textarea
                rows={10}
                {...register('content', { required: 'Content is required' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                {...register('tags', { required: 'Tags are required' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
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
                <span>{editingPost ? 'Update' : 'Add'} Post</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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

export default BlogEditor;