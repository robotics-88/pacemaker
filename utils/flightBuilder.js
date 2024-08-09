let API_BASE_URL = process.env.API_BASE_URL

export function flightBuilder(burnUnit) {
  if(!burnUnit.trips[0].flights.length){
    //calculate the center of the polygon
    let center = calculateCenter(burnUnit.polygon)
    let flightsArray = burnUnit.trips[0].flights
    //create fake flight polygons from each pair of points to the center
    //use a for loop to stop before the last index
    for(let i=0; i < burnUnit.polygon.length-1; i+=1){
      let newFlight = {}
      newFlight.subpolygon = [
        center,
        burnUnit.polygon[i],
        burnUnit.polygon[i + 1]
      ]
      newFlight.status = "NOT_STARTED"
      flightsArray.push(newFlight)
    }
  }
  //return the burnUnit with flights created as soon as synchronous code is done
  return burnUnit
}
  
export function completeFlight(flightId, sessionCookie){
  let updates = {
    endTime: Date.now(),
    status: "COMPLETE"
  }
  fetch(API_BASE_URL + '/flight/'+ flightId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': sessionCookie
    },
    body: JSON.stringify(updates)
  })
}

export function startFlight(flightId, sessionCookie){
  let updates = {
    startTime: Date.now(),
  }
  fetch(API_BASE_URL + '/flight/'+ flightId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': sessionCookie
    },
    body: JSON.stringify(updates)
  })
}

function calculateCenter(points) {
  return [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length
  ]
}