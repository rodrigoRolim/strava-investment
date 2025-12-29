'use client';

import { QrCode, Send, Play } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useInvestmentStore } from "../_store/investment.store";


export default function ActivityControlPanel() {
  const [isConnected, setIsConnected] = useState(true);
  const {
    pixAmount,
    totalInvested,
    setPixAmount,
    setTotalInvested,
  } = useInvestmentStore()
 
  const calculatePotentialEarnings = (amount: number) => {
    // const plan = investmentPlans.find((p: any) => p.id === selectedPlan);
    const baseRate = 0.02;
    return (baseRate * (amount + totalInvested)).toFixed(2);
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Ganhe dinheiro com exercícios</h2>
        {/* <div className="flex items-center">
          <Battery className="w-5 h-5 text-green-500 mr-1" />
          <span className="text-sm">GPS Sinal forte</span>
        </div> */}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* Valor do investimento选择 */}
        <div className="space-y-6 gap-4">
          <h3 className="font-medium text-gray-700">Valor do investimento (PIX)</h3>
          <div className="flex flex-wrap gap-2">
            {[20, 50, 100, 200, 500, 1000].map(amount => (
              <button
                key={amount}
                onClick={() => setPixAmount(amount)}
                className={`min-w-32 max-[360px]:w-full  p-3 rounded-xl border-2 text-left ${pixAmount === amount ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
              >
                <div className="flex flex-col justify-between items-center">
                  <div className="text-lg text-black font-bold">R$ {amount}</div>
                  <div className="text-sm text-gray-500">{`pix de R$${amount}`}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ou digite um valor personalizado
            </label>
            <div className="flex flex-row border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0">
              <span className="px-4 text-2xl font-bold text-gray-400 self-center">R$</span>
              <input
                type="text"
                inputMode="numeric"
                value={pixAmount}
                onChange={(e) => setPixAmount(Number(e.target.value))}
                className="w-full pl-4 pr-4 py-4 text-2xl font-bold border-0 outline-0"
                placeholder="0,00"
              />
            </div>
            {/* <QrCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" /> */}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700">Receita estimada por km</span>
              <span className="text-md font-bold text-green-600">
                R$ {calculatePotentialEarnings(pixAmount)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
             Com base no valor escolhido <span className="font-semibold">R$ {pixAmount}</span> e no seu ativo total <span className="font-semibold">R$ {totalInvested}</span>, você poderá ganhar <span className="font-semibold">R$ {calculatePotentialEarnings(pixAmount)}</span> por km percorrido.
            </div>
          </div>
          <Link
            href="/checkout"
            className="text-sm w-full p-4 bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Gerar código PIX
          </Link>
          <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/distance-tracker"
              className="w-full p-4 bg-linear-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center"
            >
            <Play className="w-6 h-6 mr-2" />
              Começar exercícios
            </Link>
          </div>
        </div>
      </div>

      {/* 运动控制按钮 */}
     
    </div>
  )
}