# -------- Base Stage --------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install 'serve' globally (used in npm start)
RUN npm install -g serve

# Copy the rest of the source files and the Docker-specific .env
COPY . .
COPY .env.docker .env

# Build the app
RUN npm run build

# Expose the production port
EXPOSE 5173

# Start the app
CMD ["npm", "start"]