const API_BASE_URL = process.env.API_BASE_URL

const HEADINGS = [90, 180, 270, 0]
const ALTITUDES = [15, 10, 25, 30]
const ORIGINAL_ROUTE_POINTS = [
  [41.49986746670859, -71.30984355480228],
  [41.50060672293137, -71.30262708265471],
  [41.496171059013854, -71.30301367937689],
  [41.4964836, -71.3080029]
  ]

const WEST_SHIFTED_ROUTE_POINTS = [
  [41.49986746670859, -71.31952273753373],
  [41.50060672293137, -71.31230626538616],
  [41.496171059013854, -71.31269286210834],
  [41.4964836, -71.31768208273145]
]

const NORTH_SHIFTED_ROUTE_POINTS = [
  [41.507116745987865, -71.31952273753373],
  [41.50785600221065, -71.31230626538616],
  [41.50342033829313, -71.31269286210834],
  [41.503732879279276, -71.31768208273145]
]

const ALL_ROUTE_POINTS = [ORIGINAL_ROUTE_POINTS, WEST_SHIFTED_ROUTE_POINTS, NORTH_SHIFTED_ROUTE_POINTS]

let counter = 0 

let randomizer = Math.floor(Math.random() *3)


let getHeartbeat = (executeFlight, flightId, sessionCookie) => {

  let randomizer = () => Math.floor(Math.random() *3)
  
  let latitude = ALL_ROUTE_POINTS[randomizer()][randomizer()][0]
  let longitude = ALL_ROUTE_POINTS[randomizer()][randomizer()][1]
  // if(executeFlight){
  //     let timestamp = new Date().toISOString()
  //     fetch(API_BASE_URL + 'flight/add-point/'+ flightId, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Cookie': sessionCookie
  //       },
  //       body: JSON.stringify({
  //         point: [ longitude, latitude, timestamp]
  //       })
  //     })    
  // }


  return (
    {
      heading: HEADINGS[++counter % 4],
      altitude: ALTITUDES[counter % 4],
      latitude,
      longitude
    }
  )
}

export default getHeartbeat
