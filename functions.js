const MYOCARDIUM_URL = "http://localhost:3000"

// Function to start a drone
export function startDrone(droneName, button) {
  console.log(`Starting drone: ${droneName}`)
  fetch(`${MYOCARDIUM_URL}/start-drone?id=${droneName}&interval=${1000}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  
}

// Function to stop a drone
export function stopDrone(droneName) {
  console.log('calling the fund')
  fetch(`${MYOCARDIUM_URL}/stop-drone?id=${droneName}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  console.log(`Stopping drone: ${droneName}`)
}