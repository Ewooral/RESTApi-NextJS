# # Use an official Node.js runtime as the base image
# FROM node:16.14.0-alpine3.14

# # Set the working directory in the Docker container
# WORKDIR /usr/src/

# # Install pnpm
# RUN npm install -g pnpm

# # Copy package.json and pnpm-lock.yaml (if available)
# COPY package.json pnpm-lock.yaml* ./

# # Install dependencies
# RUN pnpm install --frozen-lockfile

# # Copy the rest of your project to the working directory
# COPY . .

# # If you're using TypeScript, compile your code
# RUN pnpm run build

# # Make port 5000 available outside the Docker container
# EXPOSE 3000

# # Start your server when the Docker container is run
# CMD [ "pnpm", "run", "start" ]


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
