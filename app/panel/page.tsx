'use client';

import { useState } from 'react';
import { Zap, Trophy, } from 'lucide-react';
import { Running } from '../_components/icons';
import ThePanelHeader from '../_components/ThePanelHeader';
import AssetOverviewCard from '../_components/AssetOverviewCard';
import ActivityControlPanel from '../_components/ActivityControlPanel';
import HealthData from '../_components/HealthData';
import FastInvestment from '../_components/FastInvestment';
import { useInvestmentStore } from '../_store/investment.store';

const FitnessInvestmentPlatform = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [sessionType, setSessionType] = useState('running');
  const { 
    selectedPlan, 
    activeSession, 
    sessionStats, 
    pixAmount, 
    totalInvested, 
    totalEarned, 
    isConnected, 
    setActiveSession,
    setSessionStats,
    setPixAmount,
    setTotalInvested,
    setTotalEarned
  } = useInvestmentStore()
  // 模拟投资数据
  const investmentPlans = [
    {
      id: 'basic',
      name: 'Plano básico',
      minAmount: 50,
      maxAmount: 500,
      baseRate: 0.8,
      activityMultiplier: {
        running: 1.5,
        cycling: 1.3,
        walking: 1.0,
        gym: 0.8
      },
      color: 'from-blue-500 to-cyan-500',
      icon: <Running className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: 'Programa Profissional',
      minAmount: 500,
      maxAmount: 2000,
      baseRate: 1.2,
      activityMultiplier: {
        running: 2.0,
        cycling: 1.8,
        walking: 1.3,
        gym: 1.0
      },
      color: 'from-orange-500 to-red-500',
      icon: <Zap className="w-6 h-6" />,
      featured: true
    },
    {
      id: 'elite',
      name: 'Programa de Elite',
      minAmount: 2000,
      maxAmount: 10000,
      baseRate: 1.8,
      activityMultiplier: {
        running: 2.5,
        cycling: 2.2,
        walking: 1.8,
        gym: 1.5
      },
      color: 'from-purple-500 to-pink-500',
      icon: <Trophy className="w-6 h-6" />
    }
  ];
  
  const recentActivities = [
    { date: 'hoje 08:30', type: 'Correndo', distance: '5.2 km', duration: '28:15', earned: 2.85, exercises: 'running' },
    { date: 'ontem18:45', type: 'Ciclismo', distance: '15.7 km', duration: '42:30', earned: 4.12, exercises: 'running' },
    { date: '2 dias atrás', type: 'Andando', distance: '3.1 km', duration: '35:20', earned: 0.95, exercises: 'running' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 顶部导航 */}
        <ThePanelHeader />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 左侧主要面板 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 资产概览卡片 */}
           
            <AssetOverviewCard 
              totalInvested={totalInvested} 
              totalEarned={totalEarned}
            />
            {/* Painel de Controle Esportivo */}
            <ActivityControlPanel 
              pixAmount={pixAmount}
              totalInvested={totalInvested}
              sessionType={sessionType}
              investmentPlans={investmentPlans}
              selectedPlan={selectedPlan}
              activeSession={activeSession}
              sessionStats={sessionStats}
              setPixAmount={setPixAmount}
              setTotalInvested={setTotalInvested}
              setSessionType={setSessionType}
              setActiveSession={setActiveSession}
              setSessionStats={setSessionStats}
              setTotalEarned={setTotalEarned}
            />
          </div>

          {/* 右侧侧边栏 */}
          <div className="space-y-6">
            {/* 健康数据 */}
            <HealthData />
            {/* PIX快速支付 */}
            <FastInvestment />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FitnessInvestmentPlatform;