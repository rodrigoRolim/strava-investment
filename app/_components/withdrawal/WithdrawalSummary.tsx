import { useCurrency } from "@/app/_hooks/useCurrency"
import { withdrawalStore } from "@/app/_store/withdrawal.store"
import { ClockIcon } from "../icons"

export default function WithdrawalSummary() {
  const { withdrawalAmount, withdrawalMethod, feeAmount, netAmount } = withdrawalStore()
  const { formatCurrency } = useCurrency()
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Saque</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="text-gray-600">Valor do saque</span>
          <span className="font-medium">
            {withdrawalAmount ? formatCurrency(Number(withdrawalAmount)) : 'R$ 0,00'}
          </span>
        </div>
        
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="text-gray-600">Taxa</span>
          <span className={`font-medium ${feeAmount() > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {feeAmount() > 0 ? formatCurrency(feeAmount()) : 'Grátis'}
          </span>
        </div>
        
        <div className="flex justify-between py-3">
          <span className="text-lg font-bold text-gray-900">Valor líquido</span>
          <span className="text-2xl font-bold text-green-600">
            {withdrawalAmount ? formatCurrency(Number(netAmount)) : 'R$ 0,00'}
          </span>
        </div>
      </div>

      {/* Estimativa de tempo */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
        <div className="flex items-center mb-2">
          <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-900">Tempo estimado</span>
        </div>
        <div className="text-sm text-gray-700">
          {withdrawalMethod?.time || 'Selecione um método'}
        </div>
      </div>
    </div>
  )
}