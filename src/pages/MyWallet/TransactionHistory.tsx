import {useState} from 'react'
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
import {useMyOrder} from '@/hooks/useMyOrder'
import {Cluster} from '@/types/cluster'
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
import {TransactionSortModal} from "@/components/modal/TransactionSortModal.tsx";

export const filterTransactionSchema = z.object({
  searchString: z.string().optional(),
  status: z.string().optional(),
  date: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterForm = z.infer<typeof filterTransactionSchema>

const TransactionHistory = () => {
  const {myOrders} = useMyOrder()
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  
  const form = useForm<FilterForm>({
    mode: "onBlur",
    resolver: zodResolver(filterTransactionSchema),
    defaultValues: {
      searchString: '',
      status: 'All types',
      sortBy: 'Sort by'
    },
  });
  
  const selectedStatus = form.watch("status")
  const selectedSortBy = form.watch("sortBy")
  const selectedDate = form.watch("date")
  const search = form.watch("searchString")
  const [currentPage, setCurrentPage] = useState(1)
  
  const getStatusColor = (status: Cluster['status']) => {
    switch (status) {
      case 'Created':
        return 'bg-[#FFFBEB] text-[#D77A08]'
      case 'Accepted':
        return 'bg-[#ECFDF5] text-[#009966]'
      case 'Cancelled':
        return 'bg-[#FFF1F2] text-[#EC003F]'
      default:
        return ''
    }
  }
  // useEffect(() => {
  //   console.log(form.getValues())
  //
  // }, [form])
  
  const onResetSort = () => {
    form.reset({
      sortBy: 'All'
    })
  }
  
  async function onFilter() {
    const isValid = await form.trigger()
    if(!isValid) return
    
    console.log("✅ Filter values:", form.getValues())
    
    // TODO: Use for query API
    // const data = await fetchFilteredCluster(values)
  }
  
  const itemsPerPage = 10;
  const totalPages = myOrders?.length || 10 / itemsPerPage;
  const transactions = myOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const generatePagination = (current: number, _total: number, itemsPerPage: number, totalItems: number): (number | string)[] => {
    const range: (number | string)[] = [];
    const validTotalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (validTotalPages <= 5) {
      for (let i = 1; i <= validTotalPages; i++) range.push(i);
    } else {
      if (current <= 3) {
        range.push(1, 2, 3, '...', validTotalPages);
      } else if (current >= validTotalPages - 2) {
        range.push(1, '...', validTotalPages - 2, validTotalPages - 1, validTotalPages);
      } else {
        range.push(1, '...', current - 1, current, current + 1, '...', validTotalPages);
      }
    }
    
    return range;
  };
  
  const pages = generatePagination(currentPage, totalPages, itemsPerPage, 10);
  console.log(search)
  
  
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">Transaction History</h2>
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
          
          <div className="flex gap-4 md:gap-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:!w-auto">
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
                  className="py-2 px-2 lg:px-4  gap-1 w-full desktop:w-full items-center justify-between font-normal border-0"
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
       
        <div className="hidden tablet:flex flex-col md:flex-row gap-4 w-full tablet:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="!w-auto">
              <Button variant="outline"
                      className="py-2 px-2 lg:px-4 mr-1 w-full gap-1 items-center border-0 bg-white justify-between rounded-none">
                <img src={FilterIcon} className="w-4 h-4" alt="CPU"/>
                <p>{selectedSortBy}</p>
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
      {/* Table with horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto  bg-white ">
        <div className="min-w-[960px]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#F0F0F0]">
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Txn Hash</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Date</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">From</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">To</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Amount</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Fee</TableHead>
                <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.map((cluster: Cluster) => (
                  <TableRow key={cluster.id} className="border-b border-[#F0F0F0]">
                    <TableCell className="font-figtree text-xs font-medium text-black ">
                      <div className="flex items-center gap-2">
                        <p>0xd9d19...119</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(cluster.id ?? "")
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
                      May 05, 2025 - 16:34:26
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      <div className="flex items-center gap-2">
                        <p>0x75...CEac</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(cluster.id ?? "")
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
                      <div className="flex items-center gap-2">
                        <p>0x75...CEac</p>
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(cluster.id ?? "")
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
                      className=" font-figtree text-xs font-medium text-black">
                      10.02 U2U
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      0.05 U2U
                    </TableCell>
                  
                    <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cluster.status)}`}>
                      {cluster.status}
                    </span>
                    </TableCell>
                    <TableCell className="text-right">
              
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-accent rounded-full">
                              <RiShareCircleLine className="w-5 h-5 text-[#8D8D8D]"/>
                            </button>
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
                <RiArrowLeftSFill className="w-5 h-5" />
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
                    className={`${page === currentPage ? "bg-neutral-200" : "bg-transparent"} border-0 cursor-pointer hover:bg-neutral-200`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={i}>
                  <PaginationEllipsis  />
                </PaginationItem>
              )
            )}
            {/* Next Button */}
            <PaginationItem>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                <RiArrowRightSFill className="w-5 h-5" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      
      </div>
      <TransactionSortModal form={form} resetFilter={onResetSort} applyFilter={onFilter} isOpen={openSortFilter}
                        onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default TransactionHistory