const HEADINGS = [90, 180, 270, 0]
const ALTITUDES = [15, 10, 25, 30]
const ROUTE_POINTS = [
    [41.49986746670859, -71.30984355480228],
    [41.50060672293137, -71.30262708265471],
    [41.496171059013854, -71.30301367937689],
    [41.4964836, -71.3080029]
  ]

let counter = 0 

let getHeartbeat = () => (
        {
            heading: HEADINGS[++counter % 4],
            altitude: ALTITUDES[counter % 4],
            latitude: ROUTE_POINTS[counter % 4][0],
            longitude: ROUTE_POINTS[counter % 4][1]
        }
    )

export default getHeartbeat
