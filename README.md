# 🚗 Smart Parking System

A modern parking management app with QR code scanning, digital tickets, and role-based access control.

## Features

- **QR Code Parking** - Scan to park at any location
- **Digital Tickets** - Paperless parking receipts with QR codes
- **Role-Based Access** - User, Driver, Manager, Admin dashboards
- **Payment Integration** - UPI, Card, NetBanking support
- **Parking History** - Track all your parking sessions

## Tech Stack

**Frontend:** React 19, Tailwind CSS, Vite  
**Backend:** Node.js, Express, JWT Auth

## Quick Start

### Backend
```bash
cd backend
npm install
PORT=5001 node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`



## Project Structure

```
smart-parking/
├── backend/          # Express API server
│   ├── server.js
│   └── users.json
└── frontend/         # React app
    ├── src/
    │   ├── components/
    │   ├── context/
    │   └── App.jsx
    └── vite.config.js
```

## Known Issues

**Dependency Conflict:** Remove `react-qr-reader` from `package.json` (line 20) before installing. It's incompatible with React 19.

