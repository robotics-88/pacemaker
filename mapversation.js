import { Buffer } from 'node:buffer'
import WebSocket from 'ws'
import rosnodejs from 'rosnodejs'
// import shutdown from './shutdown.js'

const lo = '👀'
const ok = '✅'
const ko = '❌'


export default function(options = {}) {

  let ros = rosnodejs

  // Get environment variables for websocket connection
  let url = options.WEBSOCKET_URL || process.env.WEBSOCKET_URL
  let username = options.DRONE_NAME || process.env.DRONE_NAME
  let password = options.DRONE_PASSWORD || process.env.DRONE_PASSWORD
  
  // Attempt to connect to Puddle websocket
  // with username/password authentication
  let auth = username + ":" + password
  console.log(lo, "connecting to websocket")
  let ws = new WebSocket(url, { auth })

  let topicName = username.replace('-', '_')

  const SUBSCRIPTION_TOPIC = `/${topicName}/to_hello_decco`
  const ADVERTISEMENT_TOPIC = `/${topicName}/to_decco`
  const ROS_STRING_TYPE = `std_msgs/String`

  // Wait for connection from Puddle
  ws.on('open', async function() {
    console.log(ok, "connected to websocket")

    // Create our ROS Node for Decco to connect to
    console.log(lo, "connecting to ROS node", `${topicName}`)
    let node = await ros.initNode(`/${topicName}`)
    console.log(ok, "connected to ROS node", `${topicName}`)

    // Subscriptions: from Decco to Hello Decco
    // Decco should send JSON in the format `{ topic: ~~, gossip: ~~ }`
    let send = message=> {
      ws.send(Buffer.from(message.data))
    }

    let subscriberOptions = { queueSize: 10 }
    console.log(lo, "subscribing to ROS topic", SUBSCRIPTION_TOPIC)
    node.subscribe(SUBSCRIPTION_TOPIC, ROS_STRING_TYPE, send, subscriberOptions)
    console.log(ok, "subscribed to ROS topic", SUBSCRIPTION_TOPIC)

    // Advertisements: from Hello Decco to Decco
    // Hello Decco should send JSON in the format `{ topic: ~~, gossip: ~~ }`
    // TODO: make special "shutdown" topic
    let advertisement = node.advertise(ADVERTISEMENT_TOPIC, ROS_STRING_TYPE)
    //outgoing must be in the format of {data: ~~string~~}
    let receive = message=> {
      console.log(ok, "message recieved from Hello Decco")
      let messageString = message.toString()
      ws.send(JSON.stringify({topic: 'confirmation', gossip: messageString}))
      advertisement.publish({data: messageString})
    }

    ws.on('message', receive)
  })

  // Log Errors
  ws.on('error', error=> { console.error("ERROR:", error.message) })
}