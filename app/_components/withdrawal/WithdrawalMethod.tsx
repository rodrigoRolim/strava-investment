import { Component } from "lucide-react"
import { withdrawalStore } from "@/app/_store/withdrawal.store"
import { useCurrency } from "@/app/_hooks/useCurrency"

export default function WithdrawalMethod() {
  const { withdrawalMethod } = withdrawalStore()
  const { formatCurrency } = useCurrency()
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Para onde você quer receber?</h2>
      
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl border-2 cursor-pointer transition-all border-orange-500 bg-orange-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-lg mr-4 bg-orange-100">
                <Component/>
              </div>
              <div>
                <div className="font-bold">{withdrawalMethod.name}</div>
                <div className="text-xs text-gray-600">{withdrawalMethod.description}</div>
              </div>
            </div>
            
            <div className="text-right w-full">
              <div className={`font-bold ${withdrawalMethod.fee > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {withdrawalMethod.fee > 0 ? formatCurrency(withdrawalMethod.fee) : 'Grátis'}
              </div>
              <div className="text-xs text-gray-500">{withdrawalMethod.time}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">
              {withdrawalMethod.id === 'pix' && 'Digite sua chave PIX (CPF, e-mail ou telefone)'}
              {withdrawalMethod.id === 'bank' && 'Configure sua conta bancária para transferência'}
              {withdrawalMethod.id === 'wallet' && 'Conecte com sua carteira digital preferida'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}