import { ref } from 'vue'
import { startDrone, stopDrone } from './functions.js'

export default {
  setup() {
    
    const count = ref(0)
    let droneNames = ['rosy-maple', 'oak-beauty', 'old-lady', 'magpie']
    return { count, droneNames, startDrone, stopDrone }
  },
  template: `
    <div>
      <div>Count is: {{ count }}</div>
      <div v-for="droneName in droneNames" :key="droneName">
        <p>{{ droneName }}</p>
        <button @click="startDrone(droneName)">Start</button>
        <button @click="stopDrone(droneName)">Stop</button>
      </div>
    </div>

    `
}
// import dotenv from 'dotenv'

// // Load environment variables from .env file
// dotenv.config()

// const MYOCARDIUM_URL = process.env.MYOCARDIUM_URL
// /**
//  * Just adding the buttons and functionality to the HTML
//  */

// let droneNames = ['rosy-maple', 'oak-beauty', 'old-lady', 'magpie']

// // Function to create HTML for drone controls
// function createDroneControls() {
//   let dronesDiv = document.getElementById('drones')

//   droneNames.forEach(droneName => {
//     let droneDiv = document.createElement('div')

//     let startButton = document.createElement('button')
//     startButton.textContent = 'Start'
//     startButton.addEventListener('click', () => startDrone(droneName, startButton))

//     let stopButton = document.createElement('button')
//     stopButton.textContent = 'Stop'
//     stopButton.addEventListener('click', () => stopDrone(droneName))

//     let droneNameSpan = document.createElement('span')
//     droneNameSpan.textContent = droneName

//     droneDiv.appendChild(droneNameSpan)
//     droneDiv.appendChild(startButton)
//     droneDiv.appendChild(stopButton)

//     dronesDiv.appendChild(droneDiv)
//   })
// }

// // Function to start a drone
// function startDrone(droneName, button) {
//   console.log(`Starting drone: ${droneName}`)
//   fetch(`${MYOCARDIUM_URL}/start-drone?id=${droneName}&interval=${1000}`, { method: 'POST' })
//     .then(response => response.json())
//     .then(data => {
//       button.style.backgroundColor = 'blue'
//     })
//     .catch(error => {
//       console.error(error)
//     })
  
// }

// // Function to stop a drone
// function stopDrone(droneName) {
//   console.log('calling the fund')
//   fetch(`${MYOCARDIUM_URL}/stop-drone?id=${droneName}`, { method: 'POST' })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.error(error)
//     })
//   console.log(`Stopping drone: ${droneName}`)
// }

// createDroneControls()