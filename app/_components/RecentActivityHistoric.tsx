import { Bike, Flame } from "lucide-react";
import { Running, Walking } from "./icons";
type Activity = { date: string; type: string; distance: string; duration: string; earned: number; exercises: string; }
interface Props {
  recentActivities: Activity[]
}
export default function RecentActivityHistoric({ recentActivities }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Registro de atividades</h2>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg mr-4">
                {activity.type === 'correndo' ? <Running className="w-5 h-5" /> :
                  activity.type === 'Ciclismo' ? <Bike className="w-5 h-5" /> :
                  activity.type === 'andando' ? <Walking className="w-5 h-5" /> :
                  <Flame className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-medium">{activity.type}</div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">R$ {activity.earned.toFixed(2)}</div>
              <div className="text-sm text-gray-500">
                {activity.distance || activity.exercises} · {activity.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}