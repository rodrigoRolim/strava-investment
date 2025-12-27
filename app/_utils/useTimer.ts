import { useCallback, useState } from "react";

export default function useTimer() {
  const [time, setTime] = useState<number>(0)
  const [stopwatch, setStopwatch] = useState('00:00')
  let intervalId: NodeJS.Timeout | null = null
  const startTimer = useCallback(() => {
    intervalId = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1
        // setStopwatch(getStopwatch(newTime))
        return newTime
      })
    }, 1_000)
  }, [])
  const endTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    setTime(0)
  }, [])
  const getStopwatch = (timeInSeconds: number) => {
    const timeInMinutes = timeInSeconds / 60
    const minutes = Math.floor(timeInMinutes)
    const seconds = Math.floor((timeInMinutes - minutes) * 60)
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return {
    time,
    stopwatch,
    startTimer,
    endTimer,
    getStopwatch
  }
}