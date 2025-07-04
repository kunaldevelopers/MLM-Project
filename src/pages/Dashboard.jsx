import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Share2,
  ChevronDown,
  ChevronRight,
  Bell,
  Calendar,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useMLM } from '../contexts/MLMContext.jsx';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserTransactions, getUserNotifications } = useMLM();
  const [expandedSections, setExpandedSections] = useState(new Set(['earnings', 'team', 'activities']));

  const transactions = getUserTransactions(user?.id || '');
  const notifications = getUserNotifications(user?.id || '');
  const recentTransactions = transactions.slice(0, 5);
  const recentNotifications = notifications.slice(0, 5);

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const stats = [
    {
      name: 'Wallet Balance',
      value: `₹${user?.walletBalance?.toLocaleString() || 0}`,
      change: '+12.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-success',
      description: 'Available for withdrawal'
    },
    {
      name: 'Total Earnings',
      value: `₹${user?.totalEarnings?.toLocaleString() || 0}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-primary-600',
      description: 'Lifetime earnings'
    },
    {
      name: 'Direct Referrals',
      value: user?.directReferrals || 0,
      change: '+2',
      changeType: 'positive',
      icon: Users,
      color: 'bg-warning',
      description: 'Personal referrals'
    },
    {
      name: 'Current Rank',
      value: user?.rank || 'Bronze',
      change: 'Active',
      changeType: 'neutral',
      icon: Award,
      color: 'bg-secondary-600',
      description: 'Achievement level'
    }
  ];

  const earningsBreakdown = [
    { name: 'Direct Referral', amount: 500, percentage: 35, color: 'bg-primary-600' },
    { name: 'Pair Bonus', amount: 600, percentage: 42, color: 'bg-success' },
    { name: 'Level Income', amount: 200, percentage: 14, color: 'bg-warning' },
    { name: 'Rank Bonus', amount: 130, percentage: 9, color: 'bg-secondary-600' }
  ];

  const CollapsibleSection = ({ id, title, icon: Icon, children, defaultExpanded = true }) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          </div>
          {isExpanded ? 
            <ChevronDown className="h-5 w-5 text-neutral-500" /> : 
            <ChevronRight className="h-5 w-5 text-neutral-500" />
          }
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-neutral-100">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-100">
                <span className="flex items-center space-x-2">
                  <span>User ID: {user?.id}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Rank: {user?.rank}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {format(new Date(user?.joinDate || ''), 'MMM dd, yyyy')}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={user?.profilePhoto}
                alt={user?.name}
                className="h-16 w-16 rounded-full border-3 border-white/30 shadow-lg"
              />
              <div className="text-right">
                <div className="text-sm text-primary-100">Current Plan</div>
                <div className="text-xl font-semibold">{user?.plan || 'Basic'}</div>
                <div className="text-xs text-primary-200">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-neutral-900 mb-2">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium flex items-center ${
                    stat.changeType === 'positive' ? 'text-success' : 
                    stat.changeType === 'negative' ? 'text-error' : 'text-neutral-500'
                  }`}>
                    {stat.changeType === 'positive' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {stat.changeType === 'negative' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} ml-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Summary */}
        <CollapsibleSection id="team" title="Team Summary" icon={Users}>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-neutral-900">{(user?.leftLegCount || 0) + (user?.rightLegCount || 0)}</div>
                <div className="text-sm text-neutral-600">Total Team Members</div>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-600">{user?.directReferrals || 0}</div>
                <div className="text-sm text-neutral-600">Direct Referrals</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Left Leg</span>
                <span className="text-sm font-medium">{user?.leftLegCount || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Right Leg</span>
                <span className="text-sm font-medium">{user?.rightLegCount || 0}</span>
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="mt-4">
              <div className="text-xs text-neutral-500 mb-2">Team Balance</div>
              <div className="flex h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-600 transition-all duration-500"
                  style={{ width: `${((user?.leftLegCount || 0) / Math.max((user?.leftLegCount || 0) + (user?.rightLegCount || 0), 1)) * 100}%` }}
                />
                <div 
                  className="bg-success transition-all duration-500"
                  style={{ width: `${((user?.rightLegCount || 0) / Math.max((user?.leftLegCount || 0) + (user?.rightLegCount || 0), 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>Left: {user?.leftLegCount || 0}</span>
                <span>Right: {user?.rightLegCount || 0}</span>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Earnings Breakdown */}
        <CollapsibleSection id="earnings" title="Earnings Breakdown" icon={TrendingUp}>
          <div className="space-y-3 mt-4">
            {earningsBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-neutral-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-neutral-900">₹{item.amount}</div>
                  <div className="text-xs text-neutral-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-900">Total Monthly</span>
                <span className="text-lg font-bold text-primary-900">₹1,430</span>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-all duration-200 group">
            <Share2 className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-primary-900">Invite Friends</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-success/10 rounded-lg hover:bg-success/20 transition-all duration-200 group">
            <Download className="h-8 w-8 text-success mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-success">Withdraw</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-warning/10 rounded-lg hover:bg-warning/20 transition-all duration-200 group">
            <Eye className="h-8 w-8 text-warning mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-warning">View Tree</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-all duration-200 group">
            <Plus className="h-8 w-8 text-secondary-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-900">Upgrade Plan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <CollapsibleSection id="activities" title="Recent Activities" icon={Bell}>
          <div className="space-y-3 mt-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === 'credit' ? 'bg-success' : 'bg-error'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{transaction.description}</div>
                    <div className="text-xs text-neutral-500">{format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm')}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  transaction.type === 'credit' ? 'text-success' : 'text-error'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <div className="text-center py-8 text-neutral-500">
                <Bell className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Recent Notifications */}
        <CollapsibleSection id="notifications" title="Recent Notifications" icon={Bell}>
          <div className="space-y-3 mt-4">
            {recentNotifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.read ? 'bg-neutral-300' : 'bg-primary-600'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">{notification.title}</div>
                  <div className="text-xs text-neutral-600 mt-1">{notification.message}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {format(new Date(notification.timestamp), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            ))}
            {recentNotifications.length === 0 && (
              <div className="text-center py-8 text-neutral-500">
                <Bell className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
                <p>No recent notifications</p>
              </div>
            )}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default Dashboard;