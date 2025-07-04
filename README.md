# MLM Platform 🚀

A modern, responsive Multi-Level Marketing (MLM) platform built with React, Vite, and Tailwind CSS. This platform provides a comprehensive solution for managing MLM networks, tracking earnings, and visualizing organizational structures.

## ✨ Features

### 🏠 Core Features

- **User Authentication** - Secure login and registration system
- **Dashboard** - Comprehensive overview of earnings, team performance, and statistics
- **Tree Visualization** - Interactive network tree view to visualize downline structure
- **Wallet Management** - Track earnings, withdrawals, and transaction history
- **Profile Management** - User profile settings and personal information
- **Admin Panel** - Administrative controls for managing the platform

### 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern Interface** - Clean, professional design with smooth animations
- **Interactive Charts** - Data visualization using Chart.js and Recharts
- **Real-time Updates** - Live data updates and notifications
- **Protected Routes** - Secure routing with authentication checks

### 📊 Analytics & Reporting

- **Performance Metrics** - Track team growth and personal earnings
- **Commission Tracking** - Detailed breakdown of different commission types
- **Visual Tree Structure** - Interactive network visualization with React D3 Tree
- **Financial Dashboard** - Comprehensive wallet and transaction management

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript development

### UI Libraries

- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Elegant toast notifications

### Data Visualization

- **Chart.js** - Flexible charting library
- **React Chart.js 2** - React wrapper for Chart.js
- **Recharts** - Composable charting library
- **React D3 Tree** - Interactive tree visualization

### Utilities

- **Date-fns** - Modern JavaScript date utility library
- **JS Cookie** - Simple API for handling cookies

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   └── ProtectedRoute.jsx # Route protection component
├── contexts/           # React context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── MLMContext.jsx  # MLM business logic and data
├── pages/              # Main application pages
│   ├── AdminPanel.jsx  # Administrative interface
│   ├── Dashboard.jsx   # Main dashboard
│   ├── LoginPage.jsx   # User login
│   ├── Profile.jsx     # User profile management
│   ├── RegisterPage.jsx # User registration
│   ├── TreeView.jsx    # Network tree visualization
│   └── Wallet.jsx      # Financial management
└── utils/              # Utility functions
    ├── auth.js         # Authentication helpers
    └── demoData.js     # Sample data for development
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mlm-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🚀 Deployment

### Vercel Deployment

This project is optimized for deployment on Vercel. The repository includes the necessary configuration files to handle client-side routing properly.

#### Configuration Files:

- `vercel.json` - Handles SPA routing by redirecting all routes to index.html
- `public/_redirects` - Additional fallback for routing (backup configuration)

#### Deploy to Vercel:

1. **Connect your repository** to Vercel
2. **Import your project** in the Vercel dashboard
3. **Deploy** - Vercel will automatically detect it's a Vite project

#### Manual Deployment:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

#### SPA Routing Fix:

The `vercel.json` configuration ensures that refreshing pages or direct URL access works correctly by redirecting all routes to `index.html`, allowing React Router to handle client-side routing.

### Other Platforms

For other deployment platforms (Netlify, GitHub Pages, etc.), ensure your hosting provider is configured to:

1. Redirect all routes to `index.html`
2. Serve the `dist/` folder after running `npm run build`

## 🔐 Authentication

The platform includes a complete authentication system with:

- User registration with email validation
- Secure login with session management
- Protected routes for authenticated users
- Role-based access control for admin features

## 💰 MLM Features

### Commission Structure

- **Direct Commission** - Earnings from direct referrals
- **Level Commission** - Multi-level earnings from team performance
- **Bonus System** - Achievement-based rewards
- **Rank Advancement** - Progressive rank system with benefits

### Network Management

- **Team Tree View** - Visual representation of your network
- **Performance Tracking** - Monitor team member activities
- **Recruitment Tools** - Referral link generation and tracking
- **Communication** - In-platform messaging and notifications

## 🎨 Styling

The project uses Tailwind CSS for styling with:

- Custom color palette for brand consistency
- Responsive design patterns
- Dark/light mode support (configurable)
- Component-based styling approach

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=MLM Platform
VITE_DEBUG_MODE=false
```

### Tailwind Configuration

The project includes a custom Tailwind configuration in `tailwind.config.js` with:

- Custom color schemes
- Extended spacing and typography
- Responsive breakpoints
- Animation utilities

## 📱 Responsive Design

The platform is fully responsive and optimized for:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥 Large screens (1440px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@mlmplatform.com or create an issue in the GitHub repository.

## 🚧 Development Status

This project is actively maintained and regularly updated with new features and improvements.

---

**Built with ❤️ using React and modern web technologies**
