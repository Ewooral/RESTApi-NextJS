
# Use the official Node.js image as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or pnpm-lock.yaml to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]