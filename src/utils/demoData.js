import { format, subDays, subHours } from 'date-fns';

// Demo tree data structure
export const demoTreeData = [
  {
    id: 'user001',
    name: 'John Doe',
    children: [
      {
        id: 'user003',
        name: 'Alice Johnson',
        children: [
          { id: 'user007', name: 'Bob Wilson' },
          { id: 'user008', name: 'Carol Davis' }
        ]
      },
      {
        id: 'user004',
        name: 'Mike Brown',
        children: [
          { id: 'user009', name: 'David Lee' },
          { id: 'user010', name: 'Emma White' }
        ]
      }
    ]
  },
  {
    id: 'user002',
    name: 'Priya Sharma',
    children: [
      {
        id: 'user011',
        name: 'Raj Patel',
        children: [
          { id: 'user015', name: 'Sunita Kumar' },
          { id: 'user016', name: 'Amit Singh' }
        ]
      },
      {
        id: 'user012',
        name: 'Neha Gupta',
        children: [
          { id: 'user017', name: 'Ravi Mehta' },
          { id: 'user018', name: 'Pooja Jain' }
        ]
      }
    ]
  }
];

// Demo transactions
export const demoTransactions = [
  {
    id: 'txn001',
    userId: 'user001',
    type: 'credit',
    amount: 100,
    description: 'Direct Referral Bonus',
    category: 'direct_referral',
    status: 'completed',
    timestamp: subDays(new Date(), 1).toISOString()
  },
  {
    id: 'txn002',
    userId: 'user001',
    type: 'credit',
    amount: 200,
    description: 'Pair Matching Bonus',
    category: 'pair_bonus',
    status: 'completed',
    timestamp: subDays(new Date(), 2).toISOString()
  },
  {
    id: 'txn003',
    userId: 'user001',
    type: 'debit',
    amount: 500,
    description: 'Withdrawal Request',
    category: 'withdrawal',
    status: 'pending',
    timestamp: subDays(new Date(), 3).toISOString()
  },
  {
    id: 'txn004',
    userId: 'user002',
    type: 'credit',
    amount: 1000,
    description: 'Rank Bonus - Diamond',
    category: 'rank_bonus',
    status: 'completed',
    timestamp: subDays(new Date(), 5).toISOString()
  },
  {
    id: 'txn005',
    userId: 'user002',
    type: 'credit',
    amount: 50,
    description: 'Level Income - Level 3',
    category: 'level_income',
    status: 'completed',
    timestamp: subDays(new Date(), 7).toISOString()
  }
];

// Demo notifications
export const demoNotifications = [
  {
    id: 'notif001',
    userId: 'user001',
    title: 'New Referral Joined',
    message: 'Alice Johnson has joined your team',
    type: 'referral',
    read: false,
    timestamp: subHours(new Date(), 2).toISOString()
  },
  {
    id: 'notif002',
    userId: 'user001',
    title: 'Pair Bonus Earned',
    message: 'You earned ₹200 from pair matching',
    type: 'earning',
    read: false,
    timestamp: subHours(new Date(), 5).toISOString()
  },
  {
    id: 'notif003',
    userId: 'user001',
    title: 'Withdrawal Pending',
    message: 'Your withdrawal request of ₹500 is pending approval',
    type: 'withdrawal',
    read: true,
    timestamp: subDays(new Date(), 1).toISOString()
  },
  {
    id: 'notif004',
    userId: 'user002',
    title: 'Rank Achievement',
    message: 'Congratulations! You achieved Diamond rank',
    type: 'achievement',
    read: false,
    timestamp: subDays(new Date(), 3).toISOString()
  },
  {
    id: 'notif005',
    userId: 'user002',
    title: 'Team Milestone',
    message: 'Your team has reached 500 members',
    type: 'milestone',
    read: true,
    timestamp: subDays(new Date(), 7).toISOString()
  }
];

// Demo KYC data
export const demoKYCData = [
  {
    id: 'kyc001',
    userId: 'user001',
    aadhaarNumber: '1234-5678-9012',
    panNumber: 'ABCDE1234F',
    bankAccount: '1234567890',
    ifscCode: 'SBIN0001234',
    status: 'approved',
    submittedDate: subDays(new Date(), 10).toISOString(),
    approvedDate: subDays(new Date(), 5).toISOString()
  },
  {
    id: 'kyc002',
    userId: 'user002',
    aadhaarNumber: '9876-5432-1098',
    panNumber: 'ZYXWV9876E',
    bankAccount: '0987654321',
    ifscCode: 'HDFC0001234',
    status: 'approved',
    submittedDate: subDays(new Date(), 15).toISOString(),
    approvedDate: subDays(new Date(), 10).toISOString()
  }
];

// Demo plans
export const demoPlans = [
  {
    id: 'plan001',
    name: 'Basic',
    price: 499,
    duration: 30,
    dailyCap: 5000,
    features: ['Direct Referral Bonus', 'Pair Matching Bonus', 'Level Income (5 levels)'],
    description: 'Perfect for beginners'
  },
  {
    id: 'plan002',
    name: 'Pro',
    price: 999,
    duration: 60,
    dailyCap: 7500,
    features: ['Direct Referral Bonus', 'Pair Matching Bonus', 'Level Income (8 levels)', 'Rank Bonus'],
    description: 'Most popular choice',
    popular: true
  },
  {
    id: 'plan003',
    name: 'Elite',
    price: 1999,
    duration: 90,
    dailyCap: 10000,
    features: ['Direct Referral Bonus', 'Pair Matching Bonus', 'Level Income (10 levels)', 'Rank Bonus', 'VIP Support'],
    description: 'For serious networkers'
  }
];

// Commission rates
export const commissionRates = {
  directReferral: 100,
  pairBonus: 200,
  levelIncome: 10,
  rankBonus: {
    Bronze: 500,
    Silver: 1000,
    Gold: 5000,
    Diamond: 10000
  }
};