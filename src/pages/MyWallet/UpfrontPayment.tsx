import {useState} from 'react'
import {RiArrowDownSLine, RiArrowLeftSFill, RiArrowRightSFill, RiMoreLine} from '@remixicon/react'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Cluster} from '@/types/cluster'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FilterIcon from "@/assets/icons/filter.svg";
import NoDataImg from "@/assets/no_data.png";
import {format} from "date-fns";
import {useMyOrder} from "@/hooks/useMyOrder.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Link} from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import {FilterUpfrontModal} from "@/components/modal/FilterUpfrontModal.tsx";
import {UpfrontSortModal} from "@/components/modal/UpfrontSortModal.tsx";

export const filterUpfrontSchema = z.object({
  application: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  createdDate: z.date().optional(),
  expiredDate: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterUpfrontForm = z.infer<typeof filterUpfrontSchema>


const UpfrontPayment = () => {
  const {myOrders} = useMyOrder()
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const form = useForm<FilterUpfrontForm>({
    mode: "onBlur",
    resolver: zodResolver(filterUpfrontSchema),
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
  
  
  const onFilter = () => {
    console.log("🔍 Filter values:", form.getValues())
  }
  
  const onResetSort = () => {
    form.reset({
      sortBy: 'All'
    })
  }
  
  const itemsPerPage = 10;
  const totalPages = myOrders?.length || 10 / itemsPerPage;
  const applications = myOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const generatePagination = (current: number, _total: number, itemsPerPage: number, totalItems: number): (number | string)[] => {
    const range: (number | string)[] = [];
    const validTotalPages = Math.ceil(totalItems / itemsPerPage);
    
    if(validTotalPages <= 5) {
      for (let i = 1; i <= validTotalPages; i++) range.push(i);
    } else {
      if(current <= 3) {
        range.push(1, 2, 3, '...', validTotalPages);
      } else if(current >= validTotalPages - 2) {
        range.push(1, '...', validTotalPages - 2, validTotalPages - 1, validTotalPages);
      } else {
        range.push(1, '...', current - 1, current, current + 1, '...', validTotalPages);
      }
    }
    
    return range;
  };
  
  const pages = generatePagination(currentPage, totalPages, itemsPerPage, 10);
  
  return (
    <div className="flex flex-col gap-6 ">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tight">upfront payment</h2>
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
      <div className="">
        <div className="w-full overflow-x-auto  bg-white ">
          <div className="min-w-[960px]">
            <Table>
              <TableHeader>
                <TableRow className="  border-[#F0F0F0]">
                  <TableHead
                    className="p-4 w-8 text-center font-figtree text-xs font-semibold text-neutral-400">ID</TableHead>
                  <TableHead
                    className="py-4 w-[20%] font-figtree text-xs font-semibold text-neutral-400 ">Application</TableHead>
                  <TableHead
                    className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Type</TableHead>
                  <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Total
                    Upfront</TableHead>
                  <TableHead
                    className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Remaining</TableHead>
                  <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Date
                    Created</TableHead>
                  <TableHead className="py-4 w-[15%] font-figtree text-xs font-semibold text-neutral-400 ">Date
                    Expired</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications && applications.length > 0 ? (
                  applications.map((cluster: Cluster) => (
                    <TableRow key={cluster.id} className="border-b border-[#F0F0F0]">
                      <TableCell
                        className="text-center font-figtree text-xs font-medium text-black">{cluster.id}
                      </TableCell>
                      <TableCell
                        className="text-center font-figtree flex items-center gap-2 text-xs font-medium text-black">
                        {/*<img src={img} alt="wallet" className="w-5 h-5"/>*/}
                        {cluster.name}
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        {cluster.machineType}
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        10.02 U2U
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        10.02 U2U
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        {cluster.createdAt ? format(cluster.createdAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                      </TableCell>
                      <TableCell className="font-figtree text-xs font-medium text-black">
                        {cluster.expiredAt ? format(cluster.expiredAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                      </TableCell>
                      <TableCell className="text-right">
                        {["Cancelled", "Closed"].includes(cluster.status) ? (
                          <button
                            className="p-2 rounded-full cursor-not-allowed opacity-40"
                            disabled
                          >
                            <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                          </button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 hover:bg-accent rounded-full">
                                <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[180px] rounded-md">
                              {cluster.status === 'Created' && (
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
                              {cluster.status === 'Accepted' && (
                                <>
                                  <DropdownMenuItem onClick={() => console.log('Machine detail')}>
                                    <Link to={`/machine/${cluster.id}`}> Machine details</Link>
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
                <RiArrowLeftSFill className="w-5 h-5"/>
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
                  <PaginationEllipsis/>
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
                <RiArrowRightSFill className="w-5 h-5"/>
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <FilterUpfrontModal form={form} applyFilter={onFilter} isOpen={openFilter} onClose={() => setOpenFilter(false)}/>
      <UpfrontSortModal form={form} resetFilter={onResetSort} applyFilter={onFilter} isOpen={openSortFilter}
                        onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default UpfrontPayment
