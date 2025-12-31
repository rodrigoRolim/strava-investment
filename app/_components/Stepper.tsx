'use client';

import { useState } from "react";


export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0); 
  const [formData, setFormData] = useState({
    profile: { name: '', gender: '', birthday: '' },
    bodyStats: { height: '', weight: '' },
    goals: { goalType: '', weeklyTarget: '' }
  });


  const steps = [
    { 
      title: 'Crie o seu perfil', 
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md"
                   id="username"
                   value={formData.profile.name}
                   onChange={(e) => handleInputChange('profile', 'name', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
            <select className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.profile.gender}
                    onChange={(e) => handleInputChange('profile', 'gender', Number(e.target.value))}>
              <option value="">selecione o genero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded-md" 
                   value={formData.profile.birthday}
                   onChange={(e) => handleInputChange('profile', 'birthday', Number(e.target.value))} />
          </div>
        </div>
      )
    },
    { 
      title: 'Peso e altura', 
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="height">Altura</label>
            <input id="height" className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="1,65m"
                    inputMode="numeric"
                    value={formData.bodyStats.height}
                    onChange={(e) => handleInputChange('bodyStats', 'height', Number(e.target.value))} />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="weight">Peso</label>
            <input id="weight" className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="60kg"
                    value={formData.bodyStats.weight}
                    onChange={(e) => handleInputChange('bodyStats', 'weight', Number(Number(e.target.value)))} />
          </div>
        </div>
      )
    },
    { 
      title: 'Crie uma senha', 
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de alvo</label>
            <div className="space-y-2">
              {['manter saúde', 'perder peso', 'preparar para competição', 'melhorar desempenho'].map((goal) => (
                <label key={goal} className="flex items-center">
                  <input type="radio" name="goalType" value={goal} 
                         checked={formData.goals.goalType === goal}
                         onChange={(e) => handleInputChange('goals', 'goalType', Number(e.target.value))}
                         className="mr-2" />
                  {goal}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metas semanais (horas)</label>
            <input type="range" min="1" max="20" step="0.5" 
                   className="w-full"
                   value={formData.goals.weeklyTarget}
                   onChange={(e) => handleInputChange('goals', 'weeklyTarget', Number(e.target.value))} />
            <div className="text-center text-gray-600">{formData.goals.weeklyTarget || '0'} horas/sem</div>
          </div>
        </div>
      )
    }
  ];


  const handleInputChange = (section: keyof typeof formData, field: string, value: string | number) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value }
    });
  };


  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log(':', formData);
    alert('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        
        {/* 顶部进度指示器 - 类似Strava的简洁风格 */}
        <div className="px-8 pt-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Junte-se à comunidade esportiva</h1>
            <span className="text-sm font-medium text-gray-500">
              etapa {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="md:flex">
          {/* 左侧步骤列表 - 桌面端显示 */}
          <div className="md:w-1/3 bg-gray-50 p-8 border-r border-gray-200 hidden md:block">
            <div className="space-y-1">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`py-3 px-4 rounded-lg transition-colors cursor-default ${index === currentStep ? 'bg-white shadow-sm border border-gray-200' : ''}`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index <= currentStep ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className={`font-medium ${index === currentStep ? 'text-gray-900' : 'text-gray-600'}`}>
                        {step.title}
                      </div>
                      {index < currentStep && (
                        <div className="text-xs text-green-600 font-medium mt-1">✓ Concluído</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 鼓励性文案 */}
            <div className="mt-12 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-1">Comece sua jornada de fitness</h3>
              <p className="text-sm text-gray-600">Junte-se a milhões de atletas ao redor do mundo para registrar, compartilhar, superar seus próprios limites e ganhar dinheiro.</p>
            </div>
          </div>

          {/* 右侧表单内容区域 */}
          <div className="md:w-2/3 p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h2>
              <p className="text-gray-600">Preencha as informações abaixo para que possamos oferecer uma experiência personalizada.</p>
            </div>

            <div className="mb-10">
              {steps[currentStep].component}
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-medium ${currentStep === 0 ? 'invisible' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Etapa anterior
              </button>

              <button
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
              >
                {currentStep === steps.length - 1 ? 'Concluir registro' : 'Próxima etapa'}
              </button>
            </div>
          </div>
        </div>

        {/* 移动端步骤指示器 */}
        <div className="md:hidden bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-orange-500' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}