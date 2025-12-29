import { Award, Flame, HeartPulse } from "lucide-react";

export default function HealthData() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
      <div className="flex items-center mb-4">
        <HeartPulse className="w-6 h-6 mr-3" />
        <h3 className="text-xl font-bold">Conquistas</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between mb-1">
          <span>Distância percorrida total</span>
          <span>45.2 km</span>
        </div>

        <div className="flex justify-between mb-1">
          <span>Calorias gasta total</span>
          <span>2,450 cal</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span>dias de exercício contínuo</span>
          <span className="flex items-center">
            <Flame className="w-4 h-4 mr-1" />
            7 Dias
          </span>
        </div>
        
      </div>
      
      <div className="mt-6 p-3 bg-white text-gray-700 bg-opacity-0 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-90">Renda total</div>
            <div className="text-2xl font-bold">R$ 125.80</div>
          </div>
          <Award className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}