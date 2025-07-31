import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import Toggle from '../components/Toggle';
import { apiService, User } from '../utils/api';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const Reports = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [reportType, setReportType] = useState('users');
  const [dateRange, setDateRange] = useState('week');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock chart data
  const [chartData] = useState<ChartData[]>([
    { name: 'Users', value: 45, color: 'bg-blue-500' },
    { name: 'Posts', value: 120, color: 'bg-green-500' },
    { name: 'Comments', value: 89, color: 'bg-yellow-500' },
    { name: 'Views', value: 234, color: 'bg-purple-500' },
    { name: 'Shares', value: 67, color: 'bg-red-500' },
  ]);

  const reportTypeOptions = [
    { value: 'users', label: 'User Analytics', icon: '👥' },
    { value: 'posts', label: 'Post Performance', icon: '📝' },
    { value: 'traffic', label: 'Traffic Analysis', icon: '📊' },
    { value: 'engagement', label: 'Engagement Metrics', icon: '💬' },
    { value: 'revenue', label: 'Revenue Report', icon: '💰' },
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today', icon: '📅' },
    { value: 'week', label: 'This Week', icon: '📊' },
    { value: 'month', label: 'This Month', icon: '📈' },
    { value: 'quarter', label: 'This Quarter', icon: '📉' },
    { value: 'year', label: 'This Year', icon: '📋' },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUsers();
      setUsers(data);
      toast.success('User data loaded successfully!');
    } catch (err) {
      const errorMessage = 'Failed to fetch users';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const generateReport = async (type: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    toast.success(`${type} report generated successfully!`);
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report as ${format}`);
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Reports action: ${action}`);
    toast.success(`Executed: ${action}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">View analytics and generate comprehensive reports</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => generateReport('Summary')} variant="primary" loading={loading}>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Card title="Report Actions" subtitle="Quick report generation and management">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Button onClick={() => handleQuickAction('Refresh Data')} variant="primary" size="sm">
            Refresh Data
          </Button>
          <Button onClick={() => exportReport('pdf')} variant="secondary" size="sm">
            Export PDF
          </Button>
          <Button onClick={() => exportReport('excel')} variant="success" size="sm">
            Export Excel
          </Button>
          <Button onClick={() => exportReport('csv')} variant="warning" size="sm">
            Export CSV
          </Button>
          <Button onClick={() => handleQuickAction('Schedule Report')} variant="primary" size="sm">
            Schedule
          </Button>
          <Button onClick={() => handleQuickAction('Email Report')} variant="secondary" size="sm">
            Email Report
          </Button>
          <Button onClick={() => handleQuickAction('Print Report')} variant="success" size="sm">
            Print
          </Button>
          <Button onClick={() => handleQuickAction('Share Report')} variant="warning" size="sm">
            Share
          </Button>
          <Button onClick={() => handleQuickAction('Archive Report')} variant="secondary" size="sm">
            Archive
          </Button>
          <Button onClick={fetchUsers} variant="primary" size="sm" loading={loading}>
            Reload Data
          </Button>
        </div>
      </Card>

      {/* Report Configuration */}
      <Card title="Report Configuration" subtitle="Customize your report parameters">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <Dropdown
              options={reportTypeOptions}
              value={reportType}
              onChange={setReportType}
              placeholder="Select report type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <Dropdown
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
            />
          </div>
          <div className="flex items-end">
            <Toggle
              checked={showAdvanced}
              onChange={setShowAdvanced}
              label="Advanced Options"
            />
          </div>
        </div>
        
        {showAdvanced && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button onClick={() => handleQuickAction('Custom Filters')} variant="secondary">
                Custom Filters
              </Button>
              <Button onClick={() => handleQuickAction('Data Sources')} variant="secondary">
                Data Sources
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Analytics Dashboard */}
      <Card title="Analytics Overview" subtitle="Key metrics and performance indicators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {chartData.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`${item.color} rounded-lg p-6 text-white mb-3`}>
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm opacity-90">{item.name}</div>
              </div>
              <Button 
                onClick={() => handleQuickAction(`View ${item.name} Details`)} 
                variant="secondary" 
                size="sm"
                className="w-full"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Users Data Table */}
      <Card title="Users Report" subtitle="Detailed user information from API">
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

        {loading && users.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.website}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button onClick={() => viewUser(user)} variant="primary" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* User Details Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedUser.name}</p>
                  <p><span className="font-medium">Username:</span> @{selectedUser.username}</p>
                  <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Phone:</span> {selectedUser.phone}</p>
                  <p><span className="font-medium">Website:</span> {selectedUser.website}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button onClick={() => setIsUserModalOpen(false)} variant="secondary">
                Close
              </Button>
              <Button 
                onClick={() => {
                  const userInfo = `${selectedUser.name} (${selectedUser.email})`;
                  navigator.clipboard.writeText(userInfo);
                  toast.success('User info copied to clipboard!');
                }}
                variant="primary"
              >
                Copy Info
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;