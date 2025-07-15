import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button"
import {RiInformationFill} from "@remixicon/react"
import {Path, PathValue, UseFormReturn} from "react-hook-form"
import {z} from "zod"
import {formSchema} from "."
import u2u from "@/assets/u2u_logo.png";
import {RENTING_TIMES} from "@/config/constant.ts";
import { getMachineType } from "@/utils/machine"

const LabelWithTooltip = ({
                            label,
                            tooltip,
                            required = false,
                            
                          }: {
  label: string
  tooltip?: string
  required?: boolean
  
}) => (
  <FormLabel className="flex items-center gap-1">
    {label}
    {required && <span className="text-[#EC003F]">*</span>}
    {tooltip && (
      <Tooltip>
        <TooltipTrigger>
          <RiInformationFill className="w-4 h-4 text-neutral-300"/>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="max-w-sm text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    )}
  </FormLabel>
)

export const NewOrderForm =  ({
                               form,
                               onBack,
                               onContinue,
                             }: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  onBack: () => void
  onContinue: () => void
}) => {
  
  
  const FORMS = [
    {
      name: "cpu",
      label: "Total CPU cores",
      unit: "Cores",
      tooltip:
        "CPU (Central Processing Unit) core is the heart of a computer's processing power. It's a single processing unit within the CPU that can execute instructions and handle tasks independently. Think of it as the actual brain that performs calculations and manages the computer's operations.",
    },
    {
      name: "ram",
      label: "Total RAM memory",
      unit: "GB",
      tooltip:
        "RAM (Random Access Memory) is the computer short-term memory where data is stored that the CPU (Central Processing Unit) needs to quickly access while a program is running. Think of it as your computer's workspace for active processes. RAM is volatile, meaning data is lost when the power is turned off.",
    },
    {
      name: "gpu",
      label: "Total GPU memory",
      unit: "GB",
      tooltip:
        "GPU memory, also known as Video RAM (VRAM), is a type of memory specifically designed for use within a graphics processing unit (GPU). Unlike regular system RAM, GPU memory is optimized for rapid access and handling large datasets required for graphics rendering, machine learning, and other computationally intensive tasks.",
    },
    {
      name: "disk",
      label: "Total Disk",
      unit: "GB",
      tooltip:
        "Disk is a storage device that stores data on a physical medium, such as a hard drive or solid-state drive. It is used to store and retrieve data, and is an essential component of any computer system.",
    },
  ]
  
  
  const AvailableOptions = <
    TFieldName extends Path<z.infer<typeof formSchema>>
  >({
      name,
      unit,
      options,
      setValue,
    }: {
    name: TFieldName
    unit: string
    options: PathValue<z.infer<typeof formSchema>, TFieldName>[]
    setValue: UseFormReturn<z.infer<typeof formSchema>>["setValue"]
  }) => (
    <FormDescription>
      <div className="flex items-center gap-2 my-2 flex-wrap">
        <span className="text-xs text-[#748382]">Available:</span>
        {options.map((val) => (
          <Button
            type="button"
            key={val}
            onClick={() =>{
              setValue(name, val)
              form.trigger(name)
            }}
            size="sm"
            variant="outline"
            className="px-3 py-0 border border-[#D9DEDE] rounded text-xs text-[#181B1E]"
          >
            {val} {unit}
          </Button>
        ))}
      </div>
    </FormDescription>
  )
  
  
  const availableOptionsMap: Record<string, number[]> = {
    cpu: [4, 8, 16, 32],
    ram: [16, 24, 48, 64],
    gpu: [64, 96, 128, 256],
    disk: [256, 512, 1024, 2048],
  }
  
  
  return (
    <div className="bg-white p-4 tablet:p-6 rounded-md w-full  mx-auto">
      <Form {...form}>
        <form  className="flex flex-col gap-2"
               onSubmit={form.handleSubmit(() => onContinue())}
        >
        
        {/* Application Display */}
          <div className="space-y-2">
            <FormLabel>Application</FormLabel>
            <div
              className="w-full px-4 py-3 border border-[#EEF0F0] rounded bg-[#F8F9F9] flex items-center gap-2">
              <img src={u2u} alt="logo" className="w-6 h-6 rounded-full"/>
              <span className="text-sm text-[#181B1E] font-medium">U2U</span>
            </div>
          </div>
          
          {/* CPU, RAM, GPU, Disk */}
          {FORMS.map(({name, label, unit, tooltip}) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof formSchema>}
              render={({field}) => (
                <FormItem>
                  <LabelWithTooltip label={label} tooltip={tooltip} required/>
                  <FormControl>
                    <div className="flex gap-2 items-center relative ">
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E] !ring-0"
                      />
                      <span className="absolute right-3 text-sm text-[#929E9D]">
                        {unit}
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    <AvailableOptions
                      name={name as keyof z.infer<typeof formSchema>}
                      unit={unit}
                      options={availableOptionsMap[name]}
                      setValue={form.setValue}
                    />
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          ))}
          {/* Renting Time */}
          <FormField
            control={form.control}
            name="rentingTime"
            render={({field}) => (
              <FormItem>
                <LabelWithTooltip label="Active time" required tooltip="Info about active time"/>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 !h-12 text-[#181B1E]">
                      <SelectValue placeholder="Select time..."/>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RENTING_TIMES).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          
          {/* Bid Price */}
          <div className="flex flex-col tablet:flex-row gap-4 ">
            {["minBidPrice", "maxBidPrice"].map((name, idx) => (
              <div className="flex-1 space-y-2" key={name}>
                <FormField
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({field}) => (
                    <FormItem>
                      <LabelWithTooltip
                        label={idx === 0 ? "Minimum bid price" : "Maximum bid price"}
                        required
                      />
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E] !ring-0"
                          />
                          <span
                            className="absolute right-3 top-3 text-sm text-[#929E9D]">USD</span>
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          
          {/* DownloadMbps UploadMbps */}
          <div className="flex flex-col tablet:flex-row gap-4 ">
            {["downloadMbps", "uploadMbps"].map((name, idx) => (
              <div className="flex-1 space-y-2" key={name}>
                <FormField
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({field}) => (
                    <FormItem>
                      <LabelWithTooltip
                        label={idx === 0 ? "Download MB/s" : "Upload MB/s"}
                        required
                      />
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E] !ring-0"
                          />
                          <span
                            className="absolute right-3 top-3 text-sm text-[#929E9D]">MB</span>
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          
          {/* Region */}
          <FormField
            control={form.control}
            name="region"
            render={({field}) => (
              <FormItem>
                <LabelWithTooltip label="Region" required tooltip="Select cluster region"/>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 !h-12 text-[#181B1E] ">
                      <SelectValue placeholder="Select region..."/>
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
                <FormMessage/>
              </FormItem>
            )}
          />
          
          {/* Machine Type */}
          <FormField
            control={form.control}
            name="machineType"
            render={({field}) => (
              <FormItem>
                <LabelWithTooltip label="Machine Type" required tooltip="Select cluster type"/>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 !h-12   text-[#181B1E]">
                      <SelectValue placeholder="Select type..."/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{getMachineType("1")}</SelectItem>
                      <SelectItem value="2">{getMachineType("2")}</SelectItem>
                      <SelectItem value="3">{getMachineType("3")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <LabelWithTooltip label="Description" tooltip="Cluster's special requirement"/>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter cluster's special requirement..."
                    className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E] !ring-0"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          
          {/* Buttons */}
          <div className="flex flex-col tablet:flex-row justify-between pt-6 gap-4">
            <Button
              onClick={() => onBack()}
              type="button"
              variant="outline"
              className="bg-[#F2F4F4] text-[#181B1E] px-8 py-3 rounded-md border-none w-full"
            >
              Back
            </Button>
            <Button
              type="submit"
              onClick={() => {
                console.log('Form values:', form.getValues());
                console.log('Form errors:', form.formState.errors);
              }}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-neutral-900 w-full"
            >
              Continue
            </Button>
          
          </div>
        </form>
      </Form>
    </div>
  )
}
