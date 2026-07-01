import { Download } from 'lucide-react'
import React from 'react'
import { files } from './Data/DashboardData'
import { Link } from 'react-router-dom'

export default function DashboardFiles() {
    return (
         <div className="lg:col-span-3 space-y-4 rounded-lg h-auto lg:max-h-80 bg-white py-5 px-3 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-black">Recent files</h2>
            <Link to="/projects/alpha/files" className="text-blue-500 text-sm">See All</Link>
          </div>
          {files.map((file) => (
            <div className="flex justify-between items-center space-x-2 border-b border-gray-100 pb-2">
              <img src={file.img} className="w-8 h-8 shrink-0" alt="pdf" />
              <div className="text-xs flex-1 min-w-0">
                <h2 className="truncate font-medium">{file.name}</h2>
                <p className="text-gray-400">By {file.personName} • {file.time}</p>
              </div>
              <Download className="w-4 h-4 text-gray-500 shrink-0 cursor-pointer" />
            </div>
          ))}
        </div>
    )
}
