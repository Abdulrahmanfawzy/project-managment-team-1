import { ArrowUpRight } from 'lucide-react'


export default function StatsCard({ title, value, subValue, icon }) {

  return (
    <div className="p-4 shadow-sm text-black w-80 space-y-2 rounded-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {icon}
        {/* <icon className="text-amber-500 bg-amber-100 rounded-full w-10 h-8" /> */}
      </div>
      <div className="flex space-x-2 items-center">
        <h2 className="text-2xl font-bold">{value}</h2>
        <ArrowUpRight size={18} strokeWidth={0.75} className="text-green-800" />
        <p className="text-sm text-gray-500">{subValue}</p>
      </div>
      <h2 className="text-end">{value}</h2>
      <div className="w-full bg-amber-100 rounded-full ">
        <div className="bg-amber-500  rounded-full w-1/6 h-2.5"></div>
      </div>
    </div>
  )
}
