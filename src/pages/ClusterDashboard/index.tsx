import React from 'react';
import StatSection from './StatSection';
import ClusterStatisticSection from './ClusterStatisticSection';
import AllClusterSection from './AllClusterSection';

const ClusterDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto">
        <StatSection />
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <ClusterStatisticSection />
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <AllClusterSection />
        
        {/* <div className="mt-8">
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
        </div> */}
      </div>
    </div>
  );
};

export default ClusterDashboard; 