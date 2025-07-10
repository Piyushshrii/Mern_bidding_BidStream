# ---------- Stage 1: Build ----------
    FROM node:18-alpine AS build

    # Set working directory
    WORKDIR /app
    
    # Copy package and lock files
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy source files
    COPY . .
    
    # Copy the .env.docker as .env for Vite build
    COPY .env.docker .env
    
    # Build the frontend
    RUN npm run build
    
    # ---------- Stage 2: Serve static build ----------
    FROM node:18-alpine
    
    # Install serve globally
    RUN npm install -g serve
    
    # Set working directory
    WORKDIR /app
    
    # Copy built frontend files
    COPY --from=build /app/dist ./dist
    
    # Expose Vite default preview port (5173)
    EXPOSE 5173
    
    # Start the static file server
    CMD ["serve", "-s", "dist", "-l", "5173"]
    