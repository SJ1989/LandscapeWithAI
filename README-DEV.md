# Yard Alchemy Designs - Development Setup

This guide will help you set up the complete development environment for the Yard Alchemy Designs platform.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git
- (Optional) Node.js 18+ for local frontend development

### One-Command Startup
```bash
./dev-start.sh
```

This script will:
- Start PostgreSQL, Redis, and Adminer in Docker
- Start the React frontend with hot reload
- Start the Spring Boot backend
- Display all service URLs

## 🏗️ Architecture Overview

```
Frontend (React/Vite)     Backend (Spring Boot)     Database
     ↓                           ↓                      ↓
http://localhost:3001    http://localhost:8081    PostgreSQL:5432
                                                       ↓
                                                  Adminer UI
                                                http://localhost:8080
```

## 🔧 Individual Service Management

### Database Services
```bash
# Start only database services
docker-compose up -d postgres redis adminer

# Stop database services
docker-compose down
```

### Frontend Development
```bash
# Using Docker (recommended)
docker-compose up frontend

# Or locally
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
./gradlew bootRun
```

## 🌐 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3001 | React application with hot reload |
| **Backend API** | http://localhost:8081 | Spring Boot REST API |
| **Database UI** | http://localhost:8080 | Adminer (PostgreSQL web interface) |
| **H2 Console** | http://localhost:8082/h2-console | H2 database console (local profile) |

### Database Connection (Adminer)
- **Server**: `postgres`
- **Username**: `yard_user`
- **Password**: `yard_password`
- **Database**: `yard_alchemy`

## 🔄 Hot Reload Configuration

### Frontend Hot Reload
- **Volume mounting**: `./frontend:/app` maps local files to container
- **Polling enabled**: `CHOKIDAR_USEPOLLING=true` for cross-platform compatibility
- **Node modules**: Cached in anonymous volume for performance

### Backend Hot Reload
- Use Spring Boot DevTools (already configured)
- Changes to Kotlin files trigger automatic restart
- Static resources reload without restart

## 🗄️ Database Profiles

### Production Profile (Default)
- Uses PostgreSQL from Docker
- Flyway migrations enabled
- Full schema with relationships

### Local Profile
```bash
# Start with H2 in-memory database
cd backend
./gradlew bootRun --args='--spring.profiles.active=local'
```

## 📊 Database Schema

The application uses 5 main tables:
- `users` - User accounts (linked to Clerk)
- `images` - Uploaded user images
- `styles` - Pre-defined design styles
- `designs` - User's design projects
- `design_edits` - Design iteration history

## 🛠️ Development Commands

### Docker Commands
```bash
# View logs
docker-compose logs -f [service_name]

# Restart a service
docker-compose restart [service_name]

# Rebuild a service
docker-compose up --build [service_name]

# Clean up
docker-compose down -v  # Removes volumes (data loss!)
```

### Backend Commands
```bash
# Run tests
./gradlew test

# Build JAR
./gradlew build

# Format code
./gradlew ktlintFormat

# Database migration info
./gradlew flywayInfo
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🔍 Troubleshooting

### Port Conflicts
If ports are in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3002:8080"  # Frontend: Change 3001 to 3002
  - "8082:8081"  # Backend: Change 8081 to 8082
```

### Volume Permissions
On Linux/Mac, ensure proper permissions:
```bash
sudo chown -R $USER:$USER frontend/node_modules
```

### Database Issues
- Check container logs: `docker-compose logs postgres`
- Reset database: `docker-compose down -v && docker-compose up -d`
- Use H2 for offline development: `--spring.profiles.active=local`

## 📁 Project Structure

```
yard-alchemy-designs/
├── frontend/           # React/Vite application
├── backend/           # Spring Boot application
├── docker-compose.yml # Development services
├── dev-start.sh      # Development startup script
└── .env.example      # Environment variables template
```

## 🚀 Production Deployment

For production deployment, use separate Docker Compose files:
- `docker-compose.prod.yml` - Production configuration
- Environment-specific `.env` files
- Proper secret management
- Load balancer configuration