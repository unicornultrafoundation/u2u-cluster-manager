import BILL_BACKGROUND from "@/assets/new_cluster_page/bill_background.png";
import NewClusterForm from "./NewClusterForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const formSchema = z.object({
  name: z.string(),
  cpu: z.number().min(1),
  ram: z.number().min(1),
  gpu: z.number().min(1),
  activeTime: z.string(),
  typeOfWorkload: z.string(),
});

const NewCluster = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpu: 0,
      ram: 0,
      gpu: 0,
      activeTime: "",
      typeOfWorkload: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function renderTypeOfWorkload(typeOfWorkload: string) {
    switch (typeOfWorkload) {
      case "ml":
        return "Machine Learning";
      case "data":
        return "Data Processing";
      case "web":
        return "Web Hosting";
      case "other":
        return "Other";
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
          <div className="relative z-10 p-6 w-full h-full flex-1">
            <div className="justify-start text-zinc-900 text-lg font-normal font-['Pixelyze'] uppercase leading-7">
              Summary
            </div>
            <div className="self-stretch flex-1 inline-flex flex-col justify-start items-start gap-4 w-full">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Cluster name
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {form.watch("name")}
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
                  {form.watch("activeTime")}
                </div>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-gray-500 text-base font-medium font-['Figtree'] leading-normal">
                  Type
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-['Figtree'] leading-normal">
                  {renderTypeOfWorkload(form.watch("typeOfWorkload"))}
                </div>
              </div>
            </div>
            <div>
              abc
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCluster;
