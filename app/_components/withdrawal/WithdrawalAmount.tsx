import { useCurrency } from "@/app/_hooks/useCurrency"
import { withdrawalStore } from "@/app/_store/withdrawal.store"

export default function WithdrawalAmount() {
  const { availableBalance, minimumWithdrawal, withdrawalAmount, setWithdrawalAmount } = withdrawalStore()
  const { formatCurrency } = useCurrency()
  const quickAmounts = [50, 100, 200, 500, availableBalance];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quanto você quer sacar?</h2>
      
      {/* Valores rápidos */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-3">Valores sugeridos</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setWithdrawalAmount(amount)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                withdrawalAmount === amount
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="font-bold text-lg">{formatCurrency(amount)}</div>
              {amount === availableBalance && (
                <div className="text-xs text-green-600 mt-1">Saldo total</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Input personalizado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ou digite um valor personalizado
        </label>
        <div className="flex flex-row border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0">
          <span className="px-4 text-2xl font-bold text-gray-400 self-center">R$</span>
          <input
            type="text"
            inputMode="numeric"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
            className="w-full pl-4 pr-4 py-4 text-2xl font-bold border-0 outline-0"
            placeholder="0,00"
            step="0.01"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Mínimo: {formatCurrency(minimumWithdrawal)}</span>
          <span>Máximo: {formatCurrency(availableBalance)}</span>
        </div>
      </div>
    </div>
  )
}