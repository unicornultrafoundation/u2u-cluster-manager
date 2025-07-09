import {z} from "zod";
import {toast} from "sonner"
import {parseEventLogs} from 'viem'
import BID_ABI from "@/abi/SUBNET_BID_MARKETPLACE.json";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateNewCluster} from "@/hooks/useCreateNewCluster";
import {convertTimeToDurationInSeconds} from "@/utils/datetime";
import {Link} from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import ILLUS from "@/assets/new_order_page/Illustration.png";
import SelectApplication from "@/pages/NewOrder/SelectApplication.tsx";
import {StepProgress} from "@/components/progress/StepProgress.tsx";
import {NewOrderForm} from "@/pages/NewOrder/NewOrderForm.tsx";
import OrderSummary from "@/pages/NewOrder/Summary.tsx";

export const formSchema = z.object({
  // name: z.string(),
  cpu: z.number().min(1),
  ram: z.number().min(1),
  gpu: z.number().min(1),
  disk: z.number().min(1),
  minBidPrice: z.number().min(1),
  maxBidPrice: z.number().min(1),
  downloadMbps: z.number(),
  uploadMbps: z.number(),
  rentingTime: z.string(),
  // typeOfWorkload: z.string(),
  description: z.string(),
  region: z.string(),
  machineType: z.string(),
  
});

const NewOrder = () => {
  const [step, setStep] = useState(1)
  const {createNewCluster} = useCreateNewCluster();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      cpu: 0,
      ram: 0,
      gpu: 0,
      disk: 0,
      rentingTime: "1d",
      region: "1",
      machineType: "1",
      // downloadMbps: 500,
      // uploadMbps: 200,
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const validated = await form.trigger();
    if(!validated) {
      return;
    }
    
    try {
      const rs = await createNewCluster({
        machineType: Number(values.machineType),
        duration: convertTimeToDurationInSeconds(values.rentingTime),
        minBidPrice: values.minBidPrice,
        maxBidPrice: values.maxBidPrice,
        region: Number(values.region),
        cpuCores: values.cpu,
        gpuCores: values.gpu,
        gpuMemory: values.gpu,
        memoryMB: values.ram * 1024,
        diskGB: values.disk,
        uploadMbps: values.uploadMbps,
        downloadMbps: values.downloadMbps,
        specs: values.description,
        
      })
      
      const parsedLogs = parseEventLogs({
        abi: BID_ABI,
        eventName: 'OrderCreated',
        logs: rs.logs,
      })
      
      if(parsedLogs[0]) {
        const orderId = Number((parsedLogs[0] as any).args.orderId);
        
        toast.success('Cluster created successfully', {
          description: () => (
            <div>
              <Link className="underline" to={`/cluster/${orderId}`}>View detail</Link>
            </div>
          ),
        });
      }
    } catch (error) {
      toast.error('Failed to create cluster', {
        description: `Failed to create cluster. Error: ${error}`,
      });
    }
  }
  
  const renderStep = () => {
    if(step === 1) {
      return <SelectApplication onContinue={() => setStep(2)}/>
    }
    if(step === 2) {
      return <NewOrderForm onContinue={() => setStep(3)} onBack={() => setStep(1)} form={form}/>
    }
    return <OrderSummary onBack={() => setStep(2)} form={form} onSubmit={onSubmit}/>
    
  }
  
  return (
    <div
      className=" flex flex-col items-center pt-6 md:pt-8 lg:pt-12 pb-10 md:pb-12 lg:pb-20 px-4 tablet: desktop:px-32 bg-neutral-50 ">
      <div className="w-full tablet:max-w-[768px] flex flex-col gap-6 tablet:gap-8">
        <div className="flex-1 space-y-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbPage>Create New Order</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="">
            <img
              src={ILLUS}
              alt="Create Cluster Illustration"
              className="w-28 h-28 mb-4"
            />
            <h1 className="text-2xl font-pixelyze font-normal uppercase tracking-tight text-[#181B1E]">
              Create New Order
            </h1>
            <p className="text-sm text-[#748382] font-normal mt-1">
              DeFIO will find the best provider based on what you need
            </p>
          </div>
        </div>
        <StepProgress currentStep={step}/>
        {renderStep()}
      </div>
    </div>
  );
};

export default NewOrder;
