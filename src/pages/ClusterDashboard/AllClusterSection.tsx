import { useState } from 'react'
import { RiMoreLine, RiAddLine, RiFileCopyLine, RiArrowDownSLine, RiArrowLeftSFill, RiArrowRightSFill } from '@remixicon/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useMyOrder } from '@/hooks/useMyOrder'
import { Cluster } from '@/types/cluster'

const AllClusterSection = () => {
  const { myOrders } = useMyOrder()

  const [selectedType, setSelectedType] = useState('All types')
  const [selectedStatus, setSelectedStatus] = useState('All status')
  const [selectedDateCreated, setSelectedDateCreated] = useState('Date created')
  const [selectedDateExpired, setSelectedDateExpired] = useState('Date expired')

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(20)

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">All Clusters</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between rounded-none">
                {selectedType}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] rounded-none'>
              <DropdownMenuItem onClick={() => setSelectedType('All types')}>
                All types
              </DropdownMenuItem>
              {/* Add more types */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between rounded-none">
                {selectedStatus}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] rounded-none'>
              <DropdownMenuItem onClick={() => setSelectedStatus('All status')}>
                All status
              </DropdownMenuItem>
              {/* Add more statuses */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between rounded-none">
                {selectedDateCreated}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] rounded-none'>
              <DropdownMenuItem onClick={() => setSelectedDateCreated('Date created')}>
                Date created
              </DropdownMenuItem>
              {/* Add more date options */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between rounded-none">
                {selectedDateExpired}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] rounded-none'>
              <DropdownMenuItem onClick={() => setSelectedDateExpired('Date expired')}>
                Date expired
              </DropdownMenuItem>
              {/* Add more date options */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* <Button variant="default" size="default" className="w-full md:w-auto rounded-none">
            <RiAddLine className="w-5 h-5" />
            Create New Cluster
          </Button> */}
          <Link to="/cluster/new">
            <Button variant="default" size="default" className="w-full md:w-auto rounded-none">
              <RiAddLine className="w-5 h-5" />
              Create New Cluster
            </Button>
          </Link>
        </div>
      </div>

      {/* Table with horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto border border-[#EEF0F0]">
        <div className="min-w-[960px]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#F0F0F0]">
                <TableHead className="w-12 text-center font-figtree text-xs font-semibold text-[#4D5756]">ID</TableHead>
                <TableHead className="font-figtree text-xs font-semibold text-[#4D5756]">Overlay IP</TableHead>
                <TableHead className="font-figtree text-xs font-semibold text-[#4D5756]">Public IP</TableHead>
                <TableHead className="font-figtree text-xs font-semibold text-[#4D5756]">Date Created</TableHead>
                <TableHead className="font-figtree text-xs font-semibold text-[#4D5756]">Date Expired</TableHead>
                <TableHead className="font-figtree text-xs font-semibold text-[#4D5756]">Status</TableHead>
                <TableHead className="text-right font-figtree text-xs font-semibold text-[#4D5756]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myOrders?.map((cluster: Cluster) => (
                <TableRow key={cluster.id} className="border-b border-[#F0F0F0]">
                  <TableCell className="text-center font-figtree text-xs font-medium text-[#262B2B]">{cluster.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-figtree text-xs font-medium text-[#181B1E]">
                        {cluster.acceptedMachine?.overlayIp || "--"}
                      </span>
                      <button onClick={() => navigator.clipboard.writeText(cluster.acceptedMachine?.overlayIp || "")}>
                        <RiFileCopyLine className="w-4 h-4 text-[#929E9D]" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-figtree text-xs font-medium text-[#181B1E]">
                        {cluster.acceptedMachine?.publicIp || "--"}
                      </span>
                      <button onClick={() => navigator.clipboard.writeText(cluster.acceptedMachine?.publicIp || "")}>
                        <RiFileCopyLine className="w-4 h-4 text-[#929E9D]" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="font-figtree text-xs font-medium text-[#262B2B]">
                    {cluster.createdAt?.toLocaleString() || "--"}
                  </TableCell>
                  <TableCell className="font-figtree text-xs font-medium text-[#262B2B]">
                    {cluster.expiredAt?.toLocaleString() || "--"}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cluster.status)}`}>
                      {cluster.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="p-2 hover:bg-accent rounded-full">
                      <RiMoreLine className="w-5 h-5 text-[#8D8D8D]" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
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
          <RiArrowLeftSFill className={`w-6 h-6 ${currentPage === 1 ? 'text-[#D9DEDE]' : 'text-[#181B1E]'}`} />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-[#EEF0F0] rounded-full text-sm font-medium text-[#181B1E]">1</button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-full text-sm font-medium text-[#929E9D]">2</button>
          <span className="text-sm text-[#929E9D]">...</span>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-full text-sm font-medium text-[#929E9D]">19</button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-full text-sm font-medium text-[#929E9D]">20</button>
        </div>
        <button 
          className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage !== totalPages ? 'hover:bg-accent' : ''}`}
          disabled={currentPage === totalPages}
        >
          <RiArrowRightSFill className={`w-6 h-6 ${currentPage === totalPages ? 'text-[#D9DEDE]' : 'text-[#181B1E]'}`} />
        </button>
      </div>
    </div>
  )
}

export default AllClusterSection