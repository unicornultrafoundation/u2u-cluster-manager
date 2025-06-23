import BILL_BACKGROUND from "@/assets/new_cluster_page/bill_background.png";
import NewClusterForm from "./NewClusterForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RiInformationFill } from "@remixicon/react";
import { useMemo } from "react";
import { useCreateNewCluster } from "@/hooks/useCreateNewCluster";

export const formSchema = z.object({
  // name: z.string(),
  cpu: z.number().min(1),
  ram: z.number().min(1),
  gpu: z.number().min(1),
  minBidPrice: z.number().min(1),
  maxBidPrice: z.number().min(1),
  rentingTime: z.string(),
  // typeOfWorkload: z.string(),
  description: z.string(),
  region: z.string(),
  machineType: z.string(),
});

const NewCluster = () => {
  const { createNewCluster } = useCreateNewCluster();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      cpu: 0,
      ram: 0,
      gpu: 0,
      rentingTime: "1d",
      region: "1",
      machineType: "1",
    },
  });

  const [cpu, ram, gpu, rentingTime] = form.watch(["description", "cpu", "ram", "gpu", "rentingTime"]);

  const estimatePrice = useMemo(() => {
    return 0;
  }, [cpu, ram, gpu, rentingTime]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const validated = await form.trigger();
    console.log('validated', validated);
    if (!validated) {
      return;
    }

    console.log(values);
    // createNewCluster({
    //   machineType: 0,
    //   duration: 0,
    //   minBidPrice: 0,
    //   maxBidPrice: 0,
    //   region: 0,
    //   cpuCores: 0,
    //   gpuCores: 0,
    //   gpuMemory: 0,
    //   memoryMB: 0,
    //   diskGB: 0,
    //   uploadMbps: 0,
    //   downloadMbps: 0,
    //   specs: "",
    // })
  }

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

  return (
    <div className="flex flex-col justify-between md:flex-row gap-6 md:gap-16 lg:gap-20 py-6 md:py-8 lg:py-12 px-4 md:px-32 bg-stone-50">
      {/* Left: Form Section */}
      <NewClusterForm form={form} onSubmit={onSubmit} />
      {/* Right: Summary bill section */}
      <div className="flex-1">
        <div className="sticky top-24 z-2 h-[476px] w-[560px] flex flex-col">
          <img
            src={BILL_BACKGROUND}
            alt="Bill Background"
            className="object-cover absolute top-0 left-0 right-0 h-[476px] w-[560px]"
          />
          <div className="relative z-10 p-6 w-full h-full flex-1 flex flex-col">
            <div className="justify-start text-zinc-900 text-lg font-normal font-['Pixelyze'] uppercase leading-7">
              Summary
            </div>
            <div className="self-stretch flex-1 inline-flex flex-col justify-start items-start gap-4 w-full">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Requirement
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {form.watch("description")}
                </div>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Total CPU
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {form.watch("cpu")} Cores
                </div>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Total RAM
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {form.watch("ram")} GB
                </div>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Total GPU
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {form.watch("gpu")} GB
                </div>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Renting time
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {renderRentingTime(form.watch("rentingTime"))}
                </div>
              </div>
              {/* <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Type
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {renderTypeOfWorkload(form.watch("typeOfWorkload"))}
                </div>
              </div> */}
            </div>
            <div className="flex flex-col gap-4">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">Estimate price</div>
                  <RiInformationFill className="w-5 h-5 text-stone-300" />
                </div>
                <div className="justify-center text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">
                  {estimatePrice === 0 ? '---' : `${estimatePrice}`}
                </div>
            </div>
              <Button className="w-full" onClick={() => onSubmit(form.getValues())}>
                Proceed to payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCluster;
