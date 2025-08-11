import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiAddLine, RiArrowDownLine, RiCloseLine} from "@remixicon/react";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import type {Order} from "@/types";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import ResourcePaymentDetail from "@/pages/MachineDetail/ResourcePaymentDetail.tsx";

export const formEditResourceSchema = z.object({
  cpu: z.number().optional(),
  ram: z.number().optional(),
  gpu: z.number().optional(),
});
type EditResourceFormType = z.infer<typeof formEditResourceSchema>;

const AVAILABLE_OPTIONS = {
  cpu: ["48", "64", "128", "256"],
  ram: ["48", "64", "128", "256"],
  gpu: ["48", "64", "128", "256"],
};

type FieldBlockProps = {
  label: string;
  placeholder: string;
  suffix: string;
  fieldName: keyof EditResourceFormType;
  options: string[];
  register: ReturnType<typeof useForm<EditResourceFormType>>["register"];
  setValue: ReturnType<typeof useForm<EditResourceFormType>>["setValue"];
};

const FieldBlock = ({
                      label,
                      placeholder,
                      suffix,
                      fieldName,
                      options,
                      register,
                      setValue,
                    }: FieldBlockProps) => (
  <div>
    <div className="flex items-center text-sm font-medium text-[#181B1E]">
      {label}
      <span className="ml-2 text-gray-400 cursor-help">&#9432;</span>
    </div>
    <div className="flex items-center mt-1 bg-white px-3 py-2">
      <Input
        type="number"
        {...register(fieldName)}
        placeholder={placeholder}
        className="w-full p-0 border rounded  text-sm focus:outline-none focus:ring "
      />
      <span className=" text-gray-500 text-sm">{suffix}</span>
    </div>
    <div className="flex flex-wrap items-center  gap-2 mt-2 ">
      <div className=" text-sm text-gray-500">Available:</div>
      <div className="flex flex-wrap gap-2 ">
        {options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => setValue(fieldName, Number(opt))}
            className="border px-2 py-1 rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
          >
            {opt} {suffix}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EditResource = ({orderDetail}: { orderDetail: Order }) => {
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  
  const form = useForm<EditResourceFormType>({
    resolver: zodResolver(formEditResourceSchema),
    defaultValues: {
      cpu: 0,
      ram: 0,
      gpu: 0,
    },
  });
  
  const {register, setValue, watch} = form;
  const cpu = watch("cpu");
  const ram = watch("ram");
  const gpu = watch("gpu");
  
  const estimatedPrice =
    (cpu ?? 0) * 2 +
    (ram ?? 0) * 1 +
    (gpu ?? 0) * 3;
  
  return (
    <>
      <Sheet open={openEditSheet} onOpenChange={setOpenEditSheet}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex-1 flex border-0">
            <RiAddLine className="w-6 h-6 text-neutral-400"/>
            <span className="ml-2 text-neutral-600 text-base font-semibold font-['Figtree']">
            Request new resources
          </span>
          </Button>
        </SheetTrigger>
        <SheetContent showCloseButton={false}
                      className="w-full md:max-w-[480px] lg:max-w-[560px] flex flex-col justify-between p-4 md:p-6 bg-neutral-50 overflow-y-auto">
          <div>
            <SheetHeader className="flex flex-row items-center justify-between px-0 space-y-0">
              <SheetTitle className="text-2xl !font-normal uppercase">Request New Resources</SheetTitle>
              <SheetClose onClick={() => setOpenEditSheet(false)} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-[#181B1E]"/>
              </SheetClose>
            </SheetHeader>
            {/* Resource Summary */}
            <div className="relative mt-6">
              {/* corner dots */}
              {["top-10 lg:top-5 left-0", "top-10 lg:top-5 right-0", "bottom-10 lg:bottom-5 left-0", "bottom-10 lg:bottom-5 right-0"].map((pos, i) => (
                <div key={i} className={`absolute w-3 h-3 bg-white ${pos}`}/>
              ))}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-4 lg:p-6 bg-[#1C1F22] text-white text-center">
                {[
                  {
                    label: "Total CPU cores",
                    original: `${orderDetail.cpuCores} Cores`,
                    updated: cpu ? `${cpu} Cores` : "----",
                  },
                  {
                    label: "Total RAM memory",
                    original: `${orderDetail.memoryMB} GB`,
                    updated: ram ? `${ram} GB` : "----",
                  },
                  {
                    label: "Total GPU memory",
                    original: `${orderDetail.gpuMemory} GB`,
                    updated: gpu ? `${gpu} GB` : "----",
                  },
                ].map((item, i) => (
                  <div key={i} className=" flex flex-col items-center justify-center gap-4 lg:gap-1">
                    <p className="text-xs text-neutral-500 uppercase">{item.label}</p>
                    <div className="flex lg:flex-col items-center gap-2 justify-center">
                      <div className="text-xl font-title tracking-wider uppercase">{item.original}</div>
                      <RiArrowDownLine className="w-6 h-6 text-[#9C8EFF] -rotate-90 lg:rotate-0"/>
                      <div className="text-[#9CA3AF] text-xl font-title tracking-widest uppercase">{item.updated}</div>
                    </div>
                  
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <div className="w-full h-2 bg-neutral-700"/>
              <div className="w-full h-2 bg-neutral-700"/>
            </div>
            {/* Form Fields */}
            <div className="mt-8 space-y-8">
              <FieldBlock
                label="New Total CPU cores"
                placeholder="Ex: 16"
                suffix="Cores"
                fieldName="cpu"
                register={register}
                setValue={setValue}
                options={AVAILABLE_OPTIONS.cpu}
              />
              <FieldBlock
                label="New Total RAM memory"
                placeholder="Ex: 16"
                suffix="GB"
                fieldName="ram"
                register={register}
                setValue={setValue}
                options={AVAILABLE_OPTIONS.ram}
              />
              <FieldBlock
                label="New Total GPU memory"
                placeholder="Ex: 16"
                suffix="GB"
                fieldName="gpu"
                register={register}
                setValue={setValue}
                options={AVAILABLE_OPTIONS.gpu}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mt-8">
              <div className=" text-sm text-neutral-500">Estimate price</div>
              <div className=" text-xl  font-title !font-normal text-[#181B1E]">
                {estimatedPrice ? `${estimatedPrice.toFixed(2)} U2U` : "----"}
              </div>
            </div>
            <Button
              className="mt-2 w-full"
              disabled={estimatedPrice === 0}
              onClick={() => {
                setOpenPayment(true)
                setOpenEditSheet(false);
              }}
            >
              Continue
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <ResourcePaymentDetail form={form} orderDetail={orderDetail} openPaymentDetail={openPayment}
                             onClose={() => setOpenPayment(false)}/>
    </>
  );
};

export default EditResource;
