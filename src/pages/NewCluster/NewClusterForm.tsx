import ILLUS from '@/assets/new_cluster_page/illus.png'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RiInformationFill } from '@remixicon/react'
import { formSchema } from '.'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

const NewClusterForm = ({form, onSubmit}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  return (
    <div className="flex-1 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Create New Cluster</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="py-8">
          <h1 className="text-2xl font-pixelyze font-normal uppercase tracking-tight text-[#181B1E]">Create New Cluster</h1>
          <img src={ILLUS} alt="Create Cluster Illustration" className="w-28 h-28 mb-2" />
          <p className="text-sm text-[#748382] font-normal mt-1">Powered by DeFio</p>
        </div>
        <form className="space-y-6 py-8 w-full">
          {/* Cluster Name */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">
              Cluster's name
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>The system will automatically assign a random name if this field is left empty</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <Input type="text" placeholder="Enter cluster's name..." className="w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
            <p className="text-xs text-[#748382] mt-1">The system will automatically assign a random name if this field is left empty.</p>
          </div>
          {/* Total CPU Cores */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">Total CPU cores <span className="text-[#EC003F]">*</span>
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Info about CPU cores</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="flex gap-2 items-center">
              <Input type="number" placeholder="Ex: 16" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
              <span className="text-[#929E9D] text-sm">Cores</span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-[#748382]">Available:</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">48 Cores</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 Cores</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">128 Cores</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">256 Cores</span>
            </div>
          </div>
          {/* Total RAM Memory */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">Total RAM memory <span className="text-[#EC003F]">*</span>
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Info about RAM</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="flex gap-2 items-center">
              <Input type="number" placeholder="Ex: 24" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
              <span className="text-[#929E9D] text-sm">GB</span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-[#748382]">Available:</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">16 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">24 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">48 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 GB</span>
            </div>
          </div>
          {/* Total GPU Memory */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">Total GPU memory <span className="text-[#EC003F]">*</span>
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Info about GPU</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="flex gap-2 items-center">
              <Input type="number" placeholder="Ex: 64" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
              <span className="text-[#929E9D] text-sm">GB</span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-[#748382]">Available:</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">96 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">128 GB</span>
              <span className="px-3 py-1 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">256GB</span>
            </div>
          </div>
          {/* Active Time Dropdown */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">Active time <span className="text-[#EC003F]">*</span>
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Info about active time</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <Select>
              <SelectTrigger className="w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                <SelectValue placeholder="Select time..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30m">30 minutes</SelectItem>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="2h">2 hours</SelectItem>
                <SelectItem value="6h">6 hours</SelectItem>
                <SelectItem value="12h">12 hours</SelectItem>
                <SelectItem value="24h">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Type of Workload Dropdown */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 font-semibold text-[#181B1E] text-sm">Type of workload <span className="text-[#EC003F]">*</span>
              <Tooltip>
                <TooltipTrigger>
                  <RiInformationFill className="w-4 h-4 text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Info about type of workload</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <Select>
              <SelectTrigger className="w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml">Machine Learning</SelectItem>
                <SelectItem value="data">Data Processing</SelectItem>
                <SelectItem value="web">Web Hosting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
  )
}

export default NewClusterForm