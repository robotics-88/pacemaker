# Use the official ROS Noetic image from the Docker Hub
FROM ros:noetic-ros-core

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the rest of the project files into the container
COPY . .

# Source the ROS setup.bash file
RUN echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"

# Make the startup script executable
RUN chmod +x start.sh

# Run the startup script when the container launches
CMD ["./start.sh"]