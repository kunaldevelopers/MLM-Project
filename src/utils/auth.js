// Demo users for testing
export const demoUsers = [
  {
    id: 'user001',
    name: 'John Doe',
    email: 'user1@demo.com',
    password: 'User@1234',
    phone: '+91 9876543210',
    rank: 'Bronze',
    totalEarnings: 1000,
    walletBalance: 750,
    directReferrals: 2,
    indirectReferrals: 5,
    leftLegCount: 3,
    rightLegCount: 4,
    kycStatus: 'approved',
    isActive: true,
    joinDate: '2025-06-15T10:30:00Z',
    role: 'user',
    profilePhoto: 'https://ui-avatars.com/api/?name=John+Doe&background=1e3a8a&color=fff',
    plan: 'Basic',
    dailyEarningCap: 5000,
    description: 'Regular User - A user with 2 direct referrals, partial tree, and ₹1,000 earnings (Bronze rank)'
  },
  {
    id: 'user002',
    name: 'Priya Sharma',
    email: 'top@demo.com',
    password: 'Top@1234',
    phone: '+91 9876543211',
    rank: 'Diamond',
    totalEarnings: 50000,
    walletBalance: 25000,
    directReferrals: 20,
    indirectReferrals: 500,
    leftLegCount: 250,
    rightLegCount: 270,
    kycStatus: 'approved',
    isActive: true,
    joinDate: '2025-05-01T08:00:00Z',
    role: 'user',
    profilePhoto: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff',
    plan: 'Elite',
    dailyEarningCap: 10000,
    description: 'Top Earner - A user with 20 direct referrals, 500 team members, ₹50,000 earnings (Diamond rank)'
  },
  {
    id: 'admin001',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'Admin@1234',
    phone: '+91 9876543212',
    rank: 'Diamond',
    totalEarnings: 100000,
    walletBalance: 50000,
    directReferrals: 0,
    indirectReferrals: 0,
    leftLegCount: 0,
    rightLegCount: 0,
    kycStatus: 'approved',
    isActive: true,
    joinDate: '2025-01-01T00:00:00Z',
    role: 'admin',
    profilePhoto: 'https://ui-avatars.com/api/?name=Admin+User&background=ef4444&color=fff',
    plan: 'Elite',
    dailyEarningCap: 50000,
    description: 'Admin - Full access to admin panel with all permissions'
  },
  {
    id: 'mod001',
    name: 'Moderator',
    email: 'mod@demo.com',
    password: 'Mod@1234',
    phone: '+91 9876543213',
    rank: 'Gold',
    totalEarnings: 15000,
    walletBalance: 8000,
    directReferrals: 5,
    indirectReferrals: 50,
    leftLegCount: 25,
    rightLegCount: 30,
    kycStatus: 'approved',
    isActive: true,
    joinDate: '2025-02-01T12:00:00Z',
    role: 'moderator',
    profilePhoto: 'https://ui-avatars.com/api/?name=Moderator&background=f59e0b&color=fff',
    plan: 'Pro',
    dailyEarningCap: 7500,
    description: 'Moderator - Limited admin access (e.g., approve KYC/withdrawals but cannot edit plans)'
  }
];

// Simple JWT-like token generation (for demo purposes)
export const generateJWT = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

export const validateJWT = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    
    // Check if token is expired
    if (payload.exp < Date.now()) {
      return null;
    }
    
    // Find user from demo users
    const user = demoUsers.find(u => u.id === payload.id);
    return user || null;
  } catch (error) {
    return null;
  }
};

export const hashPassword = (password) => {
  // Simple hash for demo purposes
  return btoa(password);
};

export const verifyPassword = (password, hashedPassword) => {
  return btoa(password) === hashedPassword;
};