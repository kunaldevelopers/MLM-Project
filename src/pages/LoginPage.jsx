import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, TreePine, User, Crown, Shield, Settings, Lock, Mail, ArrowRight, CheckCircle, Star, TrendingUp, Award } from 'lucide-react';
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
      case 'admin': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'moderator': return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      case 'user': return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      default: return 'bg-gradient-to-r from-neutral-500 to-neutral-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="relative">
                <img
                  src="https://enegixwebsolutions.com/wp-content/uploads/2025/03/ews.png.webp"
                  alt="Enegix Global"
                  className="h-16 w-16 object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl" style={{ display: 'none' }}>
                  <TreePine className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Enegix Global
                </h1>
                <p className="text-blue-200 font-medium">Next-Gen MLM Platform</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Welcome to the Future of 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Network Marketing</span>
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Join thousands of successful entrepreneurs building their financial freedom through our innovative MLM platform.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-Time Analytics</h3>
                  <p className="text-blue-200">Track your earnings and team performance instantly</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Achievement System</h3>
                  <p className="text-blue-200">Unlock ranks and bonuses as you grow</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Premium Tools</h3>
                  <p className="text-blue-200">Advanced features for serious entrepreneurs</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-blue-200">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$2.5M+</div>
                <div className="text-sm text-blue-200">Paid Out</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <img
                  src="https://enegixwebsolutions.com/wp-content/uploads/2025/03/ews.png.webp"
                  alt="Enegix Global"
                  className="h-12 w-12 object-contain rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center" style={{ display: 'none' }}>
                  <TreePine className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Enegix Global</h1>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100">Sign in to continue your success journey</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-blue-200"
                      placeholder="Enter your email or phone"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-blue-200"
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
                        <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 bg-white/10 border-white/20 rounded"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-sm text-blue-100 font-medium">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-300 hover:text-white font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-xl"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <span className="text-sm text-blue-100">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-300 hover:text-white font-semibold transition-colors">
                    Create Account
                  </Link>
                </span>
              </div>

              {/* Demo Section */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Try Demo Accounts</h3>
                <div className="space-y-3">
                  {demoUsers.slice(0, 3).map((demoUser) => {
                    const Icon = getDemoUserIcon(demoUser.role);
                    return (
                      <button
                        key={demoUser.id}
                        onClick={() => handleDemoLogin(demoUser)}
                        className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={demoUser.profilePhoto}
                            alt={demoUser.name}
                            className="h-10 w-10 rounded-full border border-white/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{demoUser.name}</span>
                              <span className={`px-2 py-1 rounded-md text-xs font-bold ${getRoleColor(demoUser.role)}`}>
                                {demoUser.role}
                              </span>
                            </div>
                            <p className="text-xs text-blue-200">{demoUser.email}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-blue-300 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-blue-200">
                © 2025 Enegix Global. Secured with enterprise-grade encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;