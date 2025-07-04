import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, TreePine, User, Crown, Shield, Settings, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { demoUsers } from '../utils/auth.js';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoUser) => {
    setLoading(true);
    try {
      const result = await login(demoUser.email, demoUser.password);
      if (result.success) {
        toast.success(`Logged in as ${demoUser.name} (${demoUser.role})`);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const getDemoUserIcon = (role) => {
    switch (role) {
      case 'admin': return Shield;
      case 'moderator': return Settings;
      case 'user': return demoUsers.find(u => u.role === role && u.totalEarnings > 10000) ? Crown : User;
      default: return User;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'moderator': return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      case 'user': return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      default: return 'bg-gradient-to-r from-neutral-500 to-neutral-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <img
              src="https://enegixwebsolutions.com/wp-content/uploads/2025/03/ews.png.webp"
              alt="Enegix Global"
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="h-16 w-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center" style={{ display: 'none' }}>
              <TreePine className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent">
                Enegix Global
              </h1>
              <p className="text-sm text-neutral-600 font-medium">MLM Platform</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Welcome to Your Success Journey
          </h2>
          <p className="text-neutral-600 max-w-md mx-auto">
            Sign in to access your dashboard or explore with our demo accounts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Sign In</h3>
              <p className="text-neutral-600">Access your account to continue your journey</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-3">
                  Email or Phone
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your email or phone"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-12 pr-12 py-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-sm text-neutral-700 font-medium">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-sm text-neutral-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-500 font-semibold transition-colors">
                  Sign up now
                </Link>
              </span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Try Demo Accounts</h3>
              <p className="text-neutral-600">
                Explore the platform instantly with pre-configured demo accounts
              </p>
            </div>

            <div className="space-y-4">
              {demoUsers.map((demoUser) => {
                const Icon = getDemoUserIcon(demoUser.role);
                return (
                  <div
                    key={demoUser.id}
                    className="group border border-neutral-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    onClick={() => handleDemoLogin(demoUser)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 relative">
                        <img
                          src={demoUser.profilePhoto}
                          alt={demoUser.name}
                          className="h-14 w-14 rounded-full border-2 border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm">
                          <Icon className="h-4 w-4 text-neutral-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-neutral-900">{demoUser.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(demoUser.role)}`}>
                            {demoUser.role.charAt(0).toUpperCase() + demoUser.role.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{demoUser.email}</p>
                        <p className="text-xs text-neutral-500 leading-relaxed">{demoUser.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md group-hover:shadow-lg flex items-center space-x-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDemoLogin(demoUser);
                          }}
                        >
                          <span>Try Demo</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                Demo Account Features
              </h4>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Realistic data and interactions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Safe environment for testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Full access to all features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Auto-reset daily to initial state</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-neutral-500">
            © 2025 Enegix Global. All rights reserved. | 
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500 ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="text-primary-600 hover:text-primary-500 ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;