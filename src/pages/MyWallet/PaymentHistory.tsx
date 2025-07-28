import {useEffect, useState} from 'react'
import {
  RiArrowDownSLine,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiFileCopyLine,
  RiMoreLine,
  RiSearchLine
} from '@remixicon/react'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FilterIcon from "@/assets/icons/filter.svg";
import NoDataImg from "@/assets/no_data.png";
import {format} from "date-fns";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Link} from "react-router-dom";
import {Pagination, PaginationContent, PaginationItem} from '@/components/ui/pagination'
import {FilterPaymentModal} from "@/components/modal/FilterPaymentModal.tsx";
import {PaymentSortModal} from "@/components/modal/PaymentSortModal.tsx";
import {usePaymentHistory} from "@/hooks/usePaymentHistory.ts";
import {shortenAddress} from "@/utils/string.ts";
import {Payment} from "@/types/payment.ts";
import {toast} from "sonner";
import {Input} from "@/components/ui/input.tsx";
import {usePaymentFilterStore} from "@/store/filter/payment-history/store.ts";

export const filterPaymentSchema = z.object({
  searchString: z.string().optional(),
  application: z.string().optional(),
  type: z.string().optional(),
  date: z.date().optional(),
  orderBy: z.string().optional()
})
type FilterPaymentForm = z.infer<typeof filterPaymentSchema>


const PaymentHistory = () => {
  const [openDate, setOpenDate] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;
  const {updateFilters, filters} = usePaymentFilterStore()
  
  const form = useForm<FilterPaymentForm>({
    mode: "onBlur",
    resolver: zodResolver(filterPaymentSchema),
    defaultValues: {
      searchString: '',
      application: 'All applications',
      type: 'All types',
      orderBy: 'Sort by'
    },
  });
  const search = form.watch("searchString")
  const selectedApplication = form.watch("application")
  const selectedType = form.watch("type")
  const selectedSortBy = form.watch("orderBy")
  const selectedDate = form.watch("date")
  
  
  const getStatusColor = (status: Payment['type']) => {
    switch (status) {
      case 'Processing':
        return 'bg-[#FFFBEB] text-[#D77A08]'
      case 'Success':
        return 'bg-[#ECFDF5] text-[#009966]'
      case 'Cancel':
        return 'bg-[#FFF1F2] text-[#EC003F]'
      default:
        return ''
    }
  }
  
  useEffect(() => {
    const newFilters = {
      page: currentPage,
      limit: itemsPerPage,
      searchString: search || undefined,
      application: selectedApplication !== 'All applications' ? selectedApplication : undefined,
      type: selectedType !== 'All types' ? selectedType : undefined,
      date: selectedDate ? selectedDate.getTime() : 0,
      orderBy: selectedSortBy !== 'Sort by' ? selectedSortBy : undefined
    }
    
    updateFilters(newFilters);
  }, [currentPage, search, selectedApplication, selectedType, selectedDate, selectedSortBy]);
  
  
  const {
    data: mockPayments,
    totalItems,
  } = usePaymentHistory({filters: filters});
  
  const totalPages = totalItems / itemsPerPage;
  
  return (
    <div className="flex flex-col gap-6 ">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tight">Payment history</h2>
        <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-3">
          <div className="flex md:flex-row gap-2 w-full md:gap-3 flex-1">
            <div className="w-full flex items-center gap-2 px-4 py-1 md:py-0 bg-white  ">
              <RiSearchLine className=" text-neutral-300 absolute"/>
              <Input
                placeholder="Search txn hash, address,..."
                className="ml-4 !ring-0"
                value={form.watch("searchString")}
                onChange={(e) => form.setValue("searchString", e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full max-w-[227px]  hidden md:flex">
                <Button variant="outline"
                        className="py-2 px-2 lg:px-4 w-full gap-1 justify-between items-center  border-0 rounded-none">
                  {selectedApplication}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("application", 'U2DPN')}>
                  U2DPN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full max-w-[227px] hidden">
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
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="py-2 px-2 lg:px-4  w-full max-w-[227px]  gap-1 items-center justify-between font-normal border-0 hidden md:flex"
                >
                  {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    form.setValue("date", date)
                    setOpenDate(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex gap-2 items-center">
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
                <DropdownMenuTrigger asChild className="w-[227px]">
                  <Button variant="outline"
                          className="py-2 px-2 lg:px-4 gap-1 items-center border-0 bg-white justify-between rounded-none">
                    <div className="flex items-center gap-2">
                      <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                      {selectedSortBy}
                    </div>
                    <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-0 w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                  <DropdownMenuItem className="w-full" onClick={() => form.setValue("orderBy", 'All')}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => form.setValue("orderBy", 'Date')}>
                    Date
                  </DropdownMenuItem>
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
      </div>
      <div className="">
        <div className="w-full overflow-x-auto  bg-white ">
          <div className="min-w-[960px]">
            <Table>
              <TableHeader>
                <TableRow className="  border-[#F0F0F0]">
                  <TableHead
                    className="py-4 w-[20%] font-figtree text-xs font-semibold text-neutral-400 ">Txn Hash</TableHead>
                  <TableHead
                    className="py-4 w-[20%] font-figtree text-xs font-semibold text-neutral-400 ">Application</TableHead>
                  <TableHead
                    className="py-4 w-[20%] font-figtree text-xs font-semibold text-neutral-400 ">Type</TableHead>
                  <TableHead
                    className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Total
                    Upfront</TableHead>
                  <TableHead
                    className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments && mockPayments.length > 0 ? (
                  mockPayments.map((payment: Payment) => (
                    <TableRow key={payment.id} className="border-b border-[#F0F0F0]">
                      <TableCell className="font-figtree text-xs font-medium text-black px-4">
                        <div className="flex items-center gap-2">
                          <p>{shortenAddress(payment.txHash)}</p>
                          <div
                            className="flex items-center  cursor-pointer"
                            onClick={() => {
                              navigator.clipboard
                                .writeText(payment.txHash ?? "")
                                .then(() => {
                                  toast.success("Copied to clipboard");
                                })
                                .catch(() => {
                                  console.error("Unable copy to clipboard");
                                });
                            }}
                          >
                            <RiFileCopyLine className="fill-neutral-500 w-5 h-5"/>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        {payment.application}
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.type)}`}>
                          {payment.type}
                        </span>
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        {payment.total} U2U
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black px-4">
                        {payment.createdAt ? format(payment.createdAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                      </TableCell>
                      <TableCell className="text-right">
                        {["Cancelled", "Closed"].includes(payment.type) ? (
                          <button
                            className="p-2 rounded-full cursor-not-allowed opacity-40"
                            disabled
                          >
                            <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                          </button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 hover:bg-accent">
                                <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[180px] rounded-md">
                              {payment.type === 'Processing' && (
                                <>
                                  <DropdownMenuItem onClick={() => console.log('View detail')}>
                                    Machine details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => console.log('Cancel order')}
                                    className="text-red-500"
                                  >
                                    Cancel order
                                  </DropdownMenuItem>
                                </>
                              )}
                              {payment.type === 'Success' && (
                                <>
                                  <DropdownMenuItem onClick={() => console.log('Machine detail')}>
                                    <Link to={`/machine/${payment.machineId}`}> Machine details</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => console.log('Cancel order')}
                                    className="text-red-500"
                                  >
                                    Cancel order
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div
                        className="w-full text-center justify-center flex flex-col items-center h-full min-h-[300px] md:min-h-[600px]">
                        <img
                          className="w-[93px] h-[83px] mx-auto mb-4"
                          src={NoDataImg}
                          alt="Desktop Background"
                        />
                        <div className="flex flex-col gap-1 ">
                          <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">No data
                            available</h2>
                          <p className="text-sm text-neutral-500">Connect your wallet and create new cluster</p>
                        </div>
                      </div>
                    
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                <RiArrowLeftSFill className="w-6 h-6"/>
              </button>
            </PaginationItem>
            <PaginationItem>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                <RiArrowRightSFill className="w-6 h-6"/>
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <FilterPaymentModal form={form} isOpen={openFilter} onClose={() => setOpenFilter(false)}/>
      <PaymentSortModal form={form} isOpen={openSortFilter} onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default PaymentHistory
