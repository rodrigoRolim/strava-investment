import { Pause, Play } from "lucide-react";
import { useGPS } from "../_hooks/useGPS";
import { useInvestmentStore } from "../_store/investment.store";


export default function MoveControls() {
  const {
    totalInvested,
    pixAmount,
    investmentPlans,
    selectedPlan,
    activeSession,
    isConnected,
    setActiveSession,
    setTotalInvested,
  } = useInvestmentStore()
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
    if (pixAmount < investmentPlans.find((p: any) => p.id === selectedPlan).minAmount) {
      alert(`menor valor do investimento R$${investmentPlans.find((p: any) => p.id === selectedPlan).minAmount}`);
      return;
    }
    setActiveSession(true);
    startTracking()
    // if (isTracking)

    // startTimer()
  };
  const handleEndSession = () => {
    stopTracking()
    setActiveSession(false);
    setTotalInvested(totalInvested + pixAmount);
    // endTimer()
  };
  return (
    <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200">
      {error && (<p className="text-xs sm:textsm md:text-base text-red-800 border-l-4 border-l-red-600 px-4 py-2 bg-red-100">{error}</p>)}
      {!activeSession ? (
        <button
          onClick={handleStartSession}
          className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
          disabled={!isConnected}
        >
          <Play className="w-6 h-6 mr-2" />
          Comecar exercícios
        </button>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-black text-2xl font-bold">{stats.distance.toFixed(2)}</div>
              <div className="text-sm text-gray-500">km</div>
            </div>
            {/* <div>
              <div className="text-black text-2xl font-bold">{stopwatch}</div>
              <div className="text-sm text-gray-500">tempo</div>
            </div> */}
            <div>
              <div className="text-black text-2xl font-bold">{stats.calories}</div>
              <div className="text-sm text-gray-500">calorias</div>
            </div>
            <div>
              <div className="text-black text-2xl font-bold text-green-600">R${stats.earned.toFixed(2)}</div>
              <div className="text-sm text-gray-500">renda</div>
            </div>
          </div>
          <button
            onClick={handleEndSession}
            className="w-full p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
          >
            <Pause className="w-6 h-6 mr-2" />
            Encerrar treino
          </button>
        </div>
      )}
    </div>
  )
}