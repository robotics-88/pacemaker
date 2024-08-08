import fakeheartbeat from './fakeheartbeat.js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Extract necessary environment variables
const DRONE_NAME = process.env.DRONE_NAME

// Create options object
const options = {
  DRONE_NAME,
}

// Run fakeheartbeat
fakeheartbeat(options)
