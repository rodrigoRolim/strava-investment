'use client';

import React, { useState, useEffect } from 'react';
import { PixIcon, RunningIcon } from '../_components/icons';
import { ArrowLeftIcon, CalculatorIcon, CheckCircleIcon, ClockIcon, CopyIcon, CreditCardIcon, MapIcon, ShieldIcon, TargetIcon, ZapIcon } from 'lucide-react';

// Componentes de ícones SVG

const InvestmentCheckout = () => {
  // const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isInvestmentAgreeded, setIsInvestmentAgreeded] = useState(false)
  const [copied, setCopied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [estimatedKm, setEstimatedKm] = useState(100); // KM estimados por mês
  const [investmentAmount, setInvestmentAmount] = useState(500);

  // Taxas por tipo de atividade (por KM)
  const activityRates = {
    running: 0.015, // 1.5% por KM
    cycling: 0.013, // 1.3% por KM
    walking: 0.010, // 1.0% por KM
    gym: 0.008     // 0.8% por KM
  };

  // Dados do investimento baseado em KM
  const investmentData = {
    plan: {
      name: 'Plano Pro - Rendimento por KM',
      description: 'Ganhe conforme você se move',
      activity: 'running',
      rate: activityRates.running,
      features: [
        'Rendimento por quilômetro percorrido',
        'GPS tracking em tempo real',
      ]
    },
    amount: investmentAmount,
    tax: 2.5,
    total: investmentAmount + 2.5,
    pixCode: '00020126370014BR.GOV.BCB.PIX0114+5511999999999520400005303986540512.505802BR5925FITINVEST6009SAO PAULO62070503***6304E2A0',
    expirationTime: '30:00',
    paymentMethods: [
      { id: 'pix', name: 'PIX', icon: <PixIcon />, description: 'Pagamento instantâneo' },
      { id: 'credit', name: 'Cartão', icon: <CreditCardIcon />, description: 'Até 12x' }
    ]
  };

  // Calcular rendimento estimado
  const calculateEarnings = () => {
    const monthlyEarnings = (investmentAmount * activityRates.running * estimatedKm).toFixed(2);
    const roi = ((Number(monthlyEarnings) / investmentAmount) * 100).toFixed(1);
    return {
      monthly: parseFloat(monthlyEarnings),
      roi: parseFloat(roi),
      perKm: (investmentAmount * activityRates.running).toFixed(2)
    };
  };

  const earnings = calculateEarnings();

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(investmentData.pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    if (!agreedToTerms) {
      alert('Você precisa concordar com os termos e condições');
      return;
    }
    setIsInvestmentAgreeded(true)
    // alert(`Pagamento de R$${investmentData.total} processado! Comece a correr para ganhar!`);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Simulação de contador regressivo
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos em segundos
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar para o painel
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Investir</h1>
              <p className="text-sm text-gray-600 mt-2">Invista e ganhe por cada quilômetro percorrido</p>
            </div>
            {/* <div className="flex items-center">
              <ShieldIcon className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">GPS ativo</span>
            </div> */}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Resumo do investimento por KM */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline gap-2 mb-6">
                <h2 className="text-lg font-bold text-gray-900">Seu Investimento Ativo</h2>
                <div className="flex items-center px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs">
                  <RunningIcon className="w-4 h-4 mr-1" />
                  Rendimento por KM
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Card principal */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="flex flex-col justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <div className="text-left">
                        <div className="text-sm text-gray-600">investimento inicial</div>
                        <div className="text-3xl font-bold text-gray-900">{formatCurrency(investmentData.amount)}</div>
                      </div>
                      {/* <div className="font-bold text-gray-900 text-2xl mb-2">{investmentData.plan.name}</div> */}
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-600">{investmentData.plan.description}</p>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{activityRates.running * 100}%</div>
                            <div className="text-sm text-gray-600">por KM (corrida)</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">R${earnings.perKm}</div>
                            <div className="text-sm text-gray-600">rendimento/KM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                   
                  </div>
                </div>

                {/* Calculadora de rendimento */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center mb-4">
                    <CalculatorIcon className="w-5 h-5 text-gray-700 mr-2" />
                    <h3 className="font-bold text-gray-900">Calcule seu rendimento</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">KM por mês estimados</span>
                        <span className="font-bold text-orange-600">{estimatedKm} KM</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        step="10"
                        value={estimatedKm}
                        onChange={(e) => setEstimatedKm(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>10 KM</span>
                        <span>250 KM</span>
                        <span>500 KM</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">+{formatCurrency(earnings.monthly)}</div>
                        <div className="text-sm text-gray-600">por mês</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">+{earnings.roi}%</div>
                        <div className="text-sm text-gray-600">retorno mensal</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(Number(earnings.perKm))}</div>
                        <div className="text-sm text-gray-600">por KM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {investmentData.plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                      <CheckCircleIcon className="w-4 h-4 size-4 text-green-500 mr-2" />
                      <span className="text-black text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
              <div className="flex items-center mb-6">
                <MapIcon className="w-6 h-6 mr-3" />
                <h3 className="text-lg font-bold">Como Funciona</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mr-3 mt-1">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Faça o investimento</div>
                    <div className="text-sm text-gray-300">Escolha o valor via PIX</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mr-3 mt-1">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Conecte o GPS</div>
                    <div className="text-sm text-gray-300">Ative o rastreamento no app</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mr-3 mt-1">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Pratique esportes</div>
                    <div className="text-sm text-gray-300">Corra, pedale, caminhe</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mr-3 mt-1">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-medium">Ganhe por KM</div>
                    <div className="text-sm text-gray-300">Rendimento automático</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center">
                  <ZapIcon className="w-5 h-5 mr-3" />
                  <span className="text-sm">Quanto mais ativo, maior seu rendimento!</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
          
            {/* Resumo financeiro */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pagamento</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Valor do investimento</span>
                  <span className="font-medium">{formatCurrency(investmentData.amount)}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Taxa de ativação</span>
                  <span className="font-medium">{formatCurrency(investmentData.tax)}</span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-lg font-bold text-gray-900">Total a pagar</span>
                  <span className="text-2xl font-bold text-orange-600">{formatCurrency(investmentData.total)}</span>
                </div>
              </div>

              {/* Exemplo de ganhos */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center mb-3">
                  <TargetIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-bold text-gray-900">Exemplo prático</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Se você correr 5KM hoje:</span>
                      <div className="text-xs text-gray-500">(corrida: 1.5% por KM)</div>
                    </div>
                    <div className="font-bold text-green-600">
                      +{formatCurrency(5 * Number(earnings.perKm))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Meta mensal (100KM):</span>
                      <div className="text-xs text-gray-500">misto de atividades</div>
                    </div>
                    <div className="font-bold text-green-600">
                      +{formatCurrency(earnings.monthly)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            {/* Como funciona */}
          </div>
              
          {/* Coluna lateral */}
         
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
          <div className="col-span-2 w-full">
            {/* Termos e botão */}
            { !isInvestmentAgreeded && <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Concordo que os rendimentos serão calculados com base nos quilômetros registrados via GPS. 
                    Confirmo que entendi o funcionamento do sistema de rendimento por atividade física e aceito os{' '}
                    <a href="#" className="text-orange-600 hover:underline">Termos de Uso</a>.
                  </label>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!agreedToTerms}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center ${
                  agreedToTerms
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ZapIcon className="w-6 h-6 mr-2" />
                {`Investir ${formatCurrency(investmentData.total)}`}
              </button>
            </div> }

            {/* Método de pagamento - PIX (focado) */}
            { isInvestmentAgreeded && <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pagamento Rápido com PIX</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                      <img src="/pix.png" height={40} width={40}/>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Pague com PIX e comece agora!</h3>
                    <p className="text-gray-600">Pagamento instantâneo - Ative seu investimento em segundos</p>
                  </div>

                  {/* QR Code */}
                  <div className="mb-6">
                    <div className="bg-white p-8 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <div className="grid grid-cols-9 gap-1 w-72 h-72 mb-6">
                        {/* QR Code visual */}
                        {Array.from({ length: 81 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`bg-gray-900 rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900 mb-1">Escaneie com seu banco</div>
                        <div className="text-sm text-gray-500">Abra o app do seu banco e escaneie o código</div>
                      </div>
                    </div>
                  </div>

                  {/* Código PIX */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">
                        Código PIX (copie e cole)
                      </label>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        Expira em: {formatTime(timeLeft)}
                      </div>
                    </div>
                    <div className="flex">
                      <input defaultValue={investmentData.pixCode} className="flex-1 p-4 w-fit bg-gray-50 rounded-l-lg border border-gray-300 font-mono text-sm overflow-x-auto" />
                      <button
                        onClick={handleCopyPixCode}
                        className="px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-lg hover:opacity-90 transition-opacity flex items-center"
                      >
                        <CopyIcon className="w-4 h-4 mr-2" />
                        {copied ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCheckout;