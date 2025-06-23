import ILLUS from "@/assets/new_cluster_page/illus.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiInformationFill } from "@remixicon/react";
import { formSchema } from ".";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const NewClusterForm = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  return (
    <div className="flex-1 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Overview</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Create New Cluster</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-8">
        <h1 className="text-2xl font-pixelyze font-normal uppercase tracking-tight text-[#181B1E]">
          Create New Cluster
        </h1>
        <img
          src={ILLUS}
          alt="Create Cluster Illustration"
          className="w-28 h-28 mb-2"
        />
        <p className="text-sm text-[#748382] font-normal mt-1">
          Powered by DeFio
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 py-8 w-full"
        >
          {/* Total CPU Cores */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="cpu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Total CPU cores <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>
                          CPU (Central Processing Unit) core is the heart of a
                          computer's processing power. It's a single processing
                          unit within the CPU that can execute instructions and
                          handle tasks independently. Think of it as the actual
                          "brain" that performs calculations and manages the
                          computer's operations.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                        placeholder="Ex: 16"
                        className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                      />
                      <span className="text-[#929E9D] text-sm">Cores</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[#748382]">Available:</span>
                      <Button
                        onClick={() => form.setValue("cpu", 48)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        48 Cores
                      </Button>
                      <Button
                        onClick={() => form.setValue("cpu", 64)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        64 Cores
                      </Button>
                      <Button
                        onClick={() => form.setValue("cpu", 128)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        128 Cores
                      </Button>
                      <Button
                        onClick={() => form.setValue("cpu", 256)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        256 Cores
                      </Button>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Total RAM Memory */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Total RAM memory <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>
                          RAM (Random Access Memory) is the computer's
                          short-term memory where data is stored that the CPU
                          (Central Processing Unit) needs to quickly access
                          while a program is running. Think of it as your
                          computer's workspace for active processes. RAM is
                          volatile, meaning data is lost when the power is
                          turned off.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                        placeholder="Ex: 24"
                        className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                      />
                      <span className="text-[#929E9D] text-sm">GB</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[#748382]">Available:</span>
                      <Button
                        onClick={() => form.setValue("ram", 16)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        16 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("ram", 24)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        24 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("ram", 48)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        48 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("ram", 64)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        64 GB
                      </Button>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Total GPU Memory */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="gpu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Total GPU memory <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>
                          GPU memory, also known as Video RAM (VRAM), is a type
                          of memory specifically designed for use within a
                          graphics processing unit (GPU). Unlike regular system
                          RAM, GPU memory is optimized for rapid access and
                          handling large datasets required for graphics
                          rendering, machine learning, and other computationally
                          intensive tasks.{" "}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                        placeholder="Ex: 64"
                        className="w-32 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                      />
                      <span className="text-[#929E9D] text-sm">GB</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[#748382]">Available:</span>
                      <Button
                        onClick={() => form.setValue("gpu", 64)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        64 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("gpu", 96)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        96 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("gpu", 128)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        128 GB
                      </Button>
                      <Button
                        onClick={() => form.setValue("gpu", 256)}
                        size="sm"
                        variant="outline"
                        className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
                      >
                        256 GB
                      </Button>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Renting Time Dropdown */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="rentingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Renting time <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Info about active time</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                        <SelectValue placeholder="Select time..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1d">1 day</SelectItem>
                        <SelectItem value="3d">3 days</SelectItem>
                        <SelectItem value="1w">1 week</SelectItem>
                        <SelectItem value="2w">2 weeks</SelectItem>
                        <SelectItem value="1m">1 month</SelectItem>
                        <SelectItem value="3m">3 months</SelectItem>
                        <SelectItem value="6m">6 months</SelectItem>
                        <SelectItem value="1y">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Type of Workload Dropdown */}
          {/* <div className="space-y-1">
            <FormField
              control={form.control}
              name="typeOfWorkload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type of workload <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Info about type of workload</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-none w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ml">Machine Learning</SelectItem>
                        <SelectItem value="data">Data Processing</SelectItem>
                        <SelectItem value="web">Web Hosting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          {/* Bid price */}
          <div className="flex gap-4">
            <div className="space-y-1 flex-1">
              <FormField
                control={form.control}
                name="minBidPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Min bid price<span className="text-[#EC003F]">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center relative">
                        <Input
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          type="number"
                          placeholder="Ex: 16 USD"
                          className="w-full pr-4 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                        />
                        <span className="text-[#929E9D] text-sm absolute right-4">USD</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1 flex-1">
              <FormField
                control={form.control}
                name="maxBidPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max bid price<span className="text-[#EC003F]">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center relative">
                        <Input
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          type="number"
                          placeholder="Ex: 16 USD"
                          className="w-full pr-4 px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                        />
                        <span className="text-[#929E9D] text-sm absolute right-4">USD</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Region */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Region <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Select cluster region</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                        <SelectValue placeholder="Select region..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">US Central (us-central1)</SelectItem>
                        <SelectItem value="2">US East (us-east1)</SelectItem>
                        <SelectItem value="3">US East 4 (us-east4)</SelectItem>
                        <SelectItem value="4">US West (us-west1)</SelectItem>
                        <SelectItem value="5">Europe West 1 (europe-west1)</SelectItem>
                        <SelectItem value="6">Europe West 2 (europe-west2)</SelectItem>
                        <SelectItem value="7">Europe West 3 (europe-west3)</SelectItem>
                        <SelectItem value="8">Asia East 1 (asia-east1)</SelectItem>
                        <SelectItem value="9">Asia Northeast 1 (asia-northeast1)</SelectItem>
                        <SelectItem value="10">Asia Southeast 1 (asia-southeast1)</SelectItem>
                        <SelectItem value="11">Australia Southeast 1 (australia-southeast1)</SelectItem>
                        <SelectItem value="12">South America East 1 (southamerica-east1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Machine type */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="machineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Machine type <span className="text-[#EC003F]">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Select cluster type</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Docker</SelectItem>
                        <SelectItem value="2">Kubernetes</SelectItem>
                        <SelectItem value="3">Kvm</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Cluster Special Requirement */}
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                    <Tooltip>
                      <TooltipTrigger>
                        <RiInformationFill className="w-4 h-4 text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Cluster's special requirement
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter cluster's special requirement..."
                      className="w-full px-4 py-3 border border-[#EEF0F0] bg-white text-[#181B1E] focus:outline-none focus:ring-2 focus:ring-[#56A890]"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-[#748382] mt-1">
                    Cluster's special requirement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewClusterForm;
