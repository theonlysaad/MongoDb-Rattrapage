FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies with clear output
RUN echo "Installing dependencies..." && \
    npm install --verbose && \
    echo "Dependencies installed successfully!"

# Copy source code
COPY . .

# Verify installation
RUN echo "Verifying installations..." && \
    npm list express mongoose zod @influxdata/influxdb-client dotenv && \
    echo "All dependencies verified!"

EXPOSE 3000

CMD ["npm", "start"]