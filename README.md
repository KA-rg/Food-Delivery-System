# Food Delivery App

A food delivery application with a customer frontend, admin panel, and backend API. Users can browse food items, add them to cart, and place orders. Admins can manage food items and view orders.

## What it does

**For customers:**
- Browse food items by category
- Add/remove items from cart
- User registration and login
- Place orders and view order history
- Payment processing with Stripe

**For admins:**
- Add, edit, and delete food items
- Upload food images
- View and manage customer orders
- Dashboard overview

## Project Structure

```
food-del/
├── frontend/          # Customer app (React)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/        # Page components
│   │   ├── Context/      # State management
│   │   └── assets/       # Images and static files
│   └── package.json
├── admin/             # Admin panel (React)
│   ├── src/
│   │   ├── components/   # Admin UI components
│   │   ├── pages/       # Admin pages
│   │   └── assets/      # Admin assets
│   └── package.json
├── backend/           # API server (Node.js)
│   ├── config/        # Database config
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── uploads/       # Food images
│   └── server.js      # Main server file
└── README.md
```

## Tech Stack

**Frontend & Admin:**
- React 18
- Vite
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT authentication
- Stripe payments
- Multer (file uploads)

## Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install

   # Admin
   cd ../admin
   npm install
   ```

2. **Environment variables**

   Create `.env` in backend folder:
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

3. **Run the app**
   ```bash
   # Backend (port 4000)
   cd backend
   npm run server

   # Frontend (port 5173)
   cd frontend
   npm run dev

   # Admin (port 5174)
   cd admin
   npm run dev
   ```

## API Routes

- `POST /api/user/signup` - Register user
- `POST /api/user/login` - Login user
- `GET /api/food/list` - Get food items
- `POST /api/food/add` - Add food item (admin)
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `POST /api/order/place` - Place order
- `GET /api/order/list` - Get orders (admin)

## Database

Uses MongoDB with these collections:
- users
- foods
- orders
- carts

## Features

- User authentication with JWT
- Shopping cart functionality
- Order management
- Payment processing
- Image upload for food items
- Responsive design
- Category filtering
- Admin dashboard

## Notes

- Food images are stored in `backend/uploads/`
- Cart data is stored in localStorage for guests
- Orders require user authentication
- Admin routes are protected
- Stripe is used for payments 