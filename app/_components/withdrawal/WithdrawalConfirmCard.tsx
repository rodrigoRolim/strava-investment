import { useCurrency } from "@/app/_hooks/useCurrency";
import { CheckCircleIcon, ClockIcon } from "../icons";
import { withdrawalStore } from "@/app/_store/withdrawal.store";
import { Component } from "lucide-react";
import { MouseEventHandler, SetStateAction } from "react";

interface Events {
  setStep: (value: SetStateAction<number>) => void
  onConfirmWithdrawal: MouseEventHandler<HTMLButtonElement>
}
export default function WithdrawalConfirmCard({ setStep, onConfirmWithdrawal }: Events) {
  const { formatCurrency } = useCurrency()
  const { withdrawalAmount, withdrawalMethod, feeAmount, netAmount } = withdrawalStore()
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
          <CheckCircleIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pronto para sacar!</h2>
        <p className="text-gray-600">Confirme os dados do seu saque</p>
      </div>

      {/* Detalhes do saque */}
      <div className="space-y-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(Number(withdrawalAmount))}</div>
            <div className="text-gray-600">Valor do saque</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Método de saque</span>
            <div className="flex items-center">
              <Component />
              <span className="ml-2 font-medium">{withdrawalMethod.name}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Taxa</span>
            <span className={`font-medium ${feeAmount() > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {feeAmount() > 0 ? formatCurrency(feeAmount()) : 'Grátis'}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Valor líquido</span>
            <span className="text-xl font-bold text-green-600">{formatCurrency(Number(netAmount()))}</span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Tempo estimado</span>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span className="font-medium">{withdrawalMethod.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="space-y-4">
        <button
          onClick={onConfirmWithdrawal}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Confirmar Saque
        </button>
        
        <button
          onClick={() => setStep(1)}
          className="w-full py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
        >
          Alterar Dados
        </button>
      </div>
    </div>
  )
}