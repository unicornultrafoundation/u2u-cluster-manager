import React from 'react';
import { RiExternalLinkLine } from '@remixicon/react';

const DePINHub: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold text-white">U2U DePIN Client Hub</h1>
          <RiExternalLinkLine className="w-6 h-6 text-neutral-400" />
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Connected Devices</h3>
            <p className="text-3xl font-bold text-emerald-400">24</p>
            <p className="text-neutral-400 text-sm mt-1">+3 this week</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Computing Power</h3>
            <p className="text-3xl font-bold text-violet-400">2.4 TH/s</p>
            <p className="text-neutral-400 text-sm mt-1">98% uptime</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Earnings</h3>
            <p className="text-3xl font-bold text-yellow-400">156.78 U2U</p>
            <p className="text-neutral-400 text-sm mt-1">This month</p>
          </div>
        </div>

        {/* DePIN Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">Computing Network</h3>
              <p className="text-neutral-400 mb-4">Contribute computing power to the distributed network</p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-semibold">Active</span>
                <RiExternalLinkLine className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">Storage Network</h3>
              <p className="text-neutral-400 mb-4">Provide decentralized storage capacity</p>
              <div className="flex justify-between items-center">
                <span className="text-violet-400 font-semibold">Active</span>
                <RiExternalLinkLine className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">AI Training</h3>
              <p className="text-neutral-400 mb-4">Participate in distributed AI model training</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-semibold">Coming Soon</span>
                <RiExternalLinkLine className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Device Management */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Connected Devices</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-zinc-700">
                <div>
                  <span className="text-white font-medium">Desktop-001</span>
                  <p className="text-neutral-400 text-sm">Intel i7-12700K, RTX 3080</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-semibold">Online</span>
                  <p className="text-neutral-400 text-sm">24.5 U2U earned</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-zinc-700">
                <div>
                  <span className="text-white font-medium">Server-Node-02</span>
                  <p className="text-neutral-400 text-sm">AMD EPYC 7742, 128GB RAM</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-semibold">Online</span>
                  <p className="text-neutral-400 text-sm">89.2 U2U earned</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <span className="text-white font-medium">Laptop-Work</span>
                  <p className="text-neutral-400 text-sm">MacBook Pro M2, 32GB RAM</p>
                </div>
                <div className="text-right">
                  <span className="text-yellow-400 font-semibold">Idle</span>
                  <p className="text-neutral-400 text-sm">43.1 U2U earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DePINHub; 