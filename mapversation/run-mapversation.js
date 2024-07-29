import mapversation from '@robotics-88/mapversation/mapversation.js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Extract necessary environment variables
const WEBSOCKET_URL = process.env.WEBSOCKET_URL
const DRONE_NAME = 'rosy-maple' //process.env.DRONE_NAME
const DRONE_PASSWORD =  'a72620d6-ec82-4cfe-9aa9-130385d3abfe'//process.env.DRONE_PASSWORD

// Create options object
const options = {
  WEBSOCKET_URL,
  DRONE_NAME,
  DRONE_PASSWORD,
}
console.log(options)

// Run mapversation
mapversation(options)
