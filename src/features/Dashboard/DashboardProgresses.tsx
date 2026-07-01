import { ArrowDown } from 'lucide-react'
import React from 'react'
import { progresses } from './Data/DashboardData'
import avatar from "@/assets/Avatar.svg"

export default function DashboardProgresses() {
  return (
       <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm ">
          <div className="flex space-x-3 items-center">
            <h2 className="text-black font-bold">Teams</h2>
            <h2 className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded">UI/UX <ArrowDown className="w-4 h-4 ml-1" /></h2>
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-400 pb-1">
            <h2>Name</h2>
            <h2>Tasks</h2>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
            {progresses.map((item) => (
              <div className="flex justify-between items-center space-x-2">
                <img src={avatar} className="w-7 h-7 rounded-full shrink-0" alt="avatar" />
                <div className="flex-1 ">
                  <h2 className="text-xs font-medium ">{item.Name}</h2>
                  <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                    <div className={`h-1 bg-blue-800 rounded-full ${item.progress}`}></div>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-700 shrink-0">
                  <p>{item.progressValue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}
