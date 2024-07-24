let counter = 1

const LOCATIONS = [
  [41.49986746670859, -71.30984355480228],
  [41.50060672293137, -71.30262708265471],
  [41.496171059013854, -71.30301367937689],
  [41.4964836, -71.3080029]
]

export default function eventGenerator() {
  let level = "INFO"
  if(counter % 100 === 0) level = "WARN"
  else if(counter % 25 === 0) level = "ERROR"

  let flightId = counter % 2 ? 1 : 2

  counter += 1

  return ({
    flightId,
    level,
    location: LOCATIONS[counter % 4],
    type: "TASK_STATUS",
    description: `This is an alert with severity level ${level}`,
    timestamp: Date.now(),
  })
}