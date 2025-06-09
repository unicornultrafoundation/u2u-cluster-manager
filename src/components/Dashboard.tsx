import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RiLineChartLine, RiServerLine, RiDatabase2Line, RiErrorWarningLine } from '@remixicon/react'
import useClusterStore from '@/store/clusterStore'
import type { StatCard } from '@/types'

const stats: StatCard[] = [
  { name: 'Total Clusters', value: '12', icon: RiServerLine, color: 'text-blue-600' },
  { name: 'Active Nodes', value: '48', icon: RiDatabase2Line, color: 'text-green-600' },
  { name: 'CPU Usage', value: '72%', icon: RiLineChartLine, color: 'text-orange-600' },
  { name: 'Alerts', value: '3', icon: RiErrorWarningLine, color: 'text-red-600' },
]

const Dashboard: React.FC = () => {
  const { clusters } = useClusterStore()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor and manage your clusters from a single view
        </p>
      </div>

      {/* Stats grid - responsive */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid - responsive */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Cluster Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Cluster Overview</CardTitle>
            <CardDescription>
              Recent cluster activity and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clusters.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No clusters configured yet. Add your first cluster to get started.
                </p>
              ) : (
                clusters.slice(0, 5).map((cluster, index) => (
                  <div key={cluster.id || index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm font-medium">{cluster.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cluster.nodes} nodes
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {cluster.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>
              Current resource utilization across clusters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">CPU</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Memory</span>
                  <span className="text-sm text-muted-foreground">58%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-muted-foreground">41%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '41%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard 