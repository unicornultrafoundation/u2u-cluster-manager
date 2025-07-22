import {useState} from 'react'
import {RiArrowDownSLine, RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine} from '@remixicon/react'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Cluster} from '@/types/cluster'
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
import LinkIcon from '@/assets/icons/link.svg';
import FilterIcon from "@/assets/icons/filter.svg";
import NoDataImg from "@/assets/no_data.png";
import {format} from "date-fns";
import {useMyOrder} from "@/hooks/useMyOrder.ts";


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
  const {myOrders} = useMyOrder()
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const screenSize = useScreenSize()
  const form = useForm<FilterMachineForm>({
    mode: "onBlur",
    resolver: zodResolver(filterMachineSchema),
    defaultValues: {
      application: 'All applications',
      type: 'All types',
      status: 'All status',
      sortBy: 'Sort by'
    },
  });
  const selectedApplication = form.watch("application")
  const selectedType = form.watch("type")
  const selectedStatus = form.watch("status")
  const selectedSortBy = form.watch("sortBy")
  const selectedDateCreated = form.watch("createdDate")
  const selectedDateExpired = form.watch("expiredDate")
  
  const getStatusStyle = (status: Cluster['status']) => {
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
    console.log("🔍 Filter values:", form.getValues())
    // Gọi API hoặc filter local data
  }
  
  const onResetSort = () => {
    form.reset({
      sortBy: 'All'
    })
  }
  
  const itemsPerPage = screenSize === 'mobile' ? 3 : 6;
  const totalPages = Math.ceil(myOrders?.length || 10 / itemsPerPage);
  const applications = myOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const generatePagination = (current: number, total: number): (number | string)[] => {
    const range = [];
    
    if(total <= 5) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      if(current <= 3) {
        range.push(1, 2, 3, '...', total);
      } else if(current >= total - 2) {
        range.push(1, '...', total - 2, total - 1, total);
      } else {
        range.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    
    return range;
  };
  
  
  const pages = generatePagination(currentPage, totalPages);
  
  return (
    <div className="flex flex-col gap-6 ">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tight">All Machines</h2>
        <div className="flex flex-row justify-between w-full gap-4 md:gap-0">
          <div className="hidden md:flex md:flex-row gap-2 w-full desktop:gap-4 flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="!w-auto">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4 w-full gap-1 items-center  border-0 rounded-none">
                  {selectedApplication}
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
              <DropdownMenuTrigger asChild className="!w-auto">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4  w-full gap-1 items-center justify-between border-0 rounded-none">
                  {selectedType}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("type", 'All types')}>
                  All types
                </DropdownMenuItem>
                {/* Add more types */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="!w-auto">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4  w-full gap-1 items-center justify-between border-0 rounded-none">
                  {selectedStatus}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("status", 'All status')}>
                  All status
                </DropdownMenuItem>
                {/* Add more statuses */}
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
              <PopoverTrigger asChild>
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
              <PopoverTrigger asChild>
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
          <div className=" hidden tablet:flex flex-col mr-1 md:flex-row gap-4 w-full tablet:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="!w-auto">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4   gap-1 items-center border-0 bg-white justify-between rounded-none">
                  <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                  {selectedSortBy}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='p-0 w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem className="w-full" onClick={() => form.setValue("sortBy", 'All')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("sortBy", 'Date')}>
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
        {applications?.length === 0 ? (
          <div
            className="w-full text-center justify-center flex flex-col items-center h-full min-h-[300px] md:min-h-[600px]">
            <img className="w-[93px] h-[83px] mx-auto mb-4" src={NoDataImg} alt="No data"/>
            <div className="flex flex-col gap-1">
              <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">
                No data available
              </h2>
              <p className="text-sm text-neutral-500">Connect your wallet and create new cluster</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications?.map((machine) => (
              <div key={machine.id}
                   className="bg-white border border-[#EEE] p-4 rounded-lg shadow-sm flex flex-col gap-4">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/*<img src={clusterLogo} alt="App Logo" className="w-10 h-10" />*/}
                    <div>
                      <div className="text-[#181B1E] font-bold text-[14px] tracking-widest font-pixelyze uppercase">
                        DATA PROCESSING
                      </div>
                      <div className="text-[#6D6D6D] text-sm mt-1">
                        {format(machine.createdAt || "", 'MMMM d, yyyy')} – {machine.expiredAt ? format(machine.expiredAt , 'MMMM d, yyyy') : ""}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="bg-[#F5F5F5] p-1 rounded hover:opacity-80">
                      <RiCloseLine className="text-[#FF4060] w-5 h-5"/>
                    </button>
                    <button className="bg-[#F5F5F5] p-1 rounded hover:opacity-80">
                      <img src={LinkIcon} className="text-[#666] w-5 h-5" alt="link"/>
                    </button>
                  </div>
                </div>
                <div
                  className={`${getStatusStyle(machine.status)} text-sm font-semibold uppercase`}>{machine.status}</div>
                <div
                  className="grid grid-cols-2 border border-[#ECECEC] rounded-sm overflow-hidden text-[#4D5756] text-sm">
                  {/* Required System */}
                  <div className="p-4 border-r border-[#ECECEC]">
                    <div className="text-[12px] font-semibold mb-2 text-[#A0A0A0] uppercase">Required System</div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={RamIcon} className="w-4 h-4" alt="CPU"/>
                      <span>{machine.cpuCores} GB</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={CpuIcon} className="w-4 h-4" alt="CPU"/>
                      
                      <span>{machine.memoryMB} GB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={GpuIcon} className="w-4 h-4" alt="CPU"/>
                      <span>{machine.gpuMemory} GB</span>
                    </div>
                  </div>
                  
                  {/* Machine System */}
                  <div className="p-4">
                    <div className="text-[12px] font-semibold mb-2 text-[#A0A0A0] uppercase">Machine System</div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={RamIcon} className="w-4 h-4" alt="CPU"/>
                      <span>{machine.acceptedMachine?.cpuCores} GB</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={CpuIcon} className="w-4 h-4" alt="CPU"/>
                      <span>{machine.acceptedMachine?.memoryMB} GB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={GpuIcon} className="w-4 h-4" alt="CPU"/>
                      <span>{machine.acceptedMachine?.gpuMemory} GB</span>
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
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <RiArrowLeftSFill
            className={`w-5 h-5 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-800'}`}
          />
        </button>
        
        {/* Numbered buttons */}
        {pages.map((n, i) =>
          typeof n === 'number' ? (
            <button
              key={i}
              onClick={() => setCurrentPage(n)}
              className={`w-8 h-8 rounded-full text-sm font-medium ${
                n === currentPage
                  ? 'bg-[#EEF0F0] text-[#181B1E]'
                  : 'hover:bg-accent text-[#929E9D]'
              }`}
            >
              {n}
            </button>
          ) : (
            <p key={i} className="text-sm text-[#929E9D]">
              {n}
            </p>
          )
        )}
        
        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <RiArrowRightSFill
            className={`w-5 h-5 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-800'}`}
          />
        </button>
      </div>
      
      
      <FilterMachineModal form={form} applyFilter={onFilter} isOpen={openFilter} onClose={() => setOpenFilter(false)}/>
      <MachineSortModal form={form} resetFilter={onResetSort} applyFilter={onFilter} isOpen={openSortFilter}
                        onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default AllMachineSection
