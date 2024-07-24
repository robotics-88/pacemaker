import rosnodejs from 'rosnodejs'
import getHeartbeat from './factories/getHeartbeat.js'
import getTaskStatus from './factories/getTaskStatus.js'
import getHealthReport from './factories/getHealthReport.js'
import {getAltitudes, setAltitudes} from './factories/getAltitudes.js'
import { flightBuilder, flightCompleter } from './utils/flightBuilder.js'
import eventGenerator from './utils/eventGenerator.js'


let ros = rosnodejs

const SUBSCRIPTION_TOPIC = '/mapversation/to_decco'
const ADVERTISEMENT_TOPIC = '/mapversation/to_hello_decco'
const ROS_STRING_TYPE = 'std_msgs/String'
const ONE_SECOND = 1000


let stageData = (topic, gossip) => {
  return {data: JSON.stringify({topic, gossip})}
}

ros.initNode('/fake_drone')
  .then(node=> {
    console.log('hello')

    // from Hello Decco
    let receive = message=>{
      console.log(message)
      let parsedMessage = JSON.parse(message.data)
      if(parsedMessage.topic == 'burn_unit_send'){
        let updatedFlight = flightBuilder(parsedMessage.gossip)
        //immediately send back burnUnit with flights built out
        publishData('burn_unit_receive', updatedFlight)
        //update completed flight 10 seconds later
        setTimeout(() => publishData('burn_unit_receive', flightCompleter(updatedFlight)), 10000)
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
      publishData('decco_heartbeat', getHeartbeat())
      publishData('task_status', getTaskStatus())
      publishData('health_report', getHealthReport())
      publishData('altitudes', getAltitudes())
      publishData('alert', eventGenerator())
    }
    
    setInterval(publishMessages, ONE_SECOND)
  })