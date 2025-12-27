'use client';

import { DollarSign, Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";
import InvestmentProgress from "./InvestmentProgress";
interface Props {
  totalInvested: number
  totalEarned: number
}
export default function AssetOverviewCard({ totalInvested, totalEarned }: Props) {
  const [showBalance, setShowBalance] = useState(true)
  const toggleBalacenVisibility = () => {
    setShowBalance(showBalance => !showBalance)
  }
  return (
    <>
      <div className="flex flex-col gap-2 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-start mb-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-500 mb-2">Ativos totais</h2>
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-gray-400 mr-2" />
              <span className="text-2xl sm:text4xl font-bold text-gray-900">
                {showBalance ? `R$${(totalInvested + totalEarned).toFixed(2)}` : '••••••••'}
              </span>
              <button 
                onClick={toggleBalacenVisibility}
                className="text-black ml-3 p-1 hover:bg-gray-100 rounded"
              >
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="text-right self-end">
            <div className="flex items-center text-green-600 mb-1">
              <TrendingUp className="w-5 h-5 mr-1" />
              <span className="text-xl font-bold">R${totalEarned.toFixed(2)}</span>
            </div>
            <div className="text-green-600 font-medium">+{(totalEarned / totalInvested * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Renda acumulada</div>
          </div>
        </div>
        <InvestmentProgress totalEarned={totalEarned} totalInvested={totalInvested}/>
      </div>
    </>
  )
}