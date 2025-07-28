import {useEffect, useState} from 'react'
import {
  RiArrowDownSLine,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiFileCopyLine,
  RiSearchLine,
  RiShareCircleLine
} from '@remixicon/react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from '@/components/ui/button'
import NoDataImg from "@/assets/no_data.png";

import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FilterIcon from "@/assets/icons/filter.svg";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination.tsx";
import {DepositSortModal} from "@/components/modal/DepositSortModal.tsx";
import {useDepositHistory} from "@/hooks/useDepositHistory.ts";
import {Deposit} from '@/types/deposit.ts'
import {generatePagination, shortenAddress} from "@/utils/string.ts";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {FilterDepositModal} from "@/components/modal/FilterDepositModal.tsx";
import {useDepositFilterStore} from "@/store/filter/deposit-history/store.ts";

export const filterDepositSchema = z.object({
  searchString: z.string().optional(),
  status: z.string().optional(),
  date: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterForm = z.infer<typeof filterDepositSchema>

const DepositHistory = () => {
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const {updateFilters, filters} = useDepositFilterStore()
  
  const form = useForm<FilterForm>({
    mode: "onBlur",
    resolver: zodResolver(filterDepositSchema),
    defaultValues: {
      searchString: '',
      status: 'All status',
      sortBy: 'Sort by'
    },
  });
  
  const selectedStatus = form.watch("status")
  const selectedSortBy = form.watch("sortBy")
  const selectedDate = form.watch("date")
  const search = form.watch("searchString")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const getStatusColor = (status: Deposit['status']) => {
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
      status: selectedStatus !== 'All types' ? selectedStatus : undefined,
      date: selectedDate ? selectedDate.getTime() : 0,
      orderBy: selectedSortBy !== 'Sort by' ? selectedSortBy : undefined
    }
    
    updateFilters(newFilters);
  }, [currentPage, search, selectedStatus, selectedDate, selectedSortBy]);
  

  
  const {
    data: mockOrders,
    totalItems,
  } = useDepositHistory({
    filters: filters
  });
  
  const totalPages = totalItems / itemsPerPage;
  const pages = generatePagination(totalPages)
  
  
  
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">Deposit History</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-2">
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full desktop:gap-4 flex-1">
         
          <div className="w-full flex items-center gap-2 px-4 py-1 md:py-0 bg-white  ">
            <RiSearchLine className=" text-neutral-300 absolute"/>
            <Input
              placeholder="Search txn hash, address,..."
              className="ml-4 !ring-0"
              value={form.watch("searchString")}
              onChange={(e) => form.setValue("searchString", e.target.value)}
            />
          </div>
          
          <div className="hidden md:flex gap-4 md:gap-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button variant="outline"
                        className="py-2 px-2 md:px-4 w-full md:w-[227px]  gap-1 items-center justify-between border-0 rounded-none">
                  {selectedStatus}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue("status", 'All')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Processing')}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Success')}>
                  Success
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("status", 'Cancel')}>
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="py-2 px-2 lg:px-4  gap-1 w-full md:w-[227px]  items-center justify-between font-normal border-0"
                >
                  {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    form.setValue("date", date)
                    setOpenCreatedDate(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
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
                <DropdownMenuItem className="w-full" onClick={() => form.setValue("sortBy", 'All')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => form.setValue("sortBy", 'Date')}>
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
      <div className="w-full overflow-x-auto  bg-white ">
        <div className="min-w-[960px]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#F0F0F0]">
                <TableHead className="p-4 w-[20%] font-figtree text-xs font-semibold text-neutral-400">Txn Hash</TableHead>
                <TableHead className="p-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Date</TableHead>
                <TableHead className="p-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">From</TableHead>
                <TableHead className="p-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">To</TableHead>
                <TableHead className="p-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Total Spent</TableHead>
                <TableHead className="p-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders && mockOrders.length > 0 ? (
                mockOrders.map((transaction: Deposit) => (
                  <TableRow key={transaction.id} className="border-b border-[#F0F0F0]">
                    <TableCell className="font-figtree text-xs font-medium text-black px-4">
                      <div className="flex items-center gap-2">
                        <p>{shortenAddress(transaction.txHash)}</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(transaction.txHash ?? "")
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
                    <TableCell className="font-figtree text-xs font-medium text-black px-4">
                      {transaction.createdAt ? format(transaction.createdAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black px-4">
                      <div className="flex items-center gap-2">
                        <p>{shortenAddress(transaction.from)}</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(transaction.from ?? "")
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
                    <TableCell className="font-figtree text-xs font-medium text-black px-4">
                      <div className="flex items-center gap-2">
                        <p>{shortenAddress(transaction.to)}</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(transaction.to ?? "")
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
                    <TableCell
                      className=" font-figtree text-xs font-medium text-black px-4">
                      {transaction.totalSpent} U2U
                    </TableCell>
                    <TableCell className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                    </TableCell>
                    <TableCell className="text-right px-4">
              
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Link to={`https://u2uscan.xyz/tx/${transaction.transactionHash}`} target="_blank" className=" hover:bg-accent flex items-center justify-center rounded-full">
                              <RiShareCircleLine className="w-5 h-5 text-[#8D8D8D]"/>
                            </Link>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
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
                <RiArrowLeftSFill className="w-6 h-6" />
              </button>
            </PaginationItem>
            {pages.map((page, i) =>
              typeof page === "number" ? (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
                    }}
                    className={`${page === currentPage ? "bg-neutral-100 text-black" : "bg-transparent text-neutral-400"} border-0 cursor-pointer hover:bg-neutral-100`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={i}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                <RiArrowRightSFill className="w-6 h-6" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
      </div>
      <FilterDepositModal form={form} isOpen={openFilter} onClose={() => setOpenFilter(false)}/>
      <DepositSortModal form={form} isOpen={openSortFilter} onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default DepositHistory