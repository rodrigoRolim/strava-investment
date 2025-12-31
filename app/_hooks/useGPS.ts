import { useCallback, useEffect, useRef, useState } from "react"
import { mockPath } from "./dev/mockPath"
import { createMockGeolocation } from "./dev/useMockGPS"


type Position = {
  lat: number
  lon: number
  accuracy: number
  altitude: number | null
  speed: number
  timestamp: Date | null
}
type Stats = {
  speed: number
  accuracy: number
  altitude: number
  distance: number
  duration: number
  calories: number
  earned: number
}

const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371000 // Metros
  const toRad = (value: number) => (value * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c) / 1000 // km
}

export function useGPS() {
  
  const isDev = process.env.NODE_ENV === "development"
  const mock = useRef<ReturnType<typeof createMockGeolocation> | null>(null)
  // 🔥 CRÍTICO: Referência para tempo inicial
  const startTimeRef = useRef<number | null>(null)
  const [totalDistance, setTotalDistance] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null) // 🔥 Mudado para null
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats>({
    speed: 0,
    accuracy: 0,
    altitude: 0,
    distance: 0,
    duration: 0,
    earned: 0,
    calories: 0
  })
  const [status, setStatus] = useState<'idle' | 'tracking' | 'error'>('idle')
  
  const watchId = useRef<number | null>(null)
  const lastPoint = useRef<Position | null>(null)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // 🔥 NOVO: Timer para atualizar duração em tempo real
  const updateDuration = useCallback(() => {
    if (!startTimeRef.current) return 0
    
    const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const minutes = Math.floor(elapsedSeconds / 60)
    
    return minutes
  }, [])

  const handlePositionUpdate = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude, accuracy, altitude, speed } = position.coords
    const { timestamp } = position
    
    const newPoint: Position = {
      lat: latitude,
      lon: longitude,
      accuracy: accuracy || 0,
      altitude: altitude || null,
      speed: speed || 0,
      timestamp: new Date(timestamp)
    }

    // 🔥 DEBUG: Log das posições
    console.log('📍 Nova posição:', {
      lat: latitude.toFixed(6),
      lon: longitude.toFixed(6),
      accuracy,
      speed: speed ? (speed * 3.6).toFixed(1) + ' km/h' : 'N/A'
    })

    // Atualizar posição atual
    setCurrentPosition(newPoint)

    // 🔥 CÁLCULO DA DISTÂNCIA: Verificar se temos ponto anterior
    if (lastPoint.current) {
      const distance = calculateHaversineDistance(
        lastPoint.current.lat,
        lastPoint.current.lon,
        latitude,
        longitude
      )
      
      console.log('📏 Distância calculada:', distance.toFixed(4), 'km')

      // 🔥 AJUSTADO: Filtro menos restritivo para movimento real
      // Para movimento indoor, aceitar distâncias menores
      const maxJumpDistance = 0.02 // 🔥 Reduzido para 20 metros (em vez de 100m)
      const minAccuracy = 50      // 🔥 Reduzido para 50 metros de precisão
      
      // Verificar se o movimento é válido
      const isValidMovement = distance > 0.00001 && // Mínimo 1 centímetro
                            distance < maxJumpDistance &&
                            (accuracy === null || accuracy < minAccuracy)
      
      if (isValidMovement) {
        console.log('✅ Movimento válido detectado! Adicionando:', distance.toFixed(4), 'km')
        
        setTotalDistance(prev => {
          const newTotal = prev + distance
          
          // Atualizar estatísticas
          const durationMinutes = updateDuration()
          
          // 🔥 CÁLCULO CORRETO: Atualizar todos os stats juntos
          setStats(prevStats => {
            const newSpeed = speed ? speed * 3.6 : 0.1 // Convert m/s to km/h
            const newCalories = Math.round(durationMinutes * 5) // Exemplo simples
            const newEarned = newTotal * 1.5 // Exemplo: R$1.50 por km
            
            return {
              speed: newSpeed,
              accuracy: accuracy || prevStats.accuracy,
              altitude: altitude || 0,
              distance: parseFloat(newTotal.toFixed(4)), // 🔥 Usar nova distância total
              duration: durationMinutes,
              calories: newCalories,
              earned: parseFloat(newEarned.toFixed(2))
            }
          })
          
          return newTotal
        })
      } else {
        console.log('⚠️ Movimento ignorado:', {
          distance: distance.toFixed(4),
          accuracy,
          isValid: isValidMovement
        })
      }
    } else {
      console.log('📍 Primeiro ponto registrado')
    }

    // Sempre atualizar último ponto para próximo cálculo
    lastPoint.current = newPoint
      
  }, [updateDuration])

  const handleGeolocationError = useCallback((error: GeolocationPositionError) => {
    console.error('❌ Erro de geolocalização:', error)
    
    const errorMessage = {
      [error.PERMISSION_DENIED]: 'Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do navegador.',
      [error.POSITION_UNAVAILABLE]: 'Localização indisponível. Verifique se o GPS está ativo.',
      [error.TIMEOUT]: 'Tempo esgotado ao obter localização. Tente novamente em uma área aberta.'
    }[error.code] || 'Ocorreu um erro desconhecido.'
    
    setError(errorMessage)
    setIsTracking(false)
    setStatus('error')
  }, [])

  const startTracking = useCallback((options = {}) => {
    console.log('Iniciando rastreamento...')
    if (isDev) {
      mock.current = createMockGeolocation(mockPath)
      mock.current.start(handlePositionUpdate)
      return true
    }

    if (isMobile && !navigator.onLine) {
      setError('Você precisa ligar sua internet')
      return false
    }
    
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportado pelo seu browser')
      return false
    }

    // 🔥 CRÍTICO: Iniciar tempo de referência
    startTimeRef.current = Date.now()
    
    const defaultOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10_000
    }

    setIsTracking(true)
    setStatus('tracking')
    setError(null)
    setTotalDistance(0) // 🔥 Resetar distância ao iniciar
    lastPoint.current = null // 🔥 Resetar último ponto
    
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        console.log('📍 Nova posição recebida')
        handlePositionUpdate(position)
      },
      (error) => {
        console.error('❌ Erro no watchPosition:', error)
        handleGeolocationError(error)
      },
      { ...defaultOptions, ...options }
    )

    return true
  }, [handlePositionUpdate, handleGeolocationError])

  const stopTracking = useCallback(() => {
    console.log('Parando rastreamento...')
    if (mock.current) {
      mock.current.stop()
      mock.current = null
    }
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
    
    setIsTracking(false)
    setStatus('idle')
    startTimeRef.current = null
    setError(null)
  }, [])

  const resetTracking = useCallback(() => {
    console.log('Resetando rastreamento...')
    stopTracking()
    setTotalDistance(0)
    setCurrentPosition(null)
    lastPoint.current = null
    startTimeRef.current = null
    setStats({
      speed: 0,
      accuracy: 0,
      altitude: 0,
      distance: 0,
      duration: 0,
      earned: 0,
      calories: 0
    })
  }, [stopTracking])

  // Cleanup
  useEffect(() => {
    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current)
      }
    }
  }, [])

  return {
    isTracking,
    totalDistance: parseFloat(totalDistance.toFixed(4)), // 🔥 Mais casas decimais
    currentPosition,
    error,
    stats,
    status,
    startTracking,
    stopTracking,
    resetTracking
  }
}