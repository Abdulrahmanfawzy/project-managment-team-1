
import { ArrowUpRight } from 'lucide-react'


export default function StatsCard({ title, value, icon, progressValue, color,backgroundColor ,iconColor}) {

  return (
    <div className="p-4 shadow-sm text-black  space-y-2 rounded-sm  ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className={`rounded-full p-1 ${backgroundColor}`} style={{color:`${iconColor}`}}>{icon}</span>
      </div>
      <div className="flex space-x-2 items-center">
        <h2 className="text-2xl font-bold">{value}</h2>
        <ArrowUpRight size={18} strokeWidth={0.75} className="text-green-800" />
        {/* <p className="text-sm text-gray-500">{subValue}</p> */}
      </div>
      <h2 className="text-end">{progressValue}</h2>
      <div className={`w-full ${backgroundColor} rounded-full h-2`}>
        <div className={`${color} h-2 rounded-full w-1/2 `} ></div>
      </div>
    </div>
  )
}

