import { create } from "zustand"

type WithdrawMethodType = { id: string, name: string,  description: string, fee: 0, time: string }
type RecentWithdrawal =  { date: string, method: string, amount: number, status: string, color: string }
interface WithdrawalState {
  availableBalance: number
  totalEarned: number
  minimumWithdrawal: number
  // totalEarned,
  withdrawalMethod: WithdrawMethodType
  withdrawalAmount: number
  recentWithdrawals: RecentWithdrawal[]
  feeAmount: () => number
  netAmount: () => number
  // scheduledDate,
}

interface WithdrawalAction {
  setAvailableBalance: (availableBalance: number) => void
  setMinimumWithdrawal: (minimumWithdrawal: number) =>  void
  // setWithdrawalMethod: (withdrawalMethod: string) => void
  setWithdrawalAmount: (withdrawalAmount: number) => void
}
export const withdrawalStore = create<WithdrawalState & WithdrawalAction>((set, get) => ({
  availableBalance: 0,
  minimumWithdrawal: 20,
  totalEarned: 120,
  recentWithdrawals: [
    { date: 'Hoje, 10:30', method: 'PIX', amount: 150.00, status: 'completed', color: 'text-green-600' },
    { date: 'Ontem, 14:15', method: 'Banco', amount: 300.00, status: 'completed', color: 'text-green-600' },
    { date: '05/11', method: 'PIX', amount: 75.50, status: 'completed', color: 'text-green-600' },
    { date: '01/11', method: 'Carteira', amount: 200.00, status: 'completed', color: 'text-green-600' }
  ],
  withdrawalAmount: 0,
  withdrawalMethod: {
    id: 'pix',
    name: 'PIX',
    description: 'Instantâneo',
    fee: 0,
    time: 'Até 2 horas'
  },

  feeAmount: () => {
    return get().withdrawalMethod.fee
  },

  netAmount: () => {
    const { withdrawalAmount } = get()
    return withdrawalAmount - get().feeAmount()
  },

  setAvailableBalance: (availableBalance) =>
    set({ availableBalance }),

  setMinimumWithdrawal: (minimumWithdrawal) =>
    set({ minimumWithdrawal }),

  setWithdrawalAmount: (withdrawalAmount) =>
    set({ withdrawalAmount }),
}))
