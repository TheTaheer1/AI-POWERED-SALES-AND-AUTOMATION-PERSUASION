# Stage 1: Build the frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# We skip type checking during build to avoid strict TS errors
RUN npm run build

# Stage 2: Build the backend and serve the app
FROM python:3.10-slim
WORKDIR /app

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend from Stage 1 into the "static" directory
COPY --from=frontend-builder /app/frontend/dist /app/static

# Expose port (Cloud Run sets PORT, usually 8080)
ENV PORT=8080
EXPOSE $PORT

# Command to run the application
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
