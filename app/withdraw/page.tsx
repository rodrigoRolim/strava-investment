'use client'
import { Component,  } from 'lucide-react';
import { useState } from 'react';
import { AlertIcon, WalletIcon, CheckCircleIcon, ClockIcon, ArrowLeftIcon, } from '../_components/icons';

// Componentes de ícones


const WithdrawalScreen = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState('pix');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [step, setStep] = useState(1); // 1: Valor, 2: Confirmação

  // Dados do usuário
  const userData = {
    availableBalance: 875.50,
    totalEarned: 1250.75,
    minimumWithdrawal: 20.00,
    withdrawalMethods: [
      { id: 'pix', name: 'PIX', icon: <Component />, description: 'Instantâneo', fee: 0, time: 'Até 2 horas' },
      // { id: 'bank', name: 'Transferência Bancária', icon: <BankIcon />, description: 'TED/DOC', fee: 1.99, time: '1-2 dias úteis' },
      { id: 'wallet', name: 'Carteira Digital', icon: <WalletIcon />, description: 'PicPay, Mercado Pago', fee: 0.99, time: 'Até 24h' }
    ],
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

  const selectedMethod = userData.withdrawalMethods.find(m => m.id === withdrawalMethod);
  const feeAmount = selectedMethod ? selectedMethod.fee : 0;
  const netAmount = withdrawalAmount ? (parseFloat(withdrawalAmount) - feeAmount).toFixed(2) : '0.00';

  const quickAmounts = [50, 100, 200, 500, userData.availableBalance];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateProgress = (used: number, total: number) => {
    return (used / total) * 100;
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) < userData.minimumWithdrawal) {
      alert(`Valor mínimo para saque: ${formatCurrency(userData.minimumWithdrawal)}`);
      return;
    }

    if (parseFloat(withdrawalAmount) > userData.availableBalance) {
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
                    {selectedMethod?.icon}
                    <span className="ml-2 font-medium">{selectedMethod?.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Taxa</span>
                  <span className={`font-medium ${feeAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {feeAmount > 0 ? formatCurrency(feeAmount) : 'Grátis'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Valor líquido</span>
                  <span className="text-xl font-bold text-green-600">{formatCurrency(Number(netAmount))}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Tempo estimado</span>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="font-medium">{selectedMethod?.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Programar saque (opcional) */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Programar saque (opcional)
                </div>
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min={new Date().toISOString().split('T')[0]}
              />
              {scheduledDate && (
                <div className="mt-2 text-sm text-gray-500">
                  Seu saque será processado em {new Date(scheduledDate).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="space-y-4">
              <button
                onClick={handleConfirmWithdrawal}
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

          {/* Informações de segurança */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center">
              <AlertIcon className="w-5 h-5 text-blue-500 mr-3" />
              <span className="text-sm text-gray-700">
                Após a confirmação, seu saque será processado em até {selectedMethod?.time}. Você receberá uma notificação quando for concluído.
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
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sacar Ganhos</h1>
          <p className="text-gray-600 mt-2">Transfira seus ganhos por atividade física para sua conta</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Saldo disponível */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col gap-4 justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-500 mb-2">Disponível para saque</h2>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatCurrency(userData.availableBalance)}
                    </div>
                    <div className="w-full ml-0 md:ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      +{formatCurrency(userData.totalEarned)} em atividades
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Saque mínimo</div>
                  <div className="text-lg font-bold text-gray-900">{formatCurrency(userData.minimumWithdrawal)}</div>
                </div>
              </div>

              {/* Barra de progresso do limite diário */}
              {/* <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Limite diário de saque</span>
                  <span>{formatCurrency(userData.withdrawalLimits.remainingDaily)} disponíveis</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{ width: `${calculateProgress(
                      userData.withdrawalLimits.daily - userData.withdrawalLimits.remainingDaily,
                      userData.withdrawalLimits.daily
                    )}%` }}
                  />
                </div>
              </div> */}

              {/* Barra de progresso do limite mensal */}
              {/* <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Limite mensal de saque</span>
                  <span>{formatCurrency(userData.withdrawalLimits.remainingMonthly)} disponíveis</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${calculateProgress(
                      userData.withdrawalLimits.monthly - userData.withdrawalLimits.remainingMonthly,
                      userData.withdrawalLimits.monthly
                    )}%` }}
                  />
                </div>
              </div> */}
            </div>

            {/* Valor do saque */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quanto você quer sacar?</h2>
              
              {/* Valores rápidos */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-3">Valores sugeridos</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setWithdrawalAmount(amount.toString())}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        withdrawalAmount === amount.toString()
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-bold text-lg">{formatCurrency(amount)}</div>
                      {amount === userData.availableBalance && (
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
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="w-full pl-4 pr-4 py-4 text-2xl font-bold border-0 outline-0"
                    placeholder="0,00"
                    step="0.01"
                    min={userData.minimumWithdrawal}
                    max={userData.availableBalance}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Mínimo: {formatCurrency(userData.minimumWithdrawal)}</span>
                  <span>Máximo: {formatCurrency(userData.availableBalance)}</span>
                </div>
              </div>
            </div>

            {/* Método de saque */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Para onde você quer receber?</h2>
              
              <div className="space-y-4">
                {userData.withdrawalMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setWithdrawalMethod(method.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      withdrawalMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg mr-4 ${
                          withdrawalMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'
                        }`}>
                          {method.icon}
                        </div>
                        <div>
                          <div className="font-bold">{method.name}</div>
                          <div className="text-xs text-gray-600">{method.description}</div>
                        </div>
                      </div>
                      
                      <div className="text-right w-full">
                        <div className={`font-bold ${method.fee > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {method.fee > 0 ? formatCurrency(method.fee) : 'Grátis'}
                        </div>
                        <div className="text-xs text-gray-500">{method.time}</div>
                      </div>
                    </div>
                    
                    {withdrawalMethod === method.id && (
                      <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="text-sm text-gray-600">
                          {method.id === 'pix' && 'Digite sua chave PIX (CPF, e-mail ou telefone)'}
                          {method.id === 'bank' && 'Configure sua conta bancária para transferência'}
                          {method.id === 'wallet' && 'Conecte com sua carteira digital preferida'}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão de continuar */}
            <button
              onClick={handleWithdrawal}
              disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < userData.minimumWithdrawal}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                withdrawalAmount && parseFloat(withdrawalAmount) >= userData.minimumWithdrawal
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>

          {/* Coluna lateral */}
          <div className="space-y-8">
            
            {/* Resumo do saque */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Saque</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Valor do saque</span>
                  <span className="font-medium">
                    {withdrawalAmount ? formatCurrency(Number(withdrawalAmount)) : 'R$ 0,00'}
                  </span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Taxa</span>
                  <span className={`font-medium ${feeAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {feeAmount > 0 ? formatCurrency(feeAmount) : 'Grátis'}
                  </span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-lg font-bold text-gray-900">Valor líquido</span>
                  <span className="text-2xl font-bold text-green-600">
                    {withdrawalAmount ? formatCurrency(Number(netAmount)) : 'R$ 0,00'}
                  </span>
                </div>
              </div>

              {/* Estimativa de tempo */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center mb-2">
                  <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Tempo estimado</span>
                </div>
                <div className="text-sm text-gray-700">
                  {selectedMethod?.time || 'Selecione um método'}
                </div>
              </div>
            </div>

            {/* Saques recentes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saques Recentes</h2>
                <span className="text-sm text-gray-500">Últimos 30 dias</span>
              </div>
              
              <div className="space-y-4">
                {userData.recentWithdrawals.map((withdrawal, index) => (
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

            {/* Dicas */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Dicas Rápidas</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm">PIX é a opção mais rápida e sem taxas</span>
                </div>
                
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm">Programe saques para datas específicas</span>
                </div>
                
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm">Mantenha uma reserva para continuar investindo</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="text-sm">
                  <span className="font-medium">Precisa de ajuda?</span>
                  <div className="text-gray-400">Entre em contato com nosso suporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalScreen;