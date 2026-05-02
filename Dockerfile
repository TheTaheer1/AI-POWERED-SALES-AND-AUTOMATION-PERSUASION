# Use Python base image
FROM python:3.10-slim
WORKDIR /app

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy the pre-built frontend directly from the repo
COPY frontend/dist/ static/

# Expose port (Cloud Run sets PORT, usually 8080)
ENV PORT=8080
EXPOSE $PORT

# Command to run the application
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
