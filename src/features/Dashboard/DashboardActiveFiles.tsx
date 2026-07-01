import { Backpack } from 'lucide-react'
import React from 'react'
import { Active } from './Data/DashboardData'
import { Link } from 'react-router-dom'


export default function DashboardActiveFiles() {
    return (
        <div className="lg:col-span-3 bg-white h-auto lg:max-h-80 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-black">Active Projects</h2>
                <Link to="/projects" className="text-blue-500 text-sm">See All</Link>
            </div>
            {Active.map((item) => (
                <div className="rounded-sm my-4">
                    <div className="flex space-x-1.5 items-center mb-2">
                        <Backpack className={`${item.backgroundColor} ${item.iconColor} p-1 text-2xl rounded-full w-7 h-7`} />
                        <h2 className="font-medium text-sm">{item.ProjectName}</h2>
                    </div>
                    <div className={`w-full ${item.backgroundColor} rounded-full h-2`}>
                        <div className={`${item.progressColor} h-2 rounded-full w-1/2`}></div>
                    </div>
                    <h2 className="mt-1 text-xs text-gray-500">Task: {item.tasks}</h2>
                </div>
            ))}
        </div>
    )
}