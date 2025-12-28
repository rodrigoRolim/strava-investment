'use client';

import { Pause, Play } from "lucide-react";
import { useGPS } from "../_utils/useGPS";
import { useInvestmentStore } from "../_store/investment.store";
import { useCallback } from "react";


export default function DistanceTracker() {
  const { pixAmount, investmentPlans, selectedPlan, activeSession, isConnected, setActiveSession, setTotalInvested } = useInvestmentStore()
  const {
    // currentPosition,
    error,
    stats,
    status,
    startTracking,
    stopTracking,
    // resetTracking,
    isTracking,
    // totalDistance
  } = useGPS()

  const handleStartSession = () => {
    console.log("tola")
    // if (pixAmount < investmentPlans.find((p: any) => p.id === selectedPlan).minAmount) {
    //   alert(`menor valor do investimento R$${investmentPlans.find((p: any) => p.id === selectedPlan).minAmount}`);
    //   return;
    // }
    
    setActiveSession(true);
    console.log(activeSession)
    startTracking()
    // if (isTracking)

    // startTimer()
  };
  const handleEndSession = () => {
    stopTracking()
    setActiveSession(false);
    setTotalInvested(stats.earned + pixAmount);
    // endTimer()
  };
  const StartButton =  useCallback(() => {
    return (
      <button
        onClick={handleStartSession}
        className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
        disabled={isConnected}
      >
        <Play className="w-6 h-6 mr-2" />
        Comecar exercícios
      </button>
    )
  }, [])
  const EndButton = useCallback(() => {
    return (
      <button
        onClick={handleEndSession}
        className="w-full p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
      >
        <Pause className="w-6 h-6 mr-2" />
        Encerrar treino
      </button>
    )
  }, [])
  const ResetButton = () => {}
  return (
    <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200 px-4">
      {error && (<p className="text-xs sm:textsm md:text-base text-red-800 border-l-4 border-l-red-600 px-4 py-2 bg-red-100">{error}</p>)}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
          <div className="rounded-lg bg-gray-50 py-4">
            <div className="text-black text-2xl font-bold">{stats.distance.toFixed(2)}</div>
            <div className="text-sm text-gray-500">km</div>
          </div>
          <div className="rounded-lg bg-gray-50 py-4">
            <div className="text-black text-2xl font-bold">{stats.calories}</div>
            <div className="text-sm text-gray-500">calorias</div>
          </div>
          <div className="rounded-lg bg-gray-50 py-4">
            <div className="text-black text-2xl font-bold text-green-600">R${stats.earned.toFixed(2)}</div>
            <div className="text-sm text-gray-500">renda</div>
          </div>
        </div>
        { activeSession ? (<EndButton />) : (<StartButton />)}
      </div>
   </div>
  )
}