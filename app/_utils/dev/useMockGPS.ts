type Point = {
  lat: number
  lon: number
  speed?: number
}

export function createMockGeolocation(path: Point[], interval = 100) {
  let index = 0
  let timer: number | null = null

  return {
    start(onSuccess: PositionCallback) {
      timer = window.setInterval(() => {
        if (index >= path.length) return

        const point = path[index]

        onSuccess({
          coords: {
            latitude: point.lat,
            longitude: point.lon,
            accuracy: 5,
            altitude: 0,
            speed: point.speed ?? 1.4
          },
          timestamp: Date.now()
        } as GeolocationPosition)

        index++
      }, interval)
    },

    stop() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }
}