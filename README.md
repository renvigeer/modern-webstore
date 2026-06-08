# REXIFY - Modern E-commerce Store

## 📖 Project Overview

**REXIFY** is a modern, full-featured e-commerce web application built with cutting-edge technologies for an exceptional shopping experience. From browsing products to managing your cart and user account, REXIFY combines beautiful design with robust functionality.

<p align="center">
  <img src="https://github.com/user-attachments/assets/210ecea9-bf20-419c-8cc4-472786d9d7f1" alt="REXIFY Homepage" width="800" />
</p>

## ✨ Key Features

### 🛍️ Product Experience
- **Browse Categories**: Explore products organized into distinct categories with intuitive navigation
- **Product Details**: Detailed product pages with images, descriptions, pricing, and ratings
- **Search Functionality**: Find products quickly with a beautiful, responsive search bar
- **New Arrivals & Bestsellers**: Highlighted sections for trending products

### 🛒 Shopping Cart
- Add products to cart with visual feedback
- Cart badge with real-time count
- Persistent cart using localStorage
- Cart management page with quantity adjustments

### 👤 User Authentication
- User sign up and login with secure authentication
- Demo credentials available for quick testing
- User dashboard for account management
- Protected routes and session management

### 🎨 Beautiful UI/UX
- Modern gradient design system
- Smooth animations and transitions
- Fully responsive for all devices (mobile, tablet, desktop)
- Beautiful navigation with hover effects and badges
- Clean, organized layouts with perfect spacing

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Collapsible mobile navigation
- Optimized for all screen sizes

<p align="center">
  <img src="https://github.com/user-attachments/assets/87c708b9-6e5e-4bcc-b9cd-0502accd99ad" alt="Responsive Design" width="800" />
</p>

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.2.7**: Modern React framework with App Router, Turbopack, and latest features
- **React 19.2.4**: Latest React version with concurrent rendering and new hooks
- **TypeScript 5**: Static type checking for better development experience and fewer bugs
- **Tailwind CSS 4**: Utility-first CSS framework with custom color scheme and animations
- **Lucide React**: Beautiful, consistent icon library for UI elements

### Backend & Authentication
- **NextAuth 5.0.0-beta.31**: Complete authentication solution (Credentials provider)
- **MongoDB with Mongoose 9.6.3**: NoSQL database for user and product data
- **bcrypt**: Secure password hashing for authentication

### Data Management
- **React Context API**: State management for cart functionality
- **LocalStorage**: Persistent cart state
- **Data Generator**: Programmatically generated product data for demonstration

## 📁 Architecture & File Structure

```
REXIFY/
├── src/
│   ├── app/
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   ├── categories/        # Category data endpoint
│   │   │   └── products/          # Product data endpoints
│   │   ├── cart/                  # Cart page
│   │   ├── categories/            # Categories browse page + [categoryId]
│   │   ├── dashboard/             # User dashboard page
│   │   ├── login/                 # Login page
│   │   ├── product/               # Product detail pages
│   │   ├── signup/                # Sign up page
│   │   ├── globals.css            # Global styles and animations
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── page.tsx               # Main homepage
│   ├── components/
│   │   ├── CartProvider.tsx       # Cart state provider
│   │   └── SessionProvider.tsx    # Auth session provider
│   ├── context/
│   │   └── CartContext.tsx        # Cart context and hooks
│   ├── lib/
│   │   ├── data-generator.ts      # Product data generation
│   │   └── mongodb.ts             # Database connection
│   ├── models/
│   │   ├── Product.ts             # Product model schema
│   │   └── User.ts                # User model schema
│   └── auth.ts                    # Auth.js configuration
└── package.json
```

## 🎯 Core Features In Detail

### 1. Homepage & Navigation
- Eye-catching announcement bar with gradient colors
- Animated logo with hover effects
- Navigation with badges for "NEW" and "HOT" sections
- Responsive search bar
- User profile dropdown with quick access to dashboard and sign out
- Mobile hamburger menu with slide-in animation

### 2. Product Display
- Beautiful product cards with gradient borders and shadows
- Add-to-cart animations with visual feedback
- Product badges for NEW and BESTSELLER items
- Discount labels showing percentage off
- Star ratings and review counts

<p align="center">
  <img src="https://github.com/user-attachments/assets/35786fab-d5dd-4e58-952c-3c46076d6229" alt="Product Cards" width="800" />
</p>

### 3. Cart System
- Context API-based state management
- Persistent across browser sessions using localStorage
- Cart page with product previews, quantities, and pricing
- Animated cart badge showing item count
- Add-to-cart animations for better UX

### 4. User Authentication
- Login and sign up pages with clean design
- Demo credentials for quick testing:
  - Email: demo@example.com
  - Password: demo123
- User profile badge in navbar
- User dashboard with stats and recent activity
- Secure password hashing with bcrypt
- Session persistence using NextAuth

### 5. Categories Page
- Browse all product categories at a glance
- Category cards with icons and product counts
- Filter products by category
- Responsive grid layout

## 🎨 Design System

### Color Palette
- **Primary**: Warm orange gradient for branding
- **Accent**: Blue for highlights and buttons
- **Success**: Green for positive feedback
- **Danger**: Red for errors and alerts
- **Background**: Soft peach for a friendly feel
- **Neutrals**: Clean slate gray shades for text and elements

### Custom Animations
- `fadeIn`: Smooth fade-in effects
- `slideInLeft/Right`: Slide transitions
- `pulse`: Subtle pulsing for attention
- `float`: Floating animation for highlights

### Typography
- **Fonts**: Inter (body), Poppins (display)
- **Hierarchy**: Clear heading and body text sizing
- **Weights**: From regular to black for emphasis

## 📊 Data Models

### Product
- `id`: Unique identifier
- `name`: Product name
- `price`: Current price
- `originalPrice`: Original price (for discounts)
- `category`: Product category
- `subcategory`: Product subcategory
- `images`: Array of product images
- `rating`: Star rating (1-5)
- `reviews`: Number of reviews
- `isNew`: Boolean for new arrivals
- `isBestseller`: Boolean for bestseller status
- `about`: Detailed product description

### User
- `name`: User's full name
- `email`: User's email (unique)
- `password`: Hashed password
- `image`: Profile image (optional)
- `role`: User role (user/admin)

## 🚀 Key Improvements Over Time
- Enhanced navbar with better proportions and compact design
- Updated "New Arrivals" section to "News" in navigation
- Added demo user for easy testing
- Optimized for performance and scalability
- Beautiful gradient design system
- Complete user authentication flow

<p align="center">
  <img src="https://github.com/user-attachments/assets/8eb8e4e9-1ed9-4658-a20c-2f2cfe71b9db" alt="Shopping Cart" width="800" />
</p>

## 📱 User Dashboard
- Account overview
- Order history (placeholder)
- Wishlist (placeholder)
- Settings (placeholder)
- Quick navigation to all features

## 🔍 Search & Discovery
- Real-time search functionality
- Search products by name, description, or category
- Responsive search bar with gradient styling
- Visual feedback on focus

---

<p align="center">
  <strong>Built with ❤️ using modern web technologies</strong>
</p>

---

## 📜 License
This project is for demonstration and educational purposes.
