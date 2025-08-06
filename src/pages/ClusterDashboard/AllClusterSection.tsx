import {useState} from 'react'
import {RiArrowDownSLine, RiArrowLeftSFill, RiArrowRightSFill, RiMoreLine} from '@remixicon/react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from '@/components/ui/button'
import {useMyOrder} from '@/hooks/useMyOrder'
import {Order} from '@/types/cluster'
import NoDataImg from "@/assets/no_data.png";

import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FilterIcon from "@/assets/icons/filter.svg";
import {FilterClusterModal} from "@/components/modal/FilterClusterModal.tsx";
import {ClusterSortModal} from '@/components/modal/ClusterSortModal'
import {Link} from "react-router-dom";
import {format} from "date-fns";
import OrderDetail from "@/pages/ClusterDetail/OrderDetail.tsx";

export const filterClusterSchema = z.object({
  application: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  createdDate: z.date().optional(),
  expiredDate: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterForm = z.infer<typeof filterClusterSchema>

const AllClusterSection = () => {
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  
  const form = useForm<FilterForm>({
    mode: "onBlur",
    resolver: zodResolver(filterClusterSchema),
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
  
  
  const [openFilter, setOpenFilter] = useState(false)
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [orderId, setOrderId] = useState("")
  
  const [currentPage, setCurrentPage] = useState(10)
  const [totalPages, setTotalPages] = useState(10)
  const {myOrders} = useMyOrder({limit: totalPages, page: currentPage} )
  
  const getStatusColor = (status: Order['status']) => {
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
  
  
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">all requests</h2>
      </div>
      <div className="flex flex-row justify-between w-full gap-4 md:gap-0">
        <div className="hidden md:flex md:flex-row gap-2 w-full desktop:gap-4 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="!w-auto">
              <Button variant="outline" className="py-2 px-2 lg:px-4 w-full gap-1 items-center  border-0 rounded-none">
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
        <div className="hidden tablet:flex flex-col md:flex-row gap-4 w-full tablet:w-auto">
          {/* <Button variant="default" size="default" className="w-full md:w-auto rounded-none">
            <RiAddLine className="w-5 h-5" />
            Create New Cluster
          </Button> */}
          {/*<Link to="/cluster/new">*/}
          {/*  <Button variant="default" size="default" className="w-full md:w-auto rounded-none">*/}
          {/*    <RiAddLine className="w-5 h-5"/>*/}
          {/*    Create New Cluster*/}
          {/*  </Button>*/}
          {/*</Link>*/}
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
                <TableHead
                  className="p-4 w-8 text-center font-figtree text-xs font-semibold text-[#4D5756]">ID</TableHead>
                <TableHead className="p-4 font-figtree text-xs font-semibold text-[#4D5756]">Application</TableHead>
                <TableHead className="p-4 font-figtree text-xs font-semibold text-[#4D5756]">Type</TableHead>
                <TableHead className="p-4 font-figtree text-xs font-semibold text-[#4D5756]">Date Created</TableHead>
                <TableHead className="p-4 font-figtree text-xs font-semibold text-[#4D5756]">Date Expired</TableHead>
                <TableHead className="p-4 font-figtree text-xs font-semibold text-[#4D5756]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myOrders && myOrders.length > 0 ? (
                myOrders.map((cluster: any) => (
                  <TableRow key={cluster.id} className="border-b border-[#F0F0F0]">
                    <TableCell
                      className="text-center font-figtree text-xs font-medium text-black">{cluster.id}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {cluster.name}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {cluster.machineType}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {cluster.createdAt ? format(cluster.createdAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {cluster.expiredAt ? format(cluster.expiredAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                    </TableCell>
                    <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cluster.status)}`}>
                      {cluster.status}
                    </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {["Cancelled", "Closed"].includes(cluster.status) ? (
                        <button
                          className="px-2 rounded-full cursor-not-allowed opacity-40"
                          disabled
                        >
                          <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                        </button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="px-2 hover:bg-accent rounded-full">
                              <RiMoreLine className="w-5 h-5 text-[#8D8D8D]"/>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="min-w-[180px] rounded-md">
                            {cluster.status === 'Created' && (
                              <>
                                <DropdownMenuItem onClick={() => console.log('View detail')}>
                                  View details
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
                                {/*<DropdownMenuItem onClick={() => {*/}
                                {/*  setOrderId(cluster.id)*/}
                                {/*  setShowOrderDetail(true)*/}
                                {/*}}>*/}
                                {/*  View detail*/}
                                {/*</DropdownMenuItem>*/}
                                <DropdownMenuItem onClick={() => console.log('Request detail')}>
                                  <Link to={`/request/${cluster.id}`}>  Request payment</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log('Machine detail')}>
                                  <Link to={`/machine/${cluster.id}`}> Machine details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log('Upfront payment')}>
                                  <Link to={`/#`}>  Payment history</Link>
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
      
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage !== 1 ? 'hover:bg-accent' : ''}`}
          disabled={currentPage === 1}
        >
          <RiArrowLeftSFill className={`w-6 h-6 ${currentPage === 1 ? 'text-[#D9DEDE]' : 'text-[#181B1E]'}`}/>
        </button>
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage !== totalPages ? 'hover:bg-accent' : ''}`}
          disabled={currentPage === totalPages}
        >
          <RiArrowRightSFill className={`w-6 h-6 ${currentPage === totalPages ? 'text-[#D9DEDE]' : 'text-[#181B1E]'}`}/>
        </button>
      </div>
      
      <OrderDetail openOrderDetail={showOrderDetail} onClose={() => setShowOrderDetail(false)} id={orderId}/>
      <FilterClusterModal form={form} resetFilter={form.reset} applyFilter={onFilter} isOpen={openFilter}
                          onClose={() => setOpenFilter(false)}/>
      <ClusterSortModal form={form} resetFilter={onResetSort} applyFilter={onFilter} isOpen={openSortFilter}
                        onClose={() => setOpenSortFilter(false)}/>
    </div>
  )
}

export default AllClusterSection