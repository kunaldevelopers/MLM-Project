import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Shield, 
  Download,
  Upload,
  Eye,
  Check,
  X,
  Search,
  Filter,
  Plus,
  Edit
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useMLM } from '../contexts/MLMContext.jsx';
import { demoUsers } from '../utils/auth.js';
import { format } from 'date-fns';

const AdminPanel = () => {
  const { user } = useAuth();
  const { transactions, notifications } = useMLM();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user has admin/moderator access
  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div className="p-6">
        <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
          <Shield className="h-12 w-12 text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-error mb-2">Access Denied</h2>
          <p className="text-neutral-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Users',
      value: demoUsers.length,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-primary-600'
    },
    {
      name: 'Total Earnings',
      value: `₹${demoUsers.reduce((sum, u) => sum + (u.totalEarnings || 0), 0).toLocaleString()}`,
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-success'
    },
    {
      name: 'Pending KYC',
      value: demoUsers.filter(u => u.kycStatus === 'pending').length,
      change: '3 new',
      changeType: 'neutral',
      icon: Shield,
      color: 'bg-warning'
    },
    {
      name: 'Active Plans',
      value: demoUsers.filter(u => u.isActive).length,
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-secondary-600'
    }
  ];

  const pendingKYC = demoUsers.filter(u => u.kycStatus === 'pending');
  const pendingWithdrawals = transactions.filter(t => t.type === 'debit' && t.status === 'pending');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Panel</h1>
          <p className="text-neutral-600">Manage your MLM platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {user?.role?.toUpperCase()}
          </div>
          {user?.role === 'admin' && (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
              FULL ACCESS
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.name}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                <p className="text-xs text-neutral-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'kyc', name: 'KYC Requests', icon: Shield },
              { id: 'withdrawals', name: 'Withdrawals', icon: Download },
              ...(user?.role === 'admin' ? [{ id: 'settings', name: 'Settings', icon: Settings }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                    <Plus className="h-6 w-6 text-primary-600" />
                    <span className="font-medium text-primary-900">Add New User</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-warning/10 rounded-lg hover:bg-warning/20 transition-colors">
                    <Shield className="h-6 w-6 text-warning" />
                    <span className="font-medium text-warning">Review KYC</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg hover:bg-success/20 transition-colors">
                    <Download className="h-6 w-6 text-success" />
                    <span className="font-medium text-success">Export Data</span>
                  </button>
                </div>
              </div>

              {/* Pending Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Pending KYC Requests</h3>
                  <div className="space-y-3">
                    {pendingKYC.slice(0, 5).map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                            <div className="text-xs text-neutral-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-success hover:bg-success/10 rounded">
                            <Check className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-error hover:bg-error/10 rounded">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Pending Withdrawals</h3>
                  <div className="space-y-3">
                    {pendingWithdrawals.slice(0, 5).map((withdrawal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">₹{withdrawal.amount.toLocaleString()}</div>
                          <div className="text-xs text-neutral-500">User: {withdrawal.userId}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-success hover:bg-success/10 rounded">
                            <Check className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-error hover:bg-error/10 rounded">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">User Management</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Earnings</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">KYC Status</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoUsers
                      .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((user, index) => (
                        <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.profilePhoto}
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                                <div className="text-xs text-neutral-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full">
                              {user.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-neutral-900">
                            ₹{user.totalEarnings?.toLocaleString() || 0}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.kycStatus === 'approved' ? 'bg-success/20 text-success' :
                              user.kycStatus === 'pending' ? 'bg-warning/20 text-warning' :
                              'bg-error/20 text-error'
                            }`}>
                              {user.kycStatus || 'Not Submitted'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-1">
                              <button className="p-1 text-primary-600 hover:bg-primary-50 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-neutral-600 hover:bg-neutral-50 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">KYC Requests</h3>
              <div className="space-y-3">
                {pendingKYC.map((user, index) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-neutral-900">{user.name}</div>
                          <div className="text-sm text-neutral-500">{user.email}</div>
                          <div className="text-xs text-neutral-400">Submitted: {format(new Date(), 'MMM dd, yyyy')}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'withdrawals' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Withdrawal Requests</h3>
              <div className="space-y-3">
                {pendingWithdrawals.map((withdrawal, index) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-neutral-900">₹{withdrawal.amount.toLocaleString()}</div>
                        <div className="text-sm text-neutral-500">User ID: {withdrawal.userId}</div>
                        <div className="text-xs text-neutral-400">
                          Requested: {format(new Date(withdrawal.timestamp), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && user?.role === 'admin' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900">Platform Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-3">Commission Rates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Direct Referral</span>
                      <span className="text-sm font-medium">₹100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Pair Bonus</span>
                      <span className="text-sm font-medium">₹200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Level Income</span>
                      <span className="text-sm font-medium">₹10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-3">System Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Minimum Withdrawal</span>
                      <span className="text-sm font-medium">₹500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Daily Cap</span>
                      <span className="text-sm font-medium">₹10,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Auto KYC</span>
                      <span className="text-sm font-medium">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;