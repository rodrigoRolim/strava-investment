import { create } from 'zustand'

type Stats = {
  distance: number
  duration: number
  calories: number
  earned: number
}
type InvestmentState = {
  pixAmount: number
  investmentPlans: any[]
  selectedPlan: string
  totalInvested: number
  totalEarned: number
  activeSession: boolean
  isConnected: boolean
  sessionStats: Stats
  pixAmountSelected: number
}

type InvestmentAction = {
  setTotalInvested: (amount: number) => void
  setTotalEarned: (amoun: number) => void,
  setActiveSession: (sessionActive: boolean) => void
  setSessionStats: (stats: Stats) => void
  setPixAmount: (amount: number) => void
  setPixAmountSelected: (amount: number) => void
}

export const useInvestmentStore = create<InvestmentState & InvestmentAction>((set) => ({
  pixAmount: 20,
  investmentPlans: [],
  selectedPlan: 'basic',
  isConnected: false,
  totalEarned: 0,
  activeSession: false,
  totalInvested: 0,
  sessionStats: {
    distance: 0,
    duration: 0,
    calories: 0,
    earned: 0,
  },
  pixAmountSelected: 0,

  setPixAmountSelected: (amount) => set({ pixAmountSelected: amount }),
  setPixAmount: (amount) => set({ pixAmount: amount }),
  setTotalInvested: (amount) => set({ totalInvested: amount }),
  setTotalEarned: (amount) => set({ totalEarned: amount }),
  setActiveSession: (sessionActive) => set({ activeSession: sessionActive }),
  setSessionStats: (stats) => set({ sessionStats: stats })
}))