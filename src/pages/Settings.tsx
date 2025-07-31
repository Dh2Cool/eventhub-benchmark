import { useState } from 'react';
import Button from '../components/Button';

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main St, New York, NY 10001'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    eventReminders: true,
    weeklyDigest: false,
    pushNotifications: true
  });

  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
    theme: 'light',
    autoLogout: '30',
    twoFactorAuth: false
  });

  const [, setBrokenDropdownOpen] = useState(false);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    console.log(`Preference ${key} toggled to:`, !preferences[key]);
  };

  const handleSettingChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    // Bug: sometimes shows undefined in success message
    const message = Math.random() > 0.3 ? 'Profile saved successfully!' : undefined;
    alert(message || 'undefined');
  };

  const handleResetPassword = () => {
    console.log('Password reset requested');
    alert('Password reset email sent!');
  };

  const handleDeleteAccount = () => {
    // Bug: delete account doesn't work properly
    if (Math.random() > 0.5) {
      console.log('Delete account bug: Operation failed');
      alert('Account deletion temporarily unavailable');
      return;
    }
    
    const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (confirmed) {
      alert('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export will be emailed to you within 24 hours');
  };

  const handleBrokenDropdownClick = () => {
    // Intentional bug: this dropdown doesn't open
    console.log('Broken dropdown clicked - no action');
    setBrokenDropdownOpen(false); // Always stays closed
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="ghost">
                  📷 Change Photo
                </Button>
                <Button size="sm" variant="ghost">
                  🗑️ Remove Photo
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => handleProfileChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSaveProfile}>
              💾 Save Profile
            </Button>
            <Button variant="ghost" onClick={handleResetPassword}>
              🔑 Reset Password
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} broken={true}>
              🗑️ Delete Account
            </Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
          
          <div className="space-y-4">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <label className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-sm text-gray-600">
                    {key === 'emailNotifications' && 'Receive email notifications for bookings and updates'}
                    {key === 'smsNotifications' && 'Receive SMS notifications for urgent updates'}
                    {key === 'marketingEmails' && 'Receive promotional emails and special offers'}
                    {key === 'eventReminders' && 'Get reminders before your events'}
                    {key === 'weeklyDigest' && 'Weekly summary of upcoming events'}
                    {key === 'pushNotifications' && 'Browser push notifications'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePreferenceToggle(key as keyof typeof preferences)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="ghost">
              🔔 Test Notifications
            </Button>
            <Button variant="ghost">
              📱 Mobile App Settings
            </Button>
            <Button variant="ghost" broken={true}>
              📧 Email Preferences
            </Button>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">App Settings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map(curr => (
                  <option key={curr.value} value={curr.value}>{curr.label}</option>
                ))}
              </select>
            </div>

            {/* Broken Dropdown - Intentional Bug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme (Broken)</label>
              <div className="relative">
                <button
                  onClick={handleBrokenDropdownClick}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left bg-white broken-dropdown"
                >
                  Light Theme
                  <span className="float-right">▼</span>
                </button>
                {/* This dropdown never opens - intentional bug */}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auto Logout (minutes)</label>
              <select
                value={settings.autoLogout}
                onChange={(e) => handleSettingChange('autoLogout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Two-Factor Authentication</label>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button>
              💾 Save Settings
            </Button>
            <Button variant="ghost">
              🔄 Reset to Defaults
            </Button>
            <Button variant="ghost" broken={true}>
              🔧 Advanced Settings
            </Button>
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Privacy & Data</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Download Your Data</h3>
                <p className="text-sm text-gray-600">Get a copy of all your account data</p>
              </div>
              <Button onClick={handleExportData} variant="ghost">
                📥 Export Data
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Data Sharing</h3>
                <p className="text-sm text-gray-600">Control how your data is shared with partners</p>
              </div>
              <Button variant="ghost">
                ⚙️ Manage
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Cookie Preferences</h3>
                <p className="text-sm text-gray-600">Customize your cookie and tracking preferences</p>
              </div>
              <Button variant="ghost" broken={true}>
                🍪 Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">📞</span>
              <span className="text-sm">Contact Support</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">❓</span>
              <span className="text-sm">Help Center</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col" broken={true}>
              <span className="text-2xl mb-1">💳</span>
              <span className="text-sm">Payment Methods</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">🔒</span>
              <span className="text-sm">Privacy Policy</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;