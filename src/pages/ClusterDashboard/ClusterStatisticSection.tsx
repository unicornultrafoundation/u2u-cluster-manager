import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { RiArrowDownSLine } from '@remixicon/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MetricType = 'CPU' | 'RAM' | 'GPU'

interface DataPoint {
  date: string
  value: number
  cores?: number
}

// Sample data - replace with real data later
const sampleData: DataPoint[] = [
  { date: 'May 15', value: 32 },
  { date: 'May 16', value: 40 },
  { date: 'May 17', value: 45, cores: 24 },
  { date: 'May 18', value: 48 },
  { date: 'May 19', value: 38 },
  { date: 'May 20', value: 42 },
  { date: 'May 21', value: 35 },
  { date: 'May 22', value: 28 },
]

const timeRanges = ['Day', 'Week', 'Month', 'Year']

const ClusterStatisticSection: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('CPU')
  const [timeRange, setTimeRange] = useState('Day')

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 md:p-4 shadow-[0px_4px_16px_0px_rgba(25,27,30,0.10)]">
          <p className="text-xs font-semibold tracking-[0.1em] text-neutral-400 uppercase">{label}</p>
          <p className="text-sm md:text-base font-semibold text-zinc-900">
            {payload[0].value} {payload[0].payload.cores ? `Cores` : '%'}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="font-['Pixelyze'] text-lg md:text-xl tracking-[-0.0125em] uppercase text-[#1A1D21]">
        Cluster Statistic
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        {/* Metric Tabs */}
        <div className="bg-white p-1 flex w-full md:w-auto">
          {(['CPU', 'RAM', 'GPU'] as MetricType[]).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`flex-1 md:flex-none md:px-6 py-3 text-sm md:text-base font-semibold transition-colors ${
                selectedMetric === metric
                  ? 'bg-[#EEF0F0] text-[#181B1E]'
                  : 'text-[#748382] hover:text-[#181B1E]'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>

        {/* Time Range Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full md:w-auto px-4 md:px-5 py-2 md:py-3 bg-white inline-flex items-center justify-between gap-2">
            <span className="text-sm md:text-base font-medium text-[#181B1E]">{timeRange}</span>
            <RiArrowDownSLine className="w-5 h-5 md:w-6 md:h-6 text-[#B8C1C0]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] md:w-auto">
            {timeRanges.map((range) => (
              <DropdownMenuItem
                key={range}
                onClick={() => setTimeRange(range)}
                className="text-sm md:text-base font-medium"
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] md:h-[350px] relative pt-6 pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sampleData}
            margin={{ 
              top: 20, 
              right: 20, 
              left: 10, 
              bottom: 20,
              ...window.innerWidth >= 768 && { right: 30, left: 20, bottom: 30 }
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D59EA" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6D59EA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#748382', 
                fontSize: window.innerWidth >= 768 ? 14 : 12 
              }}
              dy={window.innerWidth >= 768 ? 10 : 8}
              tickMargin={window.innerWidth >= 768 ? 16 : 8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#748382', 
                fontSize: window.innerWidth >= 768 ? 14 : 12 
              }}
              dx={window.innerWidth >= 768 ? -10 : -8}
              ticks={[0, 16, 32, 48, 56]}
              tickMargin={window.innerWidth >= 768 ? 16 : 8}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#6D59EA',
                strokeWidth: 1,
                strokeDasharray: '2 2'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6D59EA"
              strokeWidth={1}
              dot={false}
              activeDot={{
                r: window.innerWidth >= 768 ? 6 : 5,
                fill: '#6D59EA',
                stroke: 'rgba(109, 89, 234, 0.1)',
                strokeWidth: window.innerWidth >= 768 ? 5 : 4
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-dashed border-[#D9DEDE]"
              style={{
                top: `${20 + (i * 20)}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClusterStatisticSection 