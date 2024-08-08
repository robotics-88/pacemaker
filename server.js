import express from 'express'
import path from 'path'
import Docker from 'dockerode'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'
import { exec } from 'child_process'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express()
let docker = new Docker()
let startedContainers = new Map()

// Serve static HTML files
app.use(express.static(path.join(__dirname, 'public')))

// Get password based on drone name
function getDronePassword(droneName) {
  return process.env[`DRONE_PASSWORD_${droneName}`]
}

// Function to attach to container logs and stream to console
async function attachToContainerLogs(container) {
  try {
    const logStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });

    logStream.on('data', (data) => {
      console.log(data.toString('utf-8'));
    });

    logStream.on('error', (err) => {
      console.error(`Log stream error: ${err.message}`);
    });

  } catch (err) {
    console.error(`Failed to attach to container logs: ${err.message}`);
  }
}

// Function to clean up ROS nodes
function cleanupRosNodes() {
  exec('rosnode cleanup', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cleaning up ROS nodes: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Error: ${stderr}`)
      return
    }
    console.log(`ROS nodes cleaned up: ${stdout}`)
  })
}

// Start Drone Container
app.post('/start-drone', async (req, res) => {
  
  let droneName = req.query.id
  let dronePassword = getDronePassword(droneName)
  if (!startedContainers.has(droneName)) {
    console.log('start')
    let containerOptions = {
      Image: 'pacemaker:latest',
      Env: [
        `DRONE_NAME=${droneName}`,
        `DRONE_PASSWORD=${dronePassword}`,
        `API_BASE_URL=${process.env.API_BASE_URL}`
      ],
      Cmd: ['./start.sh'],
      HostConfig: {
        NetworkMode: 'host'
      }
    }

    try {
      let container = await docker.createContainer(containerOptions)
      await container.start()
      startedContainers.set(droneName, container.id)
      await attachToContainerLogs(container) // Attach to container logs
      res.json({ message: 'Container started successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
})

// Stop Drone Container
app.post('/stop-drone', async (req, res) => {
  let droneName = req.query.id
  try {
    let containerId = startedContainers.get(droneName)

    if (containerId) {
      let containerInstance = docker.getContainer(containerId)
      await containerInstance.stop()
      await containerInstance.remove()
      startedContainers.delete(droneName)
      cleanupRosNodes()
      res.json({ message: 'Container stopped and removed' })
    } else {
      res.status(404).json({ error: 'Container not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Handle graceful shutdown
async function cleanup() {
  console.log('Cleaning up...')
  for (let [droneName, containerId] of startedContainers) {
    try {
      let containerInstance = docker.getContainer(containerId)
      await containerInstance.stop()
      await containerInstance.remove()
      console.log(`Container ${containerId} for drone ${droneName} stopped and removed`)
    } catch (error) {
      console.error(`Failed to stop and remove container ${containerId} for drone ${droneName}:`, error.message)
    }
  }
  cleanupRosNodes()
  process.exit()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})