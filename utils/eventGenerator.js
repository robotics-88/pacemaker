const API_BASE_URL = process.env.API_BASE_URL

let counter = 1

const LOCATIONS = [
  [41.49986746670859, -71.30984355480228],
  [41.50060672293137, -71.30262708265471],
  [41.496171059013854, -71.30301367937689],
  [41.4964836, -71.3080029]
]

export default function eventGenerator(flightId, droneId, sessionCookie) {
  let level = "INFO"
  if(counter % 100 === 0) level = "WARN"
  else if(counter % 25 === 0) level = "ERROR"

  counter += 1
  let message = {
    droneId,
    flightId,
    level,
    location: LOCATIONS[counter % 4],
    type: "TASK_STATUS",
    description: `This is an alert with severity level ${level}`,
    timestamp: Date.now(),
  }

  fetch(API_BASE_URL + '/flight-events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': sessionCookie
    },
    body: JSON.stringify(message)

  })

  return message
}