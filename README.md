# 🎫 BookIt - Experience Booking Platform

<div align="center">

![BookIt Banner](https://img.shields.io/badge/BookIt-Experience%20Booking-FFD643?style=for-the-badge)

**A modern, full-stack experience booking platform built with Next.js and Express**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bookit.iamabhinav.dev-blue?style=for-the-badge&logo=vercel)](https://bookit.iamabhinav.dev)
[![Backend API](https://img.shields.io/badge/Backend%20API-DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean)](https://bookit-bdhul.ondigitalocean.app)

</div>

---

## 📖 About

BookIt is a comprehensive booking platform designed for Highway Delite experiences. Users can browse various travel experiences, select dates and times, manage their cart, apply promo codes, and complete bookings with a seamless, responsive interface.

### ✨ Key Features

- 🎯 **Browse Experiences** - Explore a curated collection of travel experiences
- 📅 **Date & Time Selection** - Choose your preferred slot with an intuitive UI
- 🛒 **Smart Cart System** - Real-time price calculation with taxes and discounts
- 🎟️ **Promo Code Support** - Apply discount codes during checkout
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

- ⚡ **Fast & Modern** - Built with Next.js 16 and React 19


---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Code Quality:** Biome (Linting & Formatting)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs, express-rate-limit
- **Logging:** Winston & Morgan
- **CORS:** Configured for cross-origin requests
- **Date Handling:** Day.js

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- pnpm (recommended) or npm

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rishiyaduwanshi/bookit.git
cd bookit
```

### 2️⃣ Frontend Setup
```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Frontend will be available at `http://localhost:3000`

### 3️⃣ Backend Setup
```bash
cd server

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.dev

# Configure your environment variables
# Edit .env.dev with your MongoDB URI, JWT secret, etc.

# Seed the database (optional)
pnpm run seed:experiences
pnpm run seed:slots
pnpm run seed:promocodes

# Run development server
pnpm run dev

# Run production server
pnpm run pro
```

Backend will be available at `http://localhost:5000` (or your configured port)

---

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://bookit-bdhul.ondigitalocean.app
# or for local development
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env.dev / .env)
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=https://bookit.iamabhinav.dev,http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register       # Register new user
POST   /api/auth/login          # User login
GET    /api/auth/me             # Get current user
POST   /api/auth/logout         # User logout
```

### Experiences
```
GET    /api/experiences         # Get all experiences
GET    /api/experiences/:id     # Get experience by ID
```

### Promo Codes
```
POST   /api/promo/validate      # Validate promo code
```

---


## 👨‍💻 Author

**Abhinav Yaduwanshi**

- 🌐 Portfolio: [iamabhinav.dev](https://iamabhinav.dev)
- 📝 Blog: [blog.iamabhinav.dev](https://blog.iamabhinav.dev)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/rishiyaduwanshi)
- 🐙 GitHub: [@rishiyaduwanshi](https://github.com/rishiyaduwanshi)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Abhinav Prakash](https://iamabhinav.dev)

</div>
