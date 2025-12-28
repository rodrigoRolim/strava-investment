import { MapPin, Download } from 'lucide-react'

export default function ThePanelHeader() {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Strava</h1>
          <p className="text-sm text-gray-600">Ganhe dinheiro com exercícios</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex w-fit items-center px-2 py-2 bg-white rounded-lg shadow-sm">
            <MapPin className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-black text-xs md:text-sm w-full">GPS Conectado</span>
          </div>
        </div>
      </div>
    </header>
  )
}