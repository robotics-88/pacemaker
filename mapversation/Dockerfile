FROM ros:noetic-ros-core

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the .npmrc file to the working directory
COPY .npmrc ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables (optional, can be overridden at runtime)
ENV WEBSOCKET_URL ws://localhost:9000
# ENV DRONE_NAME my-drone
# ENV DRONE_PASSWORD my-password

# Expose the port the app runs on (if applicable, adjust as needed)
# EXPOSE 3000

# Command to run the application
CMD [ "node", "run-mapversation.js" ]