import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { apiService, Post, CreatePostData } from '../utils/api';

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPost, setNewPost] = useState<CreatePostData>({
    title: '',
    body: '',
    userId: 1,
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPosts();
      setPosts(data.slice(0, 10)); // Limit to first 10 posts for better UI
      toast.success('Posts loaded successfully!');
    } catch (err) {
      const errorMessage = 'Failed to fetch posts';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    try {
      setLoading(true);
      const createdPost = await apiService.createPost(newPost);
      setPosts(prev => [createdPost, ...prev]);
      setNewPost({ title: '', body: '', userId: 1 });
      setIsCreateModalOpen(false);
      toast.success('Post created successfully!');
    } catch (err) {
      toast.error('Failed to create post');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await apiService.deletePost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Post deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  const viewPost = (post: Post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Dashboard action: ${action}`);
    toast.success(`Executed: ${action}`);
  };

  const simulateApiCall = async (endpoint: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success(`API call to ${endpoint} completed`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your posts and view analytics</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
          Create New Post
        </Button>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" subtitle="Common dashboard operations">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Button onClick={() => handleQuickAction('Refresh Data')} variant="primary" size="sm">
            Refresh
          </Button>
          <Button onClick={() => handleQuickAction('Export Data')} variant="secondary" size="sm">
            Export
          </Button>
          <Button onClick={() => handleQuickAction('Import Data')} variant="success" size="sm">
            Import
          </Button>
          <Button onClick={() => handleQuickAction('Archive')} variant="warning" size="sm">
            Archive
          </Button>
          <Button onClick={() => handleQuickAction('Backup')} variant="primary" size="sm">
            Backup
          </Button>
          <Button onClick={() => simulateApiCall('/analytics')} variant="secondary" size="sm" loading={loading}>
            Analytics
          </Button>
          <Button onClick={() => simulateApiCall('/reports')} variant="success" size="sm">
            Reports
          </Button>
          <Button onClick={() => handleQuickAction('Clear Cache')} variant="warning" size="sm">
            Clear Cache
          </Button>
          <Button onClick={() => handleQuickAction('Reset Filters')} variant="secondary" size="sm">
            Reset Filters
          </Button>
          <Button onClick={fetchPosts} variant="primary" size="sm" loading={loading}>
            Reload Posts
          </Button>
        </div>
      </Card>

      {/* Posts Management */}
      <Card title="Posts Management" subtitle="Manage your posts with API integration">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="text-red-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && posts.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {post.body}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">User ID: {post.userId}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button onClick={() => viewPost(post)} variant="primary" size="sm">
                      View
                    </Button>
                    <Button onClick={() => deletePost(post.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Post"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter post title..."
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body
            </label>
            <textarea
              value={newPost.body}
              onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Enter post content..."
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Input
            label="User ID"
            type="number"
            value={newPost.userId}
            onChange={(e) => setNewPost(prev => ({ ...prev, userId: parseInt(e.target.value) || 1 }))}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setIsCreateModalOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button 
              onClick={createPost} 
              variant="primary" 
              loading={loading}
              disabled={!newPost.title || !newPost.body}
            >
              Create Post
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Post Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Post"
        size="lg"
      >
        {selectedPost && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {selectedPost.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Post ID: {selectedPost.id} | User ID: {selectedPost.userId}</p>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                {selectedPost.body}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button onClick={() => setIsViewModalOpen(false)} variant="secondary">
                Close
              </Button>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedPost.title + '\n\n' + selectedPost.body);
                  toast.success('Post content copied to clipboard!');
                }}
                variant="primary"
              >
                Copy Content
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;