import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Shield, 
  Edit, 
  Save, 
  X,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Demo update logic
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // Demo password update logic
    setShowPasswordForm(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password updated successfully!');
  };

  const handleKYCUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Demo KYC upload logic
      toast.success('KYC document uploaded successfully!');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
          <p className="text-neutral-600">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            user?.kycStatus === 'approved' ? 'bg-success/20 text-success' :
            user?.kycStatus === 'pending' ? 'bg-warning/20 text-warning' :
            'bg-error/20 text-error'
          }`}>
            KYC: {user?.kycStatus || 'Not Submitted'}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {user?.role?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user?.profilePhoto}
              alt={user?.name}
              className="h-24 w-24 rounded-full border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-neutral-900">{user?.name}</h2>
            <p className="text-neutral-600">{user?.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-warning" />
                <span className="text-sm text-neutral-700">Rank: {user?.rank}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-neutral-500" />
                <span className="text-sm text-neutral-700">
                  Joined: {format(new Date(user?.joinDate || ''), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-neutral-600">Total Earnings</div>
            <div className="text-2xl font-bold text-success">₹{user?.totalEarnings?.toLocaleString() || 0}</div>
            <div className="text-sm text-neutral-600">User ID: {user?.id}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', name: 'Profile Details', icon: User },
              { id: 'kyc', name: 'KYC Verification', icon: Shield },
              { id: 'settings', name: 'Settings', icon: Edit }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Personal Information</h3>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editMode}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!editMode}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editMode}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user?.id}
                    disabled
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-500"
                  />
                </div>
              </form>

              {/* Account Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm text-neutral-600">Current Plan</div>
                  <div className="text-lg font-semibold text-neutral-900">{user?.plan || 'Basic'}</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm text-neutral-600">Referral Code</div>
                  <div className="text-lg font-semibold text-neutral-900">{user?.id?.toUpperCase()}</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm text-neutral-600">Account Status</div>
                  <div className="text-lg font-semibold text-success">Active</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">KYC Verification</h3>
                <div className={`p-4 rounded-lg ${
                  user?.kycStatus === 'approved' ? 'bg-success/10 border border-success/20' :
                  user?.kycStatus === 'pending' ? 'bg-warning/10 border border-warning/20' :
                  'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Shield className={`h-5 w-5 ${
                      user?.kycStatus === 'approved' ? 'text-success' :
                      user?.kycStatus === 'pending' ? 'text-warning' :
                      'text-error'
                    }`} />
                    <span className="font-medium">
                      KYC Status: {user?.kycStatus === 'approved' ? 'Verified' : 
                                   user?.kycStatus === 'pending' ? 'Under Review' : 'Not Submitted'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    {user?.kycStatus === 'approved' ? 'Your KYC has been verified successfully.' :
                     user?.kycStatus === 'pending' ? 'Your KYC documents are under review.' :
                     'Please submit your KYC documents to enable withdrawals.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-3">Aadhaar Card</h4>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleKYCUpload}
                    className="w-full"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Upload clear image of your Aadhaar Card (front and back)
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-3">PAN Card</h4>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleKYCUpload}
                    className="w-full"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Upload clear image of your PAN Card
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-neutral-900 mb-2">KYC Requirements</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Clear, readable documents</li>
                  <li>• All four corners visible</li>
                  <li>• File size less than 5MB</li>
                  <li>• Supported formats: JPG, PNG, PDF</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Change Password</div>
                      <div className="text-sm text-neutral-600">Update your account password</div>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Two-Factor Authentication</div>
                      <div className="text-sm text-neutral-600">Add an extra layer of security</div>
                    </div>
                    <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Email Notifications</div>
                      <div className="text-sm text-neutral-600">Receive updates via email</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Referral Settings</h3>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-neutral-900 mb-2">Your Referral Link</div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`https://mlm-platform.com/ref/${user?.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg bg-white text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://mlm-platform.com/ref/${user?.id}`);
                        toast.success('Referral link copied!');
                      }}
                      className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Change Password</h3>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;