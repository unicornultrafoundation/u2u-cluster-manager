import {Button} from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {formSchema} from "@/pages/NewOrder/index.tsx";
import {useMemo} from "react";
const systemFeeData = [
  {label: "Network", value: "U2U"},
  {label: "Transaction fee", value: "0.05 U2U"},
]

interface OrderSummaryProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function OrderSummary({ form }: OrderSummaryProps) {
  const values = form.watch();
  
  
  function renderRentingTime(typeOfWorkload: string) {
    switch (typeOfWorkload) {
      case "1d":
        return "1 day";
      case "3d":
        return "3 days";
      case "1w":
        return "1 week";
      case "2w":
        return "2 weeks";
      case "1m":
        return "1 month";
      case "3m":
        return "3 months";
      case "6m":
        return "6 months";
      case "1y":
        return "1 year";
    }
  }
  
  const summaryFields = [
    { label: "Total CPU", value: `${values.cpu} Cores` },
    { label: "Total RAM", value: `${values.ram} GB` },
    { label: "Total Disk", value: `${values.disk} GB` },
    { label: "Total GPU", value: `${values.gpu} GB` },
    { label: "Renting time", value: renderRentingTime(values.rentingTime) },
    { label: "Region", value: values.region },
    { label: "Machine Type", value: values.machineType },
    { label: "Description", value: values.description || "--" },
  ];
  
  
  const [cpu, ram, gpu, rentingTime] = form.watch(["description", "cpu", "ram", "gpu", "rentingTime"]);
  
  const estimatePrice = useMemo(() => {
    return 0;
  }, [cpu, ram, gpu, rentingTime]);
  
  return (
    <div
      className=" bg-white p-4 tablet:p-6 rounded-md desktop:max-w-[768px] w-full  mx-auto overflow-hidden">
      
      
      {/* Content */}
      <div className="">
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
        {/* Dotted Line Separator */}
        <div className="relative my-6">
          {/* Dotted line */}
          <div className="border-t border-dashed border-[#E5E7EB]"/>
          
          {/* Left circle */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
          
          {/* Right circle */}
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
        </div>
        
        
        <div className="space-y-6 text-sm ">
          {systemFeeData.map(({label, value}) => (
            <div
              key={label}
              className="flex justify-between"
            >
              <span className="text-neutral-500">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
          
          {/* Total */}
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-neutral-500">Total cost upfront</p>
            <p className="text-[#181B1E] font-title tracking-tight text-2xl">
              10.02 U2U
            </p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex tablet:flex-row flex-col-reverse justify-between gap-4 pt-7">
          <Button
            type="button"
            variant="outline"
            className="bg-[#F2F4F4] text-[#181B1E] w-full px-8 py-3  border-none"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="bg-black text-white w-full px-8 py-3  hover:bg-neutral-900"
          >
            Proceed to payment
          </Button>
        </div>
      </div>
    </div>
  )
}
