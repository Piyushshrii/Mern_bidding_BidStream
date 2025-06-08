# ---------- Base Stage ----------
FROM node:18

# Set working directory
WORKDIR /app

# Install OS deps for bcrypt
RUN apt-get update && apt-get install -y python3 make g++

# Copy package files only
COPY package*.json ./

# Install dependencies inside Docker (not copied from host)
RUN npm ci

# Copy all other source code
COPY . .

# Copy Docker-specific environment file
COPY .env.docker .env

# Expose backend API port
EXPOSE 5000

# Start backend app
CMD ["node", "server.js"]
