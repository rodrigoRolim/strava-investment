interface Props {
  totalInvested: number
  totalEarned: number
}

export default function InvestmentProgress({ totalInvested, totalEarned }: Props) {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-black text-sm font-medium">Progresso do investimento</span>
          <span className="text-sm text-gray-500">Alvo: R$5,000</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            style={{ width: `${(totalInvested / 5000) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-black text-sm">Investido: R${totalInvested}</span>
          <span className="text-black text-sm">{((totalInvested / 5000) * 100).toFixed(0)}%</span>
        </div>
      </div>
    </>
  )
}