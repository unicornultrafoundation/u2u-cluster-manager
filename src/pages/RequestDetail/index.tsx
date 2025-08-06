import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ILLUS from "@/assets/dashboard_page/request-detail.png";
import {useParams} from "react-router-dom";
import {useClusterDetail} from "@/hooks/useClusterDetail.ts";
import RequestDetailSection from "@/pages/RequestDetail/RequestDetailSection.tsx";
import ProviderOfferSection from "@/pages/RequestDetail/ProviderOfferSection.tsx";
import ProviderInformationSection from "@/pages/RequestDetail/ProviderInformationSection.tsx";
import {useMemo} from "react";

const RequestDetail = () => {
  const {id} = useParams();
  const {clusterDetail, refetch} = useClusterDetail(id as string);
  
  const machineStatus = useMemo(() => {
    if (!clusterDetail) return '';
    return clusterDetail.status
  }, [clusterDetail]);
  
  return (
    <div
      className=" w-full lg:pt-12 lg:pb-[94px] lg:px-[64px] md:pt-8 md:pb-[72px] md:px-8 pt-6 px-4 pb-12 gap-16 min-h-screen bg-stone-50">
      <div
        className="w-full h-full inline-flex flex-col justify-start items-start gap-8 "
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbPage>Request Detail</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="self-stretch flex flex-col justify-center items-start gap-4">
          <img src={ILLUS} alt="illus" className="w-28 py-5 px-2"/>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">
              request details
            </div>
            <div className="justify-start text-gray-500 text-sm font-normal font-['Figtree'] leading-normal">
              View all information of your request
            </div>
          </div>
        </div>
        <RequestDetailSection data={clusterDetail}/>
        <hr className="self-stretch h-0 my-8 outline outline-1 outline-offset-[-0.50px] outline-gray-300"/>
        {machineStatus === 'Accepted' ? (
          <ProviderInformationSection clusterDetail={clusterDetail} refetch={refetch}/>
        ) : (
          <ProviderOfferSection/>
        )}
        
      
      </div>
    </div>
  );
};

export default RequestDetail;
