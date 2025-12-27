import { CheckCircle } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
type ActivityMultiplier = {
  running: number
  cycling: number
  walking: number
  gym: number
}
type InvestmentPlan = {
  id: string
  name: string
  minAmount: number
  maxAmount: number
  baseRate: number
  activityMultiplier: ActivityMultiplier
  color: string
  icon: ReactNode
  featured?: boolean
}
interface Props {
  investmentPlans: InvestmentPlan[]
  selectedPlan: string
}
interface Events {
  setSelectedPlan: Dispatch<SetStateAction<string>>
}
export default function InvestmentPlans({ investmentPlans, selectedPlan, setSelectedPlan }: Props & Events) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Plano de Investimento</h2>
      <div className="space-y-4">
        {investmentPlans.map(plan => (
          <div 
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${selectedPlan === plan.id ? 'border-orange-500 shadow-md' : 'border-gray-200 hover:border-orange-300'}`}
          >
            {plan.featured && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.color} text-white mr-3`}>
                  {plan.icon}
                </div>
                <div>
                  <div className="font-bold">{plan.name}</div>
                  <div className="text-sm text-gray-500">
                    R${plan.minAmount} - R${plan.maxAmount}
                  </div>
                </div>
              </div>
              {selectedPlan === plan.id && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">taxa de juros básica</div>
                <div className="text-green-600">{plan.baseRate}%</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">renda correndo</div>
                <div className="text-orange-600">{(plan.baseRate * plan.activityMultiplier.running).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}