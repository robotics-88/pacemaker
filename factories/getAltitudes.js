let max_altitude = 25
let min_altitude = -5
let default_altitude = 10

let getAltitudes = () => (
  {
    max_altitude,
    min_altitude,
    default_altitude
  }
)

let setAltitudes = (newAltitudes) => {
  max_altitude = newAltitudes.max_altitude
  min_altitude = newAltitudes.min_altitude
  default_altitude = newAltitudes.default_altitude
} 

export {getAltitudes, setAltitudes}
