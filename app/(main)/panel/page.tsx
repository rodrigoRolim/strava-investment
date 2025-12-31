'use client';

import { useState } from 'react';
import AssetOverviewCard from '../../_components/AssetOverviewCard';
import ActivityControlPanel from '../../_components/ActivityControlPanel';
import HealthData from '../../_components/HealthData';
import FastInvestment from '../../_components/FastInvestment';
import { useInvestmentStore } from '../../_store/investment.store';

const FitnessInvestmentPlatform = () => {
  // const [showBalance, setShowBalance] = useState(true);
  // const [sessionType, setSessionType] = useState('running');
  const { 
    totalInvested, 
    totalEarned, 
  } = useInvestmentStore()

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        
        <AssetOverviewCard 
          totalInvested={totalInvested} 
          totalEarned={totalEarned}
        />
        {/* Painel de Controle Esportivo */}
        <ActivityControlPanel />
        
        {/* 资产概览卡片 */}
      </div>

      {/* 右侧侧边栏 */}
      <div className="space-y-6">
        {/* 健康数据 */}
        <HealthData />
        {/* PIX快速支付 */}
        <FastInvestment />
      </div>
    </main>
  );
};

export default FitnessInvestmentPlatform;