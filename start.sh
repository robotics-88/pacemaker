#!/bin/bash

# Function to handle termination signal
_term() {
  echo "Caught SIGTERM signal!"
  # kill -TERM "$ROSCORE_PID" 2>/dev/null
  kill -TERM "$MAPVERSATION_PID" 2>/dev/null
  kill -TERM "$FAKEHEARTBEAT_PID" 2>/dev/null
  # wait $ROSCORE_PID
  wait $MAPVERSATION_PID
  wait $FAKEHEARTBEAT_PID
  exit 0
}

# Trap the termination signals
trap _term SIGTERM SIGINT

# Source ROS setup
source /opt/ros/noetic/setup.bash

# Start roscore in the background
# roscore &
# ROSCORE_PID=$!
echo Hello!

# Start mapversation (node run-mapversation.js) in the background
node run-mapversation.js &
MAPVERSATION_PID=$!

# Start fake-heartbeat (node run-fakeheartbeat.js) in the background
node run-fakeheartbeat.js &
FAKEHEARTBEAT_PID=$!

# Wait for all background processes to finish
# wait $ROSCORE_PID
wait $MAPVERSATION_PID
wait $FAKEHEARTBEAT_PID