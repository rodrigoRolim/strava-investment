import { useCurrency } from "@/app/_hooks/useCurrency"
import { withdrawalStore } from "@/app/_store/withdrawal.store"

export default function RecentWithdrawals() {
  const { recentWithdrawals } = withdrawalStore()
  const { formatCurrency } = useCurrency()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Saques Recentes</h2>
        <span className="text-sm text-gray-500">Últimos 30 dias</span>
      </div>
      
      <div className="space-y-4">
        {recentWithdrawals.map((withdrawal, index) => (
          <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{withdrawal.method}</div>
              <div className="text-sm text-gray-500">{withdrawal.date}</div>
            </div>
            <div className="text-right">
              <div className={`font-bold ${withdrawal.color}`}>{formatCurrency(withdrawal.amount)}</div>
              <div className="text-xs text-gray-500 capitalize">{withdrawal.status}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
        Ver histórico completo
      </button>
    </div>
  )
}