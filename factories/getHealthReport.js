let counter = 0

let getHealthReport = () => (
    {
        healthIndicators: [
            { name: "systemOn", label: "System Status", isHealthy: true },
            { name: "propsOn", label: "Propeller Status", isHealthy: true},
            { name: "archiveOn", label: "System Archive Status", isHealthy: true},
            { name: "cameraOn", label: "Camera Status", isHealthy: (++counter % 4) <= 1 }
        ]
    }
)

export default getHealthReport
