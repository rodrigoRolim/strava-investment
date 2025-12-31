'use client';
import Link from 'next/link';
import { useState } from 'react';

// Ícones customizados
const LocationIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RunningIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const DisplacementInvestmentPage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(500);
  const [estimatedDistance, setEstimatedDistance] = useState(100);
  
  const kmRate = 1.5;
  
  const calculateMonthlyEarnings = () => {
    const earningsPerKm = (investmentAmount * kmRate) / 100;
    const monthlyEarnings = earningsPerKm * estimatedDistance;
    return {
      perKm: earningsPerKm.toFixed(2),
      monthly: monthlyEarnings.toFixed(2),
      roi: ((monthlyEarnings / investmentAmount) * 100).toFixed(1)
    };
  };

  const earnings = calculateMonthlyEarnings();

  const features = [
    {
      icon: <LocationIcon className="w-8 h-8" />,
      title: "Qualquer Deslocamento",
      description: "Corra, caminhe, pedale - cada KM conta igual",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: "Taxa Fixa 1.5%",
      description: "Mesmo rendimento por KM, sem diferenciação",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <ShieldIcon className="w-8 h-8" />,
      title: "Rastreamento Seguro",
      description: "GPS protegido e dados criptografados",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Saque Rápido",
      description: "Receba via PIX em até 2 horas",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const examples = [
    {
      icon: <RunningIcon className="w-10 h-10" />,
      scenario: "Corrida Matinal",
      km: "5KM/dia",
      monthly: "150KM",
      earnings: `R$ ${(parseFloat(earnings.perKm) * 150).toFixed(2)}`
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
      scenario: "Deslocamento Diário",
      km: "10KM/dia",
      monthly: "220KM",
      earnings: `R$ ${(parseFloat(earnings.perKm) * 220).toFixed(2)}`
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      scenario: "Caminhada no Parque",
      km: "3KM/dia",
      monthly: "90KM",
      earnings: `R$ ${(parseFloat(earnings.perKm) * 90).toFixed(2)}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      
      {/* Hero Section com Foto */}
      <div className="relative h-screen min-h-[800px] overflow-hidden">
        {/* Imagem de fundo - mulher correndo */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
        </div>
        
        {/* Conteúdo sobreposto */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full mb-6">
                <ZapIcon className="w-4 h-4 mr-2" />
                <span>Rendimento por Deslocamento</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-linear-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Cada Passada
                </span>
                <br />
                <span className="text-white">Vale </span>
                <span className="bg-linear-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Dinheiro
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Como essa corredora, transforme cada quilômetro percorrido em rendimento. 
                Taxa fixa de 1.5% por KM - não importa como você se move.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/login" className="block w-full cursor-pointer group relative px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="w-full absolute inset-0 bg-linear-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative font-bold text-lg flex items-center justify-center">
                    <ZapIcon className="w-5 h-5 mr-2" />
                    Começar Agora
                  </span>
                </Link>
              </div>

              {/* Stats na Hero */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange-400">1.5%</div>
                  <div className="text-sm text-gray-300">por KM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-400">R$ {earnings.perKm}</div>
                  <div className="text-sm text-gray-300">por KM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">10K+</div>
                  <div className="text-sm text-gray-300">Atletas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">R$ 8.2M</div>
                  <div className="text-sm text-gray-300">Distribuídos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Princípio Simples */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Desloque-se. Ganhe. Repita.
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Uma taxa única de 1.5% por KM. Sem diferenciação. Sem complexidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {[
              {
                icon: <LocationIcon className="w-16 h-16" />,
                title: "Você se Desloca",
                description: "De qualquer forma que preferir"
              },
              {
                icon: (
                  <div className="relative">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <div className="text-4xl font-bold text-orange-400">1.5%</div>
                    </div>
                  </div>
                ),
                title: "Por Cada KM",
                description: "Taxa fixa do seu investimento"
              },
              {
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Você Ganha",
                description: "Rendimento proporcional"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-6 p-4 border border-gray-700">
                  <div className="text-orange-400">{item.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculadora */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Calcule seus ganhos
            </span>
          </h2>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Controles */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xl font-bold flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Seu Investimento
                    </label>
                    <span className="text-2xl font-bold text-orange-400">
                      R$ {investmentAmount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-orange-500 [&::-webkit-slider-thumb]:to-red-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xl font-bold flex items-center">
                      <LocationIcon className="w-5 h-5 mr-2 text-green-400" />
                      KM por Mês
                    </label>
                    <span className="text-2xl font-bold text-green-400">
                      {estimatedDistance} KM
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={estimatedDistance}
                    onChange={(e) => setEstimatedDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-green-500 [&::-webkit-slider-thumb]:to-emerald-500"
                  />
                </div>

                <div className="p-4 bg-linear-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                    <div>
                      <div className="font-bold text-white">Taxa Fixa: 1.5% por KM</div>
                      <div className="text-sm text-gray-400">
                        Mesma taxa para qualquer tipo de deslocamento
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
                  <div className="text-gray-400 mb-3 flex items-center justify-center">
                    <LocationIcon className="w-5 h-5 mr-2" />
                    Ganho por KM
                  </div>
                  <div className="text-5xl font-bold text-cyan-400 mb-2">
                    R$ {earnings.perKm}
                  </div>
                  <div className="text-gray-500">
                    Por cada quilômetro percorrido
                  </div>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
                  <div className="text-gray-400 mb-3 flex items-center justify-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2" />
                    Ganho Mensal
                  </div>
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    R$ {earnings.monthly}
                  </div>
                  <div className="text-gray-500">
                    Em {estimatedDistance}KM ({earnings.roi}% retorno)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Features */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Por que o destrava?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`z-10 absolute inset-0 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative bg-linear-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-r ${feature.color} bg-opacity-20 rounded-xl mb-6`}>
                    <div className={`${feature.color.includes('orange') ? 'text-orange-400' : 
                                      feature.color.includes('blue') ? 'text-blue-400' :
                                      feature.color.includes('green') ? 'text-green-400' : 'text-purple-400'}`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-md font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-linear-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full mb-2">
            <ZapIcon className="w-5 h-5 mr-2" />
            <span>Comece com apenas R$ 50</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-8">
            <br />
            <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Transforme </span>
            seu
            <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"> Movimento </span>
            em
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Renda</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Cada quilômetro percorrido é uma oportunidade de rendimento. Comece hoje e veja seu investimento crescer junto com seu movimento.
          </p>
          
          <Link href="/login" className="block group relative px-12 py-6 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative font-bold text-2xl flex items-center justify-center">
              <ZapIcon className="w-6 h-6 mr-3" />
              Começar Agora
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplacementInvestmentPage;