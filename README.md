# 🚗 Smart Parking System

A modern, production-ready parking management application with QR code scanning, digital tickets, and role-based access control.

## ✨ Features

- **QR Code Parking** - Scan to park at any location
- **Digital Tickets** - Paperless parking receipts with QR codes
- **Role-Based Access** - User, Driver, Manager, Admin dashboards
- **Payment Integration** - UPI, Card, NetBanking support
- **Parking History** - Track all your parking sessions
- **Production Ready** - Database persistence, security, error handling

## 🛠 Tech Stack

**Frontend:**
- React 19
- Tailwind CSS
- Vite
- Axios

**Backend:**
- Node.js
- Express
- Supabase (PostgreSQL)
- Security middleware (Helmet, CORS, Rate Limiting)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Supabase account
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd smart-parking
   ```

2. **Set Up Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `backend/database/schema.sql` in Supabase SQL Editor
   - Get your project URL and anon key

3. **Configure Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm install
   npm start
   ```

4. **Configure Frontend**
   ```bash
   cd frontend
   cp .env.example .env
   # Leave VITE_API_URL empty for development (uses proxy)
   npm install --legacy-peer-deps
   npm run dev
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Docker Deployment

```bash
# Build and start all services
./scripts/deploy.sh deploy

# View logs
./scripts/deploy.sh logs

# Stop services
./scripts/deploy.sh stop

# Check status
./scripts/deploy.sh status
```

Or manually:
```bash
docker-compose up -d --build
```

## 📁 Project Structure

```
smart-parking/
├── backend/              # Express API server
│   ├── database/        # Database schema
│   ├── server.js        # Main server file
│   ├── Dockerfile       # Backend container config
│   └── .env.example     # Environment variables template
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # API utilities
│   │   └── context/     # React context
│   ├── Dockerfile       # Frontend container config
│   ├── nginx.conf       # Nginx configuration
│   └── .env.example     # Environment variables template
├── scripts/             # Deployment scripts
├── docker-compose.yml   # Docker Compose configuration
└── DEPLOYMENT.md        # Detailed deployment guide
```

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting (100 requests/15min in production)
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ Environment variable validation
- ✅ SQL injection protection (via Supabase)

## 📊 API Endpoints

### Health Check
```
GET /health
```

### Register Vehicle
```
POST /api/register
Body: { owner_name, license_plate, contact }
```

### Scan QR Code
```
POST /api/scan
Body: { qr_code, vehicle_id }
```

### Get Parking History
```
GET /api/dashboard/:vehicle_id
```

## 🗄 Database Schema

The application uses Supabase (PostgreSQL) with two main tables:

- **vehicles**: Stores vehicle information
- **parking_sessions**: Stores parking entry/exit records

See `backend/database/schema.sql` for full schema.

## 🚢 Deployment

### Deploy from GitHub 🚀

**Yes! You can deploy directly from GitHub!** See [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) for step-by-step instructions.

**Quick Options:**
- **Easiest**: Vercel (Frontend) + Railway (Backend) - Both have free tiers
- **Simple**: Render - Deploy both in one place
- **Fast**: Netlify (Frontend) + Fly.io (Backend)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

1. **Docker Compose** (Recommended)
   ```bash
   docker-compose up -d
   ```

2. **Manual Deployment**
   - Backend: Use PM2 or similar process manager
   - Frontend: Build and serve with Nginx

3. **Cloud Platforms**
   - Frontend: Vercel, Netlify
   - Backend: Railway, Render, Heroku

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
FRONTEND_URL=https://yourdomain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com
```

## 📝 Development

### Backend
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

## 🧪 Testing

```bash
# Backend health check
curl http://localhost:5000/health

# Test vehicle registration
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"license_plate":"TEST123","owner_name":"Test User"}'
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify Supabase credentials in `.env`
- Check RLS policies in Supabase dashboard
- Ensure tables are created

**CORS Errors**
- Update `FRONTEND_URL` in backend `.env`
- Check browser console for specific errors

**Build Errors**
- Use `npm install --legacy-peer-deps` for frontend
- Clear `node_modules` and reinstall

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review logs: `docker-compose logs`
- Check Supabase dashboard for database issues

---

**Made with ❤️ for smart parking solutions**
