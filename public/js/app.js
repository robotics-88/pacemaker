/**
 * Just adding the buttons and functionality to the HTML
 */

let droneNames = ['rosy-maple', 'oak-beauty', 'garden-tiger', 'early-grey', 'old-lady', 'magpie']

// Function to create HTML for drone controls
function createDroneControls() {
  let dronesDiv = document.getElementById('drones')

  droneNames.forEach(droneName => {
    let droneDiv = document.createElement('div')

    let startButton = document.createElement('button')
    startButton.textContent = 'Start'
    startButton.addEventListener('click', function () {
      startDrone(droneName, this)
    })

    let stopButton = document.createElement('button')
    stopButton.textContent = 'Stop'
    stopButton.addEventListener('click', function () { 
      stopDrone(droneName, startButton)
    })

    let droneNameSpan = document.createElement('span')
    droneNameSpan.textContent = droneName

    droneDiv.appendChild(droneNameSpan)
    droneDiv.appendChild(startButton)
    droneDiv.appendChild(stopButton)

    dronesDiv.appendChild(droneDiv)
  })
}

// Function to start a drone
function startDrone(droneName, startButton) {
  console.log(`Starting drone: ${droneName}`)
  fetch(`/start-drone?id=${droneName}&interval=${1000}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      startButton.style.backgroundColor = 'lightgreen'
    })
    .catch(error => {
      console.error(error)
    })
  
}

// Function to stop a drone
function stopDrone(droneName, startButton) {
  fetch(`/stop-drone?id=${droneName}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      startButton.style.removeProperty('background-color')
    })
    .catch(error => {
      console.error(error)
    })
  console.log(`Stopping drone: ${droneName}`)
}

createDroneControls()