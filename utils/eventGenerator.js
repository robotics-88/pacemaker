const API_BASE_URL = process.env.API_BASE_URL

let counter = 1

const LOCATIONS = [
  [41.49986746670859, -71.30984355480228],
  [41.50060672293137, -71.30262708265471],
  [41.496171059013854, -71.30301367937689],
  [41.4964836, -71.3080029]
]

let flipCoordinates = (latLng) => {
  let [ lat, lng ] = latLng
  return [lng, lat]
}

export default function eventGenerator(flightId, droneId, sessionCookie) {
  let level = "LOW"
  if(counter % 100 === 0) level = "HIGH"
  else if(counter % 25 === 0) level = "MEDIUM"

  counter += 1
  let message = {
    deccoId: 1,
    flightId: 1,
    level,
    location: {
      type: 'Point', 
      coordinates: flipCoordinates(LOCATIONS[counter % 4])
    },
    type: "TASK_STATUS",
    description: `This is an alert with severity level ${level}`,
    startTime: new Date().toISOString(),
  }

  // fetch(API_BASE_URL + 'flight-event', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': sessionCookie
  //   },
  //   body: JSON.stringify(message)
  // })

  return message
}