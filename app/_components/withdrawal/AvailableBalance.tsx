import { useCurrency } from "@/app/_hooks/useCurrency";
import { withdrawalStore } from "@/app/_store/withdrawal.store";

export default function AvailableBalance() {
  const { availableBalance, totalEarned, minimumWithdrawal } = withdrawalStore()
  const { formatCurrency } = useCurrency()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col gap-4 justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-500 mb-2">Disponível para saque</h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <p className="text-4xl font-bold text-gray-900">
              {formatCurrency(availableBalance)}
            </p>
            <p className="w-full ml-0 md:ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              +{formatCurrency(totalEarned)} em atividades
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Saque mínimo</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(minimumWithdrawal)}</p>
        </div>
      </div>
    </div>
  )
}