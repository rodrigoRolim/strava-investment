import { withdrawalStore } from "@/app/_store/withdrawal.store"
import { MouseEventHandler } from "react"

interface Events {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function NextStepButton({ onClick }: Events ) {
  const { withdrawalAmount, minimumWithdrawal } = withdrawalStore()
  return (
    <button
      onClick={onClick}
      disabled={!withdrawalAmount || withdrawalAmount < minimumWithdrawal}
      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
        withdrawalAmount && withdrawalAmount >= minimumWithdrawal
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-[1.02]'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Continuar
    </button>
  )
}