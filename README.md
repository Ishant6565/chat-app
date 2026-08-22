# 💬 Chatty — Fullstack Real-Time Messaging Platform

<div align="center">

![Chatty Banner](https://img.shields.io/badge/Chatty-Realtime_Chat_App-black?style=for-the-badge&logo=chat&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge&logo=render&logoColor=white)](https://hidden-leaf-village-udab.onrender.com)

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A high-performance, real-time messaging application designed with a sleek monochrome aesthetic, glassmorphic UI, and fluid micro-animations.**

### 🌐 [Click Here to Open Live Demo App](https://hidden-leaf-village-udab.onrender.com)

Developed by **[Ishant Gupta](https://github.com/Ishant6565)**

</div>

---

## ⚡ Live Demo & Demo Accounts

Try out the live deployment immediately with pre-configured characters:

- **Live URL:** **[https://hidden-leaf-village-udab.onrender.com](https://hidden-leaf-village-udab.onrender.com)**

### Demo Accounts (Password for all: `1234567890`)
| Character | Email |
| :--- | :--- |
| **Naruto Uzumaki** | `naruto@hiddenleaf.com` |
| **Kakashi Hatake** | `kakashi@hiddenleaf.com` |
| **Sasuke Uchiha** | `sasuke@hiddenleaf.com` |
| **Hinata Hyuga** | `hinata@hiddenleaf.com` |

---

## ✨ Key Features

- **⚡ Real-Time Messaging:** Instant bidirectional message delivery powered by **Socket.io** WebSockets.
- **🟢 Live Presence Tracking:** Real-time online/offline status indicators with animated status badges.
- **🔒 Secure Authentication:** JWT-based authentication stored in `httpOnly` secure cookies with bcrypt password hashing.
- **🖼️ Media Sharing Pipeline:** Seamless image upload and compression via **Cloudinary API**.
- **🎨 Sleek Monochrome Aesthetic:** Modern black-and-white minimalist design with custom glassmorphism surfaces, smooth slide-up message animations, and dark mode UI.
- **🔍 Instant Contact Search:** Client-side live search and filter for quick conversation discovery.
- **🎭 Multi-Theme Switcher:** 32 customizable themes (powered by DaisyUI) with real-time interactive preview.
- **📱 Fully Responsive:** Adaptive layout tailored for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 with Vite
- **State Management:** Zustand
- **Styling:** TailwindCSS + DaisyUI
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Client Networking:** Axios & Socket.io-client

### **Backend**
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Real-Time Engine:** Socket.io
- **Security:** JSON Web Tokens (JWT), Bcrypt.js, Cookie-Parser, CORS
- **Media Storage:** Cloudinary SDK

---

## 📁 Repository Structure

```text
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Auth & message business logic
│   │   ├── lib/              # Database connection, Socket.io, Cloudinary config
│   │   ├── middleware/       # JWT route protection middleware
│   │   ├── models/           # Mongoose User & Message schemas
│   │   ├── routes/           # Express API route endpoints
│   │   ├── seeds/            # Database initialization scripts
│   │   └── index.js          # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets & avatar images
│   ├── src/
│   │   ├── components/       # Reusable UI components & skeletons
│   │   ├── pages/            # Home, Login, Signup, Profile, Settings
│   │   ├── store/            # Zustand global auth, chat, and theme stores
│   │   ├── lib/              # Axios instance and date formatters
│   │   ├── App.jsx           # Routing & global providers
│   │   └── index.css         # Custom animations & glassmorphism utilities
│   └── package.json
│
├── package.json              # Monorepo build orchestrator
├── render.yaml               # Render Cloud deployment blueprint
├── LICENSE                   # MIT License
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account

### 2. Clone the Repository
```bash
git clone https://github.com/Ishant6565/chat-app.git
cd chat-app
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 4. Install Dependencies & Run Locally

#### Option A: Run Both Simultaneously
```bash
npm run build
npm start
```

#### Option B: Run Services Individually (Development Mode)
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Visit **`http://localhost:5173`** in your browser to interact with the local development instance.

---

## 👨‍💻 Author

**Ishant Gupta**
- **GitHub:** [@Ishant6565](https://github.com/Ishant6565)
- **Live Project:** [Hidden Leaf Chat App](https://hidden-leaf-village-udab.onrender.com)
- **Portfolio:** [Portfolio Website](https://github.com/Ishant6565/portfolio)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
