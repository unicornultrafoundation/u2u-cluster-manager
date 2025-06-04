import React from 'react';
import StatSection from './StatSection';

const ClusterDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-white mb-6">Cluster Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 text-card-foreground">
            <h3 className="text-lg font-semibold mb-2">Active Clusters</h3>
            <p className="text-3xl font-bold text-emerald-400">12</p>
          </div>
          <div className="bg-card rounded-lg p-6 text-card-foreground">
            <h3 className="text-lg font-semibold mb-2">Total Nodes</h3>
            <p className="text-3xl font-bold text-violet-400">48</p>
          </div>
          <div className="bg-card rounded-lg p-6 text-card-foreground">
            <h3 className="text-lg font-semibold mb-2">Network Status</h3>
            <p className="text-lg font-semibold text-green-400">Online</p>
          </div>
        </div> */}
        <StatSection />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-card rounded-lg p-6 text-card-foreground">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Cluster-001 deployed</span>
                <span className="text-neutral-400 text-sm">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Node health check completed</span>
                <span className="text-neutral-400 text-sm">4 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Network upgrade completed</span>
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