'use client'
import { Component,  } from 'lucide-react';
import { useState } from 'react';
import { AlertIcon, WalletIcon, CheckCircleIcon, ClockIcon, ArrowLeftIcon, } from '../../_components/icons';
import AvailableBalance from '../../_components/withdrawal/AvailableBalance';
import WithdrawalAmount from '../../_components/withdrawal/WithdrawalAmount';
import WithdrawalMethod from '../../_components/withdrawal/WithdrawalMethod';
import NextStepButton from '../../_components/withdrawal/NextStepButton';
import WithdrawalSummary from '../../_components/withdrawal/WithdrawalSummary';
import RecentWithdrawals from '../../_components/withdrawal/RecentWithdrawals';
import WithdrawalTips from '../../_components/withdrawal/WithdrawalTips';
import WithdrawalConfirmCard from '../../_components/withdrawal/WithdrawalConfirmCard';
import { useCurrency } from '../../_hooks/useCurrency';
import { withdrawalStore } from '../../_store/withdrawal.store';

// Componentes de ícones


const WithdrawalScreen = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [step, setStep] = useState(1); // 1: Valor, 2: Confirmação
  const { withdrawalMethod, minimumWithdrawal, availableBalance } = withdrawalStore()
  const { formatCurrency } = useCurrency()
  // Dados do usuário
  const userData = {
    availableBalance: 875.50,
    totalEarned: 1250.75,
    minimumWithdrawal: 20.00,
    // específico do componente metodos de pagamento
    withdrawalMethods: [
      { id: 'pix', name: 'PIX', icon: <Component />, description: 'Instantâneo', fee: 0, time: 'Até 2 horas' },
      // { id: 'bank', name: 'Transferência Bancária', icon: <BankIcon />, description: 'TED/DOC', fee: 1.99, time: '1-2 dias úteis' },
      { id: 'wallet', name: 'Carteira Digital', icon: <WalletIcon />, description: 'PicPay, Mercado Pago', fee: 0.99, time: 'Até 24h' }
    ],
    // especifico do componente de historico
    recentWithdrawals: [
      { date: 'Hoje, 10:30', method: 'PIX', amount: 150.00, status: 'completed', color: 'text-green-600' },
      { date: 'Ontem, 14:15', method: 'Banco', amount: 300.00, status: 'completed', color: 'text-green-600' },
      { date: '05/11', method: 'PIX', amount: 75.50, status: 'completed', color: 'text-green-600' },
      { date: '01/11', method: 'Carteira', amount: 200.00, status: 'completed', color: 'text-green-600' }
    ],
    withdrawalLimits: {
      daily: 1000,
      monthly: 5000,
      remainingDaily: 850,
      remainingMonthly: 4250
    }
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) < minimumWithdrawal) {
      alert(`Valor mínimo para saque: ${formatCurrency(minimumWithdrawal)}`);
      return;
    }

    if (parseFloat(withdrawalAmount) > availableBalance) {
      alert('Saldo insuficiente para saque');
      return;
    }

    setStep(2);
  };

  const handleConfirmWithdrawal = () => {
    alert(`Saque de ${formatCurrency(Number(withdrawalAmount))} solicitado com sucesso!`);
    // Aqui iria a lógica de API
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Cabeçalho */}
          <div className="mb-8">
            <button onClick={() => setStep(1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Confirmar Saque</h1>
            <p className="text-gray-600 mt-2">Revise os detalhes antes de confirmar</p>
          </div>

          {/* Card de confirmação */}
          <WithdrawalConfirmCard setStep={setStep} onConfirmWithdrawal={handleConfirmWithdrawal}/>

          {/* Informações de segurança */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center">
              <AlertIcon className="w-5 h-5 text-blue-500 mr-3" />
              <span className="text-sm text-gray-700">
                Após a confirmação, seu saque será processado em até {withdrawalMethod.time}. Você receberá uma notificação quando for concluído.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sacar Ganhos</h1>
          <p className="text-gray-600 mt-2">Transfira seus ganhos por atividade física para sua conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Saldo disponível */}
            <AvailableBalance />
  
            {/* Valor do saque */}
            <WithdrawalAmount />

            {/* Método de saque */}
            <WithdrawalMethod />

            {/* Botão de continuar */}
            <NextStepButton onClick={handleWithdrawal} />
          </div>

          {/* Coluna lateral */}
          <div className="space-y-8">
            
            {/* Resumo do saque */}
            <WithdrawalSummary />

            {/* Saques recentes */}
            <RecentWithdrawals />

            {/* Dicas */}
            <WithdrawalTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalScreen;