# Set the base image with the specified Node.js version
ARG NODE_VERSION=23.10.0
FROM node:${NODE_VERSION}-alpine

# Set the environment variable for Node.js to run in production mode
ENV NODE_ENV=production

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies by leveraging Docker's caching
# Use bind mounts to package.json and package-lock.json for faster builds
RUN --platform=linux/arm64 \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Switch to a non-root user for running the application
USER node

# Copy all the application source files into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["node", "index.js"]
