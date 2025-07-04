import React, { useState } from 'react';
import { 
  DollarSign, 
  Download, 
  Upload, 
  TrendingUp, 
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useMLM } from '../contexts/MLMContext.jsx';
import { format } from 'date-fns';

const Wallet = () => {
  const { user } = useAuth();
  const { getUserTransactions } = useMLM();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank');

  const transactions = getUserTransactions(user?.id || '');
  const credits = transactions.filter(t => t.type === 'credit');
  const debits = transactions.filter(t => t.type === 'debit');

  const walletStats = [
    {
      name: 'Current Balance',
      value: `₹${user?.walletBalance?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'bg-primary-600',
      change: '+₹500 today'
    },
    {
      name: 'Total Earnings',
      value: `₹${user?.totalEarnings?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'bg-success',
      change: '+₹1,200 this week'
    },
    {
      name: 'Total Withdrawn',
      value: `₹${debits.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`,
      icon: Download,
      color: 'bg-warning',
      change: '3 withdrawals'
    },
    {
      name: 'Pending Requests',
      value: debits.filter(t => t.status === 'pending').length,
      icon: Clock,
      color: 'bg-secondary-600',
      change: 'Under review'
    }
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();
    // Demo withdrawal logic
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    // In real app, this would create a withdrawal request
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-error" />;
      default:
        return <Clock className="h-4 w-4 text-neutral-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-neutral-500 bg-neutral-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Wallet</h1>
          <p className="text-neutral-600">Manage your earnings and withdrawals</p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Withdraw</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {walletStats.map((stat, index) => (
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
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: DollarSign },
              { id: 'transactions', name: 'Transactions', icon: TrendingUp },
              { id: 'withdrawals', name: 'Withdrawals', icon: Download }
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Earnings Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Earnings Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[
                      { name: 'Direct Referral Bonus', amount: 800, count: 8 },
                      { name: 'Pair Matching Bonus', amount: 1200, count: 6 },
                      { name: 'Level Income', amount: 300, count: 15 },
                      { name: 'Rank Bonus', amount: 1000, count: 2 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{item.name}</div>
                          <div className="text-xs text-neutral-500">{item.count} transactions</div>
                        </div>
                        <div className="text-sm font-medium text-neutral-900">₹{item.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">₹3,300</div>
                      <div className="text-sm text-neutral-600">Total This Month</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'credit' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                        }`}>
                          {transaction.type === 'credit' ? <Upload className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{transaction.description}</div>
                          <div className="text-xs text-neutral-500">{format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs text-neutral-500">{transaction.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">All Transactions</h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Date Range</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-sm text-neutral-600">
                          {format(new Date(transaction.timestamp), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-900">{transaction.description}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.type === 'credit' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                          }`}>
                            {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                          </span>
                        </td>
                        <td className={`py-3 px-4 text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'withdrawals' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Withdrawal History</h3>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>New Withdrawal</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {debits.map((withdrawal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-error/20 rounded-lg">
                        <Download className="h-4 w-4 text-error" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{withdrawal.description}</div>
                        <div className="text-xs text-neutral-500">{format(new Date(withdrawal.timestamp), 'MMM dd, yyyy HH:mm')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-error">-₹{withdrawal.amount.toLocaleString()}</div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(withdrawal.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(withdrawal.status)}`}>
                          {withdrawal.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Request Withdrawal</h3>
            
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Amount (Min: ₹500)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="500"
                  max={user?.walletBalance || 0}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Available: ₹{user?.walletBalance?.toLocaleString() || 0}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Withdrawal Method
                </label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="upi">UPI</option>
                  <option value="paytm">Paytm</option>
                </select>
              </div>

              <div className="bg-neutral-50 p-3 rounded-lg">
                <p className="text-xs text-neutral-600">
                  <strong>Note:</strong> Withdrawals are processed within 24-48 hours. 
                  A processing fee of ₹10 will be deducted.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Request Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;