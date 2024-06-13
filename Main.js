import { ref } from 'vue'
import { startDrone, stopDrone } from './actions.js'

export default {
  setup() {
    let droneNames = ref(['rosy-maple', 'oak-beauty', 'old-lady', 'magpie'])
    return { droneNames, startDrone, stopDrone }
  },
  template: `
    <div>
      <div v-for="droneName in droneNames" :key="droneName">
        <p>{{ droneName }}</p>
        <button @click="startDrone(droneName)">Start</button>
        <button @click="stopDrone(droneName)">Stop</button>
      </div>
    </div>`
}
