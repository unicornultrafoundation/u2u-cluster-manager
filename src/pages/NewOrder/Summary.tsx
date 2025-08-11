import {Button} from "@/components/ui/button"
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/pages/NewOrder/index.tsx";
import {useMemo} from "react";
import {RENTING_TIMES} from "@/config/constant.ts";
import { getRegionCode } from "@/utils/region";
import { getMachineType } from "@/utils/machine";

interface OrderSummaryProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onBack?: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export default function OrderSummary({form, onSubmit, onBack, isLoading}: OrderSummaryProps) {
  const values = form.watch();
  
  
  const summaryFields = [
    {label: "Total CPU", value: `${values.cpu} Cores`},
    {label: "Total RAM", value: `${values.ram} GB`},
    {label: "Total Disk", value: `${values.disk} GB`},
    {label: "Total GPU", value: `${values.gpu} GB`},
    {label: "Renting time", value: RENTING_TIMES[values.rentingTime] || values.rentingTime},
    {label: "Region", value: getRegionCode(values.region)},
    {label: "Machine Type", value: getMachineType(values.machineType)},
    {label: "Description", value: values.description || "--"},
  ];
  
  
  const [cpu, ram, gpu, rentingTime] = form.watch(["cpu", "ram", "gpu", "rentingTime"]);
  
  const estimatePrice = useMemo(() => {
    return 0;
  }, [cpu, ram, gpu, rentingTime]);
  
  return (
    <div className=" bg-white p-4 tablet:p-6 rounded-md desktop:max-w-[768px] w-full  mx-auto overflow-hidden">
      {/* Content */}
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form.getValues());
      }}>
        <p className=" font-title text-lg mb-3 tracking-widest text-[#181B1E]">
          SUMMARY
        </p>
        
        <div className="space-y-3">
          {summaryFields.map(({label, value}) => (
            <div
              key={label}
              className="flex justify-between text-sm text-[#181B1E]"
            >
              <span className="text-neutral-500">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="relative my-6">
          <div className="border-t border-dashed border-[#E5E7EB]"/>
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
        </div>
        <div className="space-y-6 text-sm ">
          <div
            className="flex justify-between"
          >
            <span className="text-neutral-500">Transaction fee</span>
            <span className="font-medium">0.05 U2U</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-neutral-500">Total cost upfront</p>
            <p className="text-[#181B1E] font-title tracking-tight text-2xl">
              {estimatePrice === 0 ? '---' : `${estimatePrice}`} U2U
            </p>
          </div>
        </div>
        <div className="flex tablet:flex-row flex-col-reverse justify-between gap-4 pt-7">
          <Button
            onClick={onBack}
            type="button"
            variant="outline"
            className="bg-[#F2F4F4] text-[#181B1E] w-full px-8 py-3  border-none"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white w-full px-8 py-3  hover:bg-neutral-900"
          >
            Send request
          </Button>
        </div>
      </form>
    </div>
  )
}
