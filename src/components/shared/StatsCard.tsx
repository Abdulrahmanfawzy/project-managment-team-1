
import { ArrowUpRight } from 'lucide-react'


export default function StatsCard({ title, value, subValue, icon, progressValue, color,backgroundColor ,iconColor}) {

  return (
    <div className="p-4 shadow-sm text-black w-80 space-y-2 rounded-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className={`${backgroundColor} ` } style={{color:`${iconColor}`}}>{icon}</span>
        {/* <icon className="text-amber-500 bg-amber-100 rounded-full w-10 h-8" /> */}
      </div>
      <div className="flex space-x-2 items-center">
        <h2 className="text-2xl font-bold">{value}</h2>
        <ArrowUpRight size={18} strokeWidth={0.75} className="text-green-800" />
        <p className="text-sm text-gray-500">{subValue}</p>
      </div>
      <h2 className="text-end">{progressValue}</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className={`${color} h-4 rounded-full w-1/2`} ></div>
      </div>
    </div>
  )
}

