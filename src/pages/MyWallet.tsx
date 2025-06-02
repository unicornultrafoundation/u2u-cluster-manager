import React from 'react';

const MyWallet: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">My Wallet</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Overview */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Wallet Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Total Balance</span>
                <span className="text-2xl font-bold text-white">1,234.56 U2U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Available</span>
                <span className="text-lg text-emerald-400">1,200.00 U2U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Staked</span>
                <span className="text-lg text-violet-400">34.56 U2U</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Send
              </button>
              <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Receive
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Stake
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Swap
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-zinc-700">
                <div>
                  <span className="text-white font-medium">Received U2U</span>
                  <p className="text-neutral-400 text-sm">From: 0x1234...5678</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-semibold">+100.00 U2U</span>
                  <p className="text-neutral-400 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-700">
                <div>
                  <span className="text-white font-medium">Staked U2U</span>
                  <p className="text-neutral-400 text-sm">Validator: Node-001</p>
                </div>
                <div className="text-right">
                  <span className="text-orange-400 font-semibold">-50.00 U2U</span>
                  <p className="text-neutral-400 text-sm">1 day ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <span className="text-white font-medium">Sent U2U</span>
                  <p className="text-neutral-400 text-sm">To: 0x9876...5432</p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 font-semibold">-25.00 U2U</span>
                  <p className="text-neutral-400 text-sm">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet; 