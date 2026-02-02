# 🏫 Smart Campus Item Management System

A centralized web platform designed for educational institutions to help students and staff report, track, and recover lost items on campus. This project replaces disorganized WhatsApp groups with a structured, searchable, and secure digital inventory.

---

## 🚀 Key Features

### 🔐 Authentication & Security

- **Role-Based Access Control (RBAC):** Distinct portals for Students and Admins.
- **Secure Login:** Powered by **NextAuth.js** with encrypted password storage (bcrypt).
- **Privacy Shield:** Contact numbers are hidden by default to prevent spamming.

### 📦 Core Functionality

- **Report Items:** Dynamic form with Image Uploading (via **Cloudinary** integration).
- **Smart Search:** Real-time filtering by Category (Electronics, ID Cards, etc.), Status (Lost/Found), and Keywords.
- **Status Tracking:** Users can mark items as "Resolved" (Found/Returned) without deleting history.
- **Smart Dates:** Displays relative time (e.g., "2 hours ago") for better urgency context.

### 📱 User Experience

- **Responsive Design:** Fully optimized for Mobile (with Hamburger Menu) and Desktop.
- **SEO Optimized:** Dynamic metadata and Open Graph tags for social sharing.
- **Admin Dashboard:** Specialized view for administrators to moderate content.

---

## 🛠️ Technology Stack

| Component    | Technology               | Description                                       |
| :----------- | :----------------------- | :------------------------------------------------ |
| **Frontend** | Next.js 16+ (App Router) | React Framework with Server-Side Rendering        |
| **Styling**  | Tailwind CSS             | Utility-first CSS framework for responsive design |
| **Backend**  | Next.js API Routes       | Serverless functions for handling API requests    |
| **Database** | MongoDB                  | NoSQL database for flexible data storage          |
| **ODM**      | Mongoose                 | Schema modeling for MongoDB                       |
| **Auth**     | NextAuth.js              | Authentication solution for Next.js               |
| **Storage**  | Cloudinary               | Cloud-based image management and optimization     |

---

## ⚙️ Installation & Local Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone [https://github.com/yourusername/campus-lost-found.git](https://github.com/yourusername/campus-lost-found.git)
cd campus-lost-found
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Configure Environment Variables

Create a file named `.env.local` in the root directory and add the following keys:

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017/campus-lost-found
# Or use your MongoDB Atlas connection string

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_random_string
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (Backdoor Access)
ADMIN_EMAIL=admin@college.edu
ADMIN_PASSWORD=admin123

# Cloudinary Configuration (For Image Uploads)
# Get these from your Cloudinary Dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_PRESET=your_unsigned_upload_preset
```

### 4\. Run the Development Server

```bash
npm run dev
```

### 5\. Access the App

Open your browser and navigate to:
`http://localhost:3000`

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── admin/       # Admin Dashboard Page
│   ├── api/         # Backend API Endpoints (Auth, Items, Seed)
│   ├── auth/        # Login & Signup Pages
│   ├── items/       # Browse Listing & Edit Pages
│   ├── profile/     # User Profile & History
│   ├── report/      # Item Reporting Form
│   ├── layout.js    # Root Layout & Global Navbar
│   └── page.js      # Landing Page
├── components/      # Reusable UI Components (Navbar, ItemCard, etc.)
├── lib/             # Database Connection Helper (db.js)
└── models/          # Mongoose Data Models (User.js, Item.js)
```

---

## 8. Future Scope

### Student

- Can register and login.
- Can report lost or found items.
- Can manage their own posts (Edit/Delete/Mark Resolved).

### Admin

- Logs in via the universal login page using specific credentials.
- Can view all items.
- Can delete inappropriate or spam posts.
- Has a dedicated dashboard link in the navbar.

---

## 🤝 Contributing

Contributions are welcome\!

1. **Fork** the project.
2. \*\*Create your feature branch (`git checkout -b feature/NewFeature`).
3. **Commit** your changes (`git commit -m 'Add some NewFeature'`).
4. **Push** to the branch (`git push origin feature/NewFeature`).
5. **Open a Pull Request**.

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.
