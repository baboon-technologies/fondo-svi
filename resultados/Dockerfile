FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (need devDependencies for build)
RUN npm ci --include=dev

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5173

# Start the application
CMD ["npm", "start"]
