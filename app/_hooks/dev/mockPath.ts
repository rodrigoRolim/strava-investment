function generatePathMock(
  startLat: number,
  startLon: number,
  totalKm = 1,
  stepMeters = 5
) {
  const path = []
  const metersPerDegree = 111_111
  const totalMeters = totalKm * 1000
  const steps = Math.floor(totalMeters / stepMeters)

  const deltaLat = stepMeters / metersPerDegree

  let lat = startLat
  let lon = startLon

  for (let i = 0; i < steps; i++) {
    path.push({ lat, lon })
    lat += deltaLat
  }

  return path
}
export const mockPath = generatePathMock(
  -23.55052,
  -46.63330,
  1,    // 1 km
  5     // 5 m por ponto
)