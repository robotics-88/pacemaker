/**
 * Just adding the buttons and functionality to the HTML
 */

let droneNames = ['rosy-maple', 'oak-beauty', 'old-lady', 'magpie']

// Function to create HTML for drone controls
function createDroneControls() {
  let dronesDiv = document.getElementById('drones')

  droneNames.forEach(droneName => {
    let droneDiv = document.createElement('div')

    let startButton = document.createElement('button')
    startButton.textContent = 'Start'
    startButton.addEventListener('click', () => startDrone(droneName, startButton))

    let stopButton = document.createElement('button')
    stopButton.textContent = 'Stop'
    stopButton.addEventListener('click', () => stopDrone(droneName))

    let droneNameSpan = document.createElement('span')
    droneNameSpan.textContent = droneName

    droneDiv.appendChild(droneNameSpan)
    droneDiv.appendChild(startButton)
    droneDiv.appendChild(stopButton)

    dronesDiv.appendChild(droneDiv)
  })
}

// Function to start a drone
function startDrone(droneName, button) {
  console.log(`Starting drone: ${droneName}`)
  fetch(`/start-drone?id=${droneName}&interval=${1000}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      button.style.backgroundColor = 'blue'
    })
    .catch(error => {
      console.error(error)
    })
  
}

// Function to stop a drone
function stopDrone(droneName) {
  console.log('calling the fund')
  fetch(`/stop-drone?id=${droneName}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  console.log(`Stopping drone: ${droneName}`)
}

createDroneControls()