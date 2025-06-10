import ILLUS from '@/assets/new_cluster_page/illus.png'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RiInformationFill } from '@remixicon/react'
import { formSchema } from '.'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

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
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8 w-full">
            {/* Cluster Name */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cluster's name
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          The system will automatically assign a random name if this field is left empty
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" {...field} /> */}
                      <Input {...field} type="text" placeholder="Enter cluster's name..." className="w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
                    </FormControl>
                    <FormDescription className='text-xs text-[#748382] mt-1'>The system will automatically assign a random name if this field is left empty.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Total CPU Cores */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="cpu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total CPU cores <span className="text-[#EC003F]">*</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>CPU (Central Processing Unit) core is the heart of a computer's processing power. It's a single processing unit within the CPU that can execute instructions and handle tasks independently. Think of it as the actual "brain" that performs calculations and manages the computer's operations.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input {...field} type="number" placeholder="Ex: 16" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
                        <span className="text-[#929E9D] text-sm">Cores</span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-[#748382]">Available:</span>
                        <Button onClick={() => form.setValue("cpu", 48)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">48 Cores</Button>
                        <Button onClick={() => form.setValue("cpu", 64)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 Cores</Button>
                        <Button onClick={() => form.setValue("cpu", 128)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">128 Cores</Button>
                        <Button onClick={() => form.setValue("cpu", 256)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">256 Cores</Button>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Total RAM Memory */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="ram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total RAM memory <span className="text-[#EC003F]">*</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>RAM (Random Access Memory) is the computer's short-term memory where data is stored that the CPU (Central Processing Unit) needs to quickly access while a program is running. Think of it as your computer's workspace for active processes. RAM is volatile, meaning data is lost when the power is turned off.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input {...field} type="number" placeholder="Ex: 24" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
                        <span className="text-[#929E9D] text-sm">GB</span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-[#748382]">Available:</span>
                        <Button onClick={() => form.setValue("ram", 16)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">16 GB</Button>
                        <Button onClick={() => form.setValue("ram", 24)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">24 GB</Button>
                        <Button onClick={() => form.setValue("ram", 48)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">48 GB</Button>
                        <Button onClick={() => form.setValue("ram", 64)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 GB</Button>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Total GPU Memory */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="gpu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total GPU memory <span className="text-[#EC003F]">*</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>GPU memory, also known as Video RAM (VRAM), is a type of memory specifically designed for use within a graphics processing unit (GPU). Unlike regular system RAM, GPU memory is optimized for rapid access and handling large datasets required for graphics rendering, machine learning, and other computationally intensive tasks. </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input {...field} type="number" placeholder="Ex: 64" className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]" />
                        <span className="text-[#929E9D] text-sm">GB</span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-[#748382]">Available:</span>
                        <Button onClick={() => form.setValue("gpu", 64)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">64 GB</Button>
                        <Button onClick={() => form.setValue("gpu", 96)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">96 GB</Button>
                        <Button onClick={() => form.setValue("gpu", 128)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">128 GB</Button>
                        <Button onClick={() => form.setValue("gpu", 256)} size="sm" variant="outline" className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]">256 GB</Button>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Active Time Dropdown */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="activeTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Active time <span className="text-[#EC003F]">*</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Info about active time</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full rounded-none px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Type of Workload Dropdown */}
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="typeOfWorkload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type of workload <span className="text-[#EC003F]">*</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <RiInformationFill className="w-4 h-4 text-neutral-300" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Info about type of workload</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="rounded-none w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ml">Machine Learning</SelectItem>
                          <SelectItem value="data">Data Processing</SelectItem>
                          <SelectItem value="web">Web Hosting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
  )
}

export default NewClusterForm