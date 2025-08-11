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
import {FilterOrderModal} from "@/components/modal/FilterOrderModal.tsx";
import {OrderSortModal} from '@/components/modal/OrderSortModal.tsx'
import {format} from "date-fns";
import OrderDetail from "@/pages/ClusterDetail/OrderDetail.tsx";
import {getMachineType} from "@/utils/machine.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Link} from 'react-router-dom'
import CancelOrder from "@/pages/ClusterDashboard/CancelOrder.tsx";

export const filterClusterSchema = z.object({
  application: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  createdDate: z.date().optional(),
  expiredDate: z.date().optional(),
  sortBy: z.string().optional()
})
type FilterForm = z.infer<typeof filterClusterSchema>

const AllRequestSection = () => {
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)
  const [openSortFilter, setOpenSortFilter] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  
  const form = useForm<FilterForm>({
    mode: "onBlur",
    resolver: zodResolver(filterClusterSchema),
    
  });
  
  const selectedApplication = form.watch("application")
  const selectedType = form.watch("type")
  const selectedStatus = form.watch("status")
  const selectedSortBy = form.watch("sortBy")
  const selectedDateCreated = form.watch("createdDate")
  const selectedDateExpired = form.watch("expiredDate")
  const [filters, setFilters] = useState<FilterForm>({});
  
  
  const [openFilter, setOpenFilter] = useState(false)
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [orderId, setOrderId] = useState("")
  
  const limit = 10;
  const [page, setPage] = useState(1);
  
  const {myOrders, isLoading, refetch} = useMyOrder({
    page: page,
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
    queryKey: 'my-orders',
  });
  
  
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
  
  const onFilter = () => {
    const values = form.getValues();
    setFilters(values);
    setOpenFilter(false);
  };
  
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">all requests</h2>
      </div>
      <div className="flex flex-row justify-between w-full gap-4 md:gap-0">
        <div className="hidden md:flex md:flex-row gap-2 w-full desktop:gap-4 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full md:max-w-[120px] lg:max-w-[200px]">
              <Button variant="outline"
                      className="py-2 px-2 lg:px-4 w-full gap-1 items-center justify-between  border-0 rounded-none">
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
                {selectedType ? getMachineType(selectedType) : "All Types"}
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
              <DropdownMenuItem onClick={() => form.setValue("status", '')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => form.setValue("status", 'Created')}>
                Created
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => form.setValue("status", 'Accepted')}>
                Accepted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => form.setValue("status", 'Cancelled')}>
                Cancelled
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
                {selectedDateExpired ? selectedDateExpired.toLocaleDateString() : "Date expired"}
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
        <div className="hidden md:flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
                <p>{selectedSortBy ? selectedSortBy : "Sort"}</p>
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0 w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
              <DropdownMenuItem className="w-full" onClick={() => form.setValue("sortBy", 'All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => form.setValue("sortBy", 'createdAt')}>
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
      {/* Table with horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto bg-white">
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
              {!myOrders || isLoading ? (
                Array.from({length: 5}).map((_, idx) => (
                  <TableRow key={idx} className="border-b border-[#F0F0F0]">
                    <TableCell className="p-4 text-center">
                      <Skeleton className="h-4 w-6"/>
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="h-4 w-24"/>
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="h-4 w-20"/>
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="h-4 w-32"/>
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="h-4 w-32"/>
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="h-4 w-16"/>
                    </TableCell>
                  </TableRow>
                ))
              ) : myOrders.length > 0 ? (
                myOrders.map((order: Order, idx) => (
                  <TableRow key={order.id} className="border-b border-[#F0F0F0]">
                    <TableCell className="text-center font-figtree text-xs font-medium text-black">{idx + 1}</TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">{order.name}</TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">{order.machineType}</TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {order.createdAt ? format(order.createdAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                    </TableCell>
                    <TableCell className="font-figtree text-xs font-medium text-black">
                      {order.expiredAt ? format(order.expiredAt, 'MMM dd, yyyy - HH:mm:ss') : '--'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {["Cancelled", "Closed"].includes(order.status) ? (
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
                            {order.status === 'Created' && (
                              <>
                                <DropdownMenuItem onClick={() => console.log('Request detail')}>
                                  <Link to={`/request/${order.id}`}> Request detail</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setOrderId(order.id)
                                    setOpenCancel(true)
                                  }}
                                  className="text-red-500"
                                >
                                  Cancel order
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            {order.status === 'Accepted' && (
                              <>
                                {/*<DropdownMenuItem onClick={() => {*/}
                                {/*  setOrderId(cluster.id)*/}
                                {/*  setShowOrderDetail(true)*/}
                                {/*}}>*/}
                                {/*  View detail*/}
                                {/*</DropdownMenuItem>*/}
                                <DropdownMenuItem onClick={() => console.log('Request detail')}>
                                  <Link to={`/request/${order.id}`}> Request detail</Link>
                                </DropdownMenuItem>
                                {/*<DropdownMenuItem onClick={() => console.log('Machine detail')}>*/}
                                {/*  <Link to={`/machine/${order.id}`}> Machine details</Link>*/}
                                {/*</DropdownMenuItem>*/}
                                {/*<DropdownMenuItem onClick={() => console.log('Upfront payment')}>*/}
                                {/*  <Link to={`/#`}> Payment history</Link>*/}
                                {/*</DropdownMenuItem>*/}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // No Data
                <TableRow>
                  <TableCell colSpan={7}>
                    <div
                      className="w-full text-center justify-center flex flex-col items-center h-full min-h-[300px] md:min-h-[500px]">
                      <img className="w-[93px] h-[83px] mx-auto mb-4" src={NoDataImg} alt="Desktop Background"/>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">No data
                          available</h2>
                        <p className="text-sm text-neutral-500">Connect your wallet and create new order</p>
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
        <Button
          variant="outline"
          className={`w-10 h-10 flex items-center justify-center border-0 bg-transparent `}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          <div>
            <RiArrowLeftSFill className={`w-6 h-6 ${page === 1 ? 'text-[#D9DEDE]' : 'text-[#181B1E]'}`}/>
          </div>
        </Button>
        <Button
          variant="outline"
          className={`w-10 h-10 flex items-center justify-center border-0 bg-transparent `}
          onClick={() => {
            setPage(p => p + 1)
          }}
        >
          <div>
            <RiArrowRightSFill className="w-6 h-6"/>
          </div>
        </Button>
      </div>
      
      <OrderDetail openOrderDetail={showOrderDetail} onClose={() => setShowOrderDetail(false)} id={orderId}/>
      <FilterOrderModal form={form} resetFilter={form.reset} applyFilter={onFilter} isOpen={openFilter}
                        onClose={() => setOpenFilter(false)}/>
      <OrderSortModal form={form} applyFilter={onFilter} isOpen={openSortFilter}
                      onClose={() => setOpenSortFilter(false)}/>
      
      <CancelOrder refetch={refetch} show={openCancel} onClose={() => setOpenCancel(false)}
                   id={orderId}/>
    </div>
  )
}

export default AllRequestSection