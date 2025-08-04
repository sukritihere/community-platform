# Community Platform

A modern LinkedIn-style community platform built with Next.js, Node.js, Express, and MongoDB. Features user authentication, post creation, profile management, and dark mode support.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based auth with login/register
- **Post Feed**: Create, view, and delete text posts (280 character limit)
- **User Profiles**: Public profile pages with bio and post history
- **Dark Mode**: Beautiful dark/light theme toggle
- **Responsive Design**: Mobile-first design that works on all devices

### Security & Performance
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Server-side validation for all user inputs
- **Password Hashing**: Secure bcrypt password hashing
- **CORS Protection**: Configured for secure cross-origin requests
- **Error Boundaries**: Graceful error handling throughout the app

### User Experience
- **Toast Notifications**: Real-time feedback for all actions
- **Loading Skeletons**: Beautiful loading states
- **Character Counter**: Real-time character counting for posts
- **Profile Editing**: Easy profile management with modal dialogs

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** with App Router and TypeScript
- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for styling
- **next-themes** for dark mode
- **Sonner** for toast notifications
- **date-fns** for date formatting

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Frontend Setup
The frontend is already configured in this directory.

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Install nodemon globally for development (optional)
npm install -g nodemon

# Start the backend server
npm run dev
# or for production
npm start
```

The backend API will run on `http://localhost:5000`

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/community-platform`

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/.env`

### 4. Environment Variables

Update `backend/.env` with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/community-platform
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/community-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── profile/           # Profile pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── auth/             # Authentication components
│   ├── posts/            # Post-related components
│   ├── profile/          # Profile components
│   └── ui/               # shadcn/ui components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── backend/              # Express.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── server.js         # Main server file
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (public feed)
- `POST /api/posts` - Create new post (authenticated)
- `GET /api/posts/user/:userId` - Get posts by user
- `DELETE /api/posts/:postId` - Delete post (owner only)

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update profile (authenticated)
- `GET /api/users` - Search users

## 🎨 Design Features

- **Modern UI**: Clean, professional design with shadcn/ui components
- **Dark Mode**: Seamless dark/light theme switching
- **Responsive**: Mobile-first design that adapts to all screen sizes
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured for secure cross-origin requests
- **Helmet**: Security headers for protection

## 📱 Mobile Support

The application is fully responsive with:
- Mobile-optimized navigation
- Touch-friendly interactive elements
- Optimized layouts for different screen sizes
- Fast loading on mobile networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.