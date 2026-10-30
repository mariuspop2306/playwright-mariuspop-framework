# Use the official Microsoft Playwright image with Node.js on Ubuntu Noble
FROM mcr.microsoft.com/playwright:v1.64.1-noble

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definitions first to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies cleanly
RUN npm ci

# Copy the rest of the project source code into the container
COPY . .

# Default command to run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]