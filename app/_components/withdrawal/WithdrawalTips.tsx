import { CheckCircleIcon } from "../icons";

export default function WithdrawalTips() {
  return (
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
  )
}