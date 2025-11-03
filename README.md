# 🎫 BookIt - Experience Booking Platform

<div align="center">

![BookIt Banner](https://img.shields.io/badge/BookIt-Experience%20Booking-FFD643?style=for-the-badge)

**A modern, full-stack experience booking platform with Razorpay payment integration**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bookit.iamabhinav.dev-blue?style=for-the-badge&logo=vercel)](https://bookit.iamabhinav.dev)
[![Backend API](https://img.shields.io/badge/Backend%20API-DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean)](https://bookit-bdhul.ondigitalocean.app)
[![API Docs](https://img.shields.io/badge/API%20Docs-View-green?style=for-the-badge)](./API_DOCS.md)

</div>

---

## 📖 About

BookIt is a comprehensive experience booking platform designed for Highway Delite. Users can browse travel experiences, book time slots, apply promo codes, complete secure Razorpay payments, and track their bookings.

---

## ✨ Features

- 🎯 Browse & search experiences
- 📅 Real-time slot booking with availability
- 🛒 Smart cart with live price calculations
- 🎟️ Promo code validation & discounts
- 💳 Secure Razorpay payment integration
- 📦 Booking tracking via email or booking ID
- 📱 Fully responsive mobile-first design
- ⚡ Fast performance with Next.js SSR

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 19, Tailwind CSS v4, Zustand, Axios, Razorpay SDK  
**Backend:** Node.js/Bun, Express v5, MongoDB, Mongoose, Razorpay, Winston

---

## ⚙️ Quick Start

### Prerequisites
- Node.js v18+ or Bun
- MongoDB (local or cloud)
- Razorpay account

### Installation

```bash
# Clone repository
git clone https://github.com/rishiyaduwanshi/bookit.git
cd bookit

# Frontend setup
npm install
npm run dev          # http://localhost:3000

# Backend setup (in new terminal)
cd server
bun install
bun dev              # http://localhost:5000
```

### Environment Variables

**Frontend** - Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend** - Create `.env.dev`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookit
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
ALLOWED_ORIGINS=http://localhost:3000
```

### Seed Database (Optional)

```bash
cd server
bun run seed:experiences
bun run seed:slots
bun run seed:promocodes
```

---

## 📡 API Endpoints

📚 **Full documentation:** [API_DOCS.md](./API_DOCS.md)

**Base URL:** `http://localhost:5000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/experiences` | List all experiences (+ search) |
| `GET` | `/experiences/:id` | Get experience with slots |
| `POST` | `/bookings` | Create booking & initiate payment |
| `POST` | `/bookings/verifypayment` | Verify Razorpay payment |
| `GET` | `/bookings/details` | Track booking by email/ID |
| `POST` | `/promo/validate` | Validate promo code |
| `GET` | `/health` | Health check |
| `GET` | `/` | API info & all endpoints |

---

## 🔄 Booking Flow

1. Browse experiences → `GET /experiences`
2. View details & slots → `GET /experiences/:id`
3. Add to cart & apply promo → `POST /promo/validate`
4. Create booking → `POST /bookings` (returns Razorpay order)
5. Complete payment → Razorpay checkout
6. Verify payment → `POST /bookings/verifypayment`
7. Booking confirmed → Seats updated
8. Track anytime → `GET /bookings/details`

---

## 🚀 Deployment

**Frontend:** Vercel (auto-deploy from `main` branch)  
**Backend:** DigitalOcean App Platform (auto-deploy from `main` branch)

---


### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production
npm run lint     # Run Biome linter
```

### Backend
```bash
bun dev                    # Development with hot reload
bun run pro                # Production server
bun run seed:experiences   # Seed experiences
bun run seed:slots         # Seed time slots
bun run seed:promocodes    # Seed promo codes
```

---

## 👨‍💻 Developer

**Abhinav Prakash**

🌐 [Portfolio](https://iamabhinav.dev) • 📝 [Blog](https://blog.iamabhinav.dev) • 💼 [LinkedIn](https://linkedin.com/in/rishiyaduwanshi) • 🐙 [GitHub](https://github.com/rishiyaduwanshi)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Abhinav Prakash](https://iamabhinav.dev)

</div>
