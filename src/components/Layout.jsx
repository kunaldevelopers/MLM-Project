import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  TreePine, 
  Wallet, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useMLM } from '../contexts/MLMContext.jsx';

const Layout = () => {
  const { user, logout } = useAuth();
  const { getUserNotifications } = useMLM();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = getUserNotifications(user?.id || '');
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Tree View', href: '/tree', icon: TreePine },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Profile', href: '/profile', icon: User },
    ...(user?.role === 'admin' || user?.role === 'moderator' 
      ? [{ name: 'Admin Panel', href: '/admin', icon: Shield }] 
      : []),
  ];

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-neutral-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent navigation={navigation} location={location} handleLogout={handleLogout} user={user} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={navigation} location={location} handleLogout={handleLogout} user={user} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="lg:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-600 hover:bg-neutral-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-neutral-500 hover:text-neutral-600 cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <img
                  src={user?.profilePhoto}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-xs text-neutral-500">{user?.rank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigation, location, handleLogout, user }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="flex items-center space-x-3">
          <img
            src="https://enegixwebsolutions.com/wp-content/uploads/2025/03/ews.png.webp"
            alt="Enegix Global"
            className="h-8 w-8 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <TreePine className="h-8 w-8 text-white" style={{ display: 'none' }} />
          <div>
            <h1 className="text-lg font-bold text-white">Enegix Global</h1>
            <p className="text-xs text-primary-100">MLM Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-900 text-white shadow-md'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.profilePhoto}
            alt={user?.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{user?.name}</p>
            <p className="text-xs text-neutral-500">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Layout;