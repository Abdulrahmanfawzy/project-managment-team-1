import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import profileImage from "@/assets/403ceec35c78c615ac69ab0f402e233b70cc8b5b.jpg";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 shadow-sm text-black">
      <div className="flex items-center justify-between lg:hidden">
        <h1 className="text-2xl font-semibold ">Collabspace</h1>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X  /> : <Menu  />}
        </button>
      </div>

      <div className="hidden lg:flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold">Collabspace</h1>

          <ul className="flex gap-4">
         
            <li className="bg-blue-700 px-4 py-2 rounded-3xl text-white">
              
       
                Dashboard
           
            </li>
            <li className="p-2">Projects</li>
            <li className="p-2">Tasks</li>
            <li className="p-2">Chats</li>
            <li className="p-2">Meetings</li>
            <li className="p-2">Reports</li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none "
            />
          </div>

          <Bell />

          <div className="flex items-center">
            <div>
              <h2>Mohamed Salah</h2>
              <p className="text-gray-600 text-sm text-end">UI/UX</p>
            </div>

            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full ml-2"
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-center gap-4">
          <ul className="flex flex-col items-center gap-3 ">
            <li className="bg-blue-700 px-4 py-2 rounded-3xl text-white">
              Dashboard
            </li>
            <li>Projects</li>
            <li>Tasks</li>
            <li>Chats</li>
            <li>Meetings</li>
            <li>Reports</li>
          </ul>

          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 outline-none"
            />
          </div>

          <Bell />

          <div className="flex flex-col items-center text-center">
            <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full mb-2"/>

            <h2 >Mohamed Salah</h2>
            <p className="text-gray-600 text-sm">UI/UX</p>
          </div>
        </div>
      )}
    </div>
  );
}