#!/bin/bash

# Development environment startup script
# Full-stack development environment with PostgreSQL, Redis, and hot reload

set -e

echo "🚀 Starting Development Environment"
echo "===================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. You may want to customize it for your environment."
fi

# Clean up any existing containers and volumes
echo "🧹 Cleaning up existing Docker state..."
docker-compose down -v > /dev/null 2>&1 || true

# Start Docker services
echo "🐳 Starting Docker services (PostgreSQL, Redis, Adminer, Frontend)..."
docker-compose up -d postgres redis adminer frontend

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
while ! docker-compose exec postgres pg_isready -U yard_user -d yard_alchemy > /dev/null 2>&1; do
    sleep 1
done
echo "✅ PostgreSQL is ready"

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
while ! docker-compose exec redis redis-cli ping > /dev/null 2>&1; do
    sleep 1
done
echo "✅ Redis is ready"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID 2>/dev/null || true
    docker-compose down
    echo "✅ All services stopped"
    echo "📋 Backend logs saved to backend.log"
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Start the backend service with production profile
echo "🔧 Starting Spring Boot backend with PostgreSQL..."
cd backend
./gradlew bootRun > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait longer for backend to start with database
echo "⏳ Waiting for backend to initialize (this may take a moment)..."
sleep 15

# Check if backend started successfully
echo "🔍 Checking backend status..."
if curl -s http://localhost:8081/hello > /dev/null 2>&1; then
    echo "✅ Backend is ready and responding"
else
    echo "⚠️  Backend may still be starting up. Check backend.log for details."
fi

echo ""
echo "🎉 Development environment is ready!"
echo "===================================="
echo "🌐 Frontend:      http://localhost:3001"
echo "🔧 Backend API:   http://localhost:8081"
echo "🗄️  Database UI:   http://localhost:8080"
echo "   - Server: postgres"
echo "   - Username: yard_user"
echo "   - Password: yard_password"
echo "   - Database: yard_alchemy"
echo "📊 Redis:         localhost:6379"
echo ""
echo "📋 Logs:"
echo "   - Backend: backend.log"
echo "   - View backend logs: tail -f backend.log"
echo ""
echo "💡 Press Ctrl+C to stop all services"
echo "===================================="

# Keep script running
wait $BACKEND_PID