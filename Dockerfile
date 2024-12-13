# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with a lightweight server
FROM nginx:alpine AS production

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8089
EXPOSE 8089

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]