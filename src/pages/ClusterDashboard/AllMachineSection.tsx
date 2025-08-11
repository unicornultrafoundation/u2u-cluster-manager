import {useState} from 'react'
import {RiArrowDownSLine, RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine} from '@remixicon/react'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Order} from '@/types/cluster'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {FilterMachineModal} from "@/components/modal/FilterMachineModal.tsx";
import {MachineSortModal} from "@/components/modal/MachineSortModal.tsx";
import GpuIcon from '@/assets/icons/gpu.svg';
import RamIcon from '@/assets/icons/ram.svg';
import CpuIcon from '@/assets/icons/cpu.svg';
import FilterIcon from "@/assets/icons/filter.svg";
import NoDataImg from "@/assets/no_data.png";
import {format} from "date-fns";
import {useMyOrder} from "@/hooks/useMyOrder.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";


export const filterMachineSchema = z.object({
  application: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  createdDate: z.date().optional(),
  expiredDate: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterMachineForm = z.infer<typeof filterMachineSchema>


const AllMachineSection = () => {
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [filters, setFilters] = useState<FilterMachineForm>({});
  
  const screenSize = useScreenSize()
  const form = useForm<FilterMachineForm>({
    mode: "onBlur",
    resolver: zodResolver(filterMachineSchema),
  });
  const selectedApplication = form.watch("application")
  const selectedType = form.watch("type")
  const selectedStatus = form.watch("status")
  const selectedSortBy = form.watch("sortBy")
  const selectedDateCreated = form.watch("createdDate")
  const selectedDateExpired = form.watch("expiredDate")
  
  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600'
      case 'Cancelled':
        return 'text-red-600'
      case 'Created':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }
  
  const onFilter = () => {
    const values = form.getValues();
    setFilters(values);
    setOpenFilter(false);
  };
  
  const handleSelectedSort = (option: string) => {
    if (option === "createdAt") {
      return 'Date';
    }
  };
  
  const [currentPage, setCurrentPage] = useState(1)
  const limit = screenSize === 'mobile' ? 3 : 6;
  
  const { myOrders: machines, isLoading } = useMyOrder({
    page: currentPage,
    limit: limit,
    expiredAt: selectedDateExpired
      ? Math.floor(selectedDateExpired.getTime() / 1000)
      : filters?.expiredDate
        ? Math.floor(filters.expiredDate.getTime() / 1000)
        : undefined,
    createdAt: selectedDateCreated
      ? Math.floor(selectedDateCreated.getTime() / 1000)
      : filters?.createdDate
        ? Math.floor(filters.createdDate.getTime() / 1000)
        : undefined,
    status: selectedStatus || filters.status,
    machineType: selectedType || filters.type,
    orderBy: selectedSortBy ? selectedSortBy : undefined,
    queryKey: 'my-machine',
  });
  
  return (
    <div className="flex flex-col gap-6 ">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tight">All Machines</h2>
        <div className="flex flex-row justify-between w-full gap-4 md:gap-0">
          <div className="hidden md:flex md:flex-row gap-2 w-full desktop:gap-4 flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:max-w-[120px] lg:max-w-[200px]">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4 w-full gap-1 items-center justify-between border-0 rounded-none">
                  {selectedApplication ? selectedApplication : "Applications"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("application", 'U2DPN')}>
                  U2DPN
                </DropdownMenuItem>
                {/* Add more types */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:max-w-[120px] lg:max-w-[200px]">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4  w-full gap-1 items-center justify-between border-0 rounded-none">
                  {selectedType ? selectedType : "All Types"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("type", '')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("type", '1')}>
                  Docker
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("type", '2')}>
                  Kubernetes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("type", '3')}>
                  Kvm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:max-w-[120px] lg:max-w-[200px]">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4  w-full gap-1 items-center justify-between border-0 rounded-none">
                  {selectedStatus ? selectedStatus : "All status"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("status", 'All status')}>
                  All status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Running')}>
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Stopped')}>
                  Stopped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Failed')}>
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
              <PopoverTrigger className="w-full md:max-w-[120px] lg:max-w-[200px]" asChild>
                <Button
                  variant="outline"
                  className="py-2 px-2 lg:px-4  gap-1 desktop:w-full items-center justify-between font-normal border-0"
                >
                  {selectedDateCreated ? selectedDateCreated.toLocaleDateString() : "Date created"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDateCreated}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    form.setValue("createdDate", date)
                    setOpenCreatedDate(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            <Popover open={openDateExpired} onOpenChange={setOpenDateExpired}>
              <PopoverTrigger className="w-full md:max-w-[120px] lg:max-w-[200px]" asChild>
                <Button
                  variant="outline"
                  className="py-2 px-2 lg:px-4   gap-1 items-center justify-between font-normal border-0"
                >
                  {selectedDateExpired ? selectedDateExpired.toLocaleDateString() : "Date created"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDateExpired}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    form.setValue("expiredDate", date)
                    setOpenDateExpired(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="md:hidden w-full">
            <Button
              variant="outline"
              className="w-full justify-between border-0"
              onClick={() => setOpenFilter(true)}
            >
              <div className="flex items-center gap-2">
                <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                <p> Filter</p>
              </div>
              <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
            </Button>
          </div>
          <div className=" hidden md:flex flex-col mr-1 md:flex-row gap-4 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="!w-auto">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4   gap-2 items-center border-0 bg-white justify-between rounded-none">
                  <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                  {selectedSortBy ? handleSelectedSort(selectedSortBy) : "Sort"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='p-0 w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem className="w-full" onClick={() => form.setValue("sortBy", '')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("sortBy", 'createdAt')}>
                  Date
                </DropdownMenuItem>
                {/* Add more types */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden w-full">
            <Button
              variant="outline"
              className="w-full justify-between border-0"
              onClick={() => setOpenSortFilter(true)}
            >
              <div className="flex items-center gap-2">
                <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                <p> Sort by</p>
              </div>
              <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Grid of Cards */}
      <div className="">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EEE] p-4 rounded-lg shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="grid grid-cols-2 border border-[#ECECEC] rounded-sm overflow-hidden text-sm">
                  <div className="p-4 border-r border-[#ECECEC]">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : machines?.length === 0 ? (
          <div className="w-full text-center justify-center flex flex-col items-center h-full min-h-[300px] md:min-h-[500px]">
            <img className="w-[93px] h-[83px] mx-auto mb-4" src={NoDataImg} alt="No data" />
            <div className="flex flex-col gap-1">
              <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">
                No data available
              </h2>
              <p className="text-sm text-neutral-500">Connect your wallet and create new cluster</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines?.map((machine) => (
              <div
                key={machine.id}
                className="bg-white border border-[#EEE] p-4 rounded-lg shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <div className="font-title text-[#181B1E] font-bold text-lg tracking-widest font-pixelyze uppercase">
                      {machine.name}
                    </div>
                    <div className="text-[#6D6D6D] text-sm">
                      {format(machine.createdAt || "", "MMMM d, yyyy")} –{" "}
                      {machine.expiredAt ? format(machine.expiredAt, "MMMM d, yyyy") : "?"}
                    </div>
                    <div
                      className={`${getStatusStyle(machine.status)} text-sm font-semibold uppercase`}
                    >
                      {machine.status}
                    </div>
                  </div>
                  <button className="bg-[#FFF1F2] p-2 rounded hover:opacity-80">
                    <RiCloseLine className="text-[#FF4060] w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 border border-[#ECECEC] rounded-sm overflow-hidden text-sm">
                  <div className="p-4 border-r border-[#ECECEC]">
                    <div className="text-[12px] font-semibold mb-2 text-[#A0A0A0] uppercase">
                      Required System
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={RamIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">{machine.cpuCores} Cores</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={CpuIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">{machine.memoryMB} GB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={GpuIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">{machine.gpuMemory} GB</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-[12px] font-semibold mb-2 text-[#A0A0A0] uppercase">
                      Machine System
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={RamIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">
                  {machine.acceptedMachine?.cpuCores ? machine.acceptedMachine?.cpuCores : "---"} Cores
                </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={CpuIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">
                  {machine.acceptedMachine?.memoryMB ? machine.acceptedMachine?.memoryMB : "---"} GB
                </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={GpuIcon} className="w-4 h-4" alt="CPU" />
                      <span className="text-black text-xs font-semibold">
                  {machine.acceptedMachine?.gpuMemory ? machine.acceptedMachine?.gpuMemory : "---"} GB
                </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {/* Prev */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex bg-transparent items-center justify-center hover:bg-gray-100 border-0"
        >
          
          <div>
            <RiArrowLeftSFill
              className={`w-5 h-5 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-800'}`}
            />
          </div>
        </Button>
        
        {/* Next */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, limit))}
          className="w-8 h-8 bg-transparent border-0 flex items-center justify-center hover:bg-gray-100"
        >
          <div>
            <RiArrowRightSFill
              className={`w-5 h-5 ${currentPage === limit ? 'text-gray-300' : 'text-gray-800'}`}
            />
          </div>
        
        </Button>
      </div>
      
      <FilterMachineModal form={form} applyFilter={onFilter} isOpen={openFilter} onClose={() => setOpenFilter(false)}/>
      <MachineSortModal form={form}  applyFilter={onFilter} isOpen={openSortFilter}
                        onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default AllMachineSection
