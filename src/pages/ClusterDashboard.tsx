import React from 'react';

const ClusterDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Cluster Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Active Clusters</h3>
            <p className="text-3xl font-bold text-emerald-400">12</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Nodes</h3>
            <p className="text-3xl font-bold text-violet-400">48</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Network Status</h3>
            <p className="text-lg font-semibold text-green-400">Online</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Cluster-001 deployed</span>
                <span className="text-neutral-400 text-sm">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Node health check completed</span>
                <span className="text-neutral-400 text-sm">4 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Network upgrade completed</span>
                <span className="text-neutral-400 text-sm">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterDashboard; 