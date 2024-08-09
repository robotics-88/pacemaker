import rosnodejs from 'rosnodejs'
import getHeartbeat from './factories/getHeartbeat.js'
import getTaskStatus from './factories/getTaskStatus.js'
import getHealthReport from './factories/getHealthReport.js'
import {getAltitudes, setAltitudes} from './factories/getAltitudes.js'
import { flightBuilder, completeFlight, startFlight } from './utils/flightBuilder.js'
import eventGenerator from './utils/eventGenerator.js'




export default function (options = {}){

  

  let ros = rosnodejs

  let username = options.DRONE_NAME || process.env.DRONE_NAME

  let topicName = username.replace('-', '_')

  const SUBSCRIPTION_TOPIC = `/${topicName}/to_decco`
  const ADVERTISEMENT_TOPIC = `/${topicName}/to_hello_decco`
  const ROS_STRING_TYPE = 'std_msgs/String'
  const ONE_SECOND = 1000

 


  let stageData = (topic, gossip) => {
    return {data: JSON.stringify({topic, gossip})}
  }

  let randomizer = Math.floor(Math.random() *3)

  ros.initNode(`/fake_${topicName}`)
    .then(async node => {
      //values to pass to the event generator to simulate tymbal making database updates
      let flightId = null
      let droneId = null,
          executeFlight = false,
          sessionCookie = null

      console.log('hello')
      

      try {
        let auth = process.env.DRONE_NAME + ':' + process.env.DRONE_PASSWORD
        console.log(auth)
        let response = await fetch(process.env.API_BASE_URL+'authenticate-drone', {
          method: 'POST', 
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: process.env.DRONE_NAME,
            secretKey: process.env.DRONE_PASSWORD
          })
        })
        if(response.ok){
          sessionCookie = response.headers.get('set-cookie')
        }
      }
      catch (error) {
        console.log(error)
        ("Log in failed")
      }
      // from Hello Decco
      let receive = message=>{
        let parsedMessage = JSON.parse(message.data)
        if(parsedMessage.topic == 'flight_send'){

          droneId = parsedMessage.gossip.droneId
          flightId = parsedMessage.gossip.id
          
          //start sending flightEvents to database
          executeFlight = true
          startFlight(flightId, sessionCookie)
          setTimeout(() => {
            executeFlight = false
            completeFlight(flightId, sessionCookie)
          }, 30000)
          publishData('flight_confirm', parsedMessage.gossip)
        } 
        if(parsedMessage.topic == 'altitudes') setAltitudes(parsedMessage.gossip)
      } 

      node.subscribe(SUBSCRIPTION_TOPIC, ROS_STRING_TYPE, receive)

      // to Hello Decco
      let publisherOptions = { queueSize: 10 }
      let publisher = node.advertise(ADVERTISEMENT_TOPIC, ROS_STRING_TYPE, publisherOptions)
      
      let publishData = (topic, data)=> {
        publisher.publish(stageData(topic, data))
      }

      let publishMessages = () => {
        publishData('test', 'hello world')
        publishData('decco_heartbeat', getHeartbeat(executeFlight, flightId, sessionCookie))
        publishData('task_status', getTaskStatus())
        publishData('health_report', getHealthReport())
        publishData('altitudes', getAltitudes())
        if(executeFlight) publishData('event', eventGenerator(flightId, droneId, sessionCookie))
      }
      
      setInterval(publishMessages, ONE_SECOND)
    })
}