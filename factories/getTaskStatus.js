const GOAL_POINTS = [
    [41.50060672293137, -71.30262708265471],
    [41.49986746670859, -71.30984355480228],
    [41.4964836, -71.3080029],
    [41.496171059013854, -71.30301367937689],
]

let counter = 0

let getTaskStatus = (operatorId = null) => (
    {
        flightMode: "RATITUDE",
        goal: {latitude: GOAL_POINTS[counter % 4][0], longitude: GOAL_POINTS[counter % 4][1]},
        taskStatus: ++counter % 2 == 0 ? 'READY' : 'READY',
        operatorId,
        isArmed: true
    }
)

export default getTaskStatus