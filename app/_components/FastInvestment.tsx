import { AlertCircle, QrCode, Send, Smartphone } from "lucide-react";

export default function FastInvestment() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Smartphone className="w-6 h-6 text-green-500 mr-3" />
        <h3 className="text-lg font-bold text-gray-900">PIX Investimento Rápido</h3>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-green-700">Pagamento instantâneo</div>
              <div className="text-sm text-green-600">24/7 Disponível</div>
            </div>
            <QrCode className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <button className="w-full p-3 bg-gray-900 text-white rounded-lg font-medium flex items-center justify-center">
          <Send className="w-5 h-5 mr-2" />
          Copiar código PIX
        </button>
        
        <div className="text-center text-sm text-gray-500">
          <AlertCircle className="inline w-4 h-4 mr-1" />
          valor mínimo: R$50
        </div>
      </div>
    </div>
  )
}