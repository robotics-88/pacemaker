import express from 'express'
import path from 'path'
import Docker from 'dockerode'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'

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

// Start Drone Container
app.post('/start-drone', async (req, res) => {
  
    let droneName = req.query.id
    let dronePassword = getDronePassword(droneName)
    if(!startedContainers.has(droneName)){
      let containerOptions = {
          Image: 'pacemaker:latest', 
          Env: [
              `DRONE_NAME=${droneName}`,
              `DRONE_PASSWORD=${dronePassword}`, 
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
        // Find the container by name
        let containerId = startedContainers.get(droneName)
        
        if (containerId) {
          let containerInstance = docker.getContainer(containerId)
          await containerInstance.stop()
          await containerInstance.remove()
          startedContainers.delete(droneName)
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
  process.exit()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})