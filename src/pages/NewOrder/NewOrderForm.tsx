import {
    Form,
    FormControl,
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
import {UseFormReturn} from "react-hook-form"
import {z} from "zod"
import {formSchema} from "."
import u2u from "@/assets/u2u_logo.png";

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

export const NewOrderForm = ({
                                 form,
                                 onSubmit,
                                 onBack,
                                 onContinue,
                             }: {
    form: UseFormReturn<z.infer<typeof formSchema>>
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onBack: () => void
    onContinue?: () => void
}) => {


    const data = [
        {
            name: "cpu",
            label: "Total CPU cores",
            unit: "Cores",
            tooltip:
                "CPU core is the heart of a computer's processing power...",
        },
        {
            name: "ram",
            label: "Total RAM memory",
            unit: "GB",
            tooltip:
                "RAM is short-term memory where data is stored for quick access...",
        },
        {
            name: "gpu",
            label: "Total GPU memory",
            unit: "GB",
            tooltip:
                "GPU memory (VRAM) handles large datasets for graphics and ML...",
        },
        {
            name: "disk",
            label: "Total Disk",
            unit: "GB",
            tooltip:
                "Disk stores data persistently (SSD/HDD)...",
        },
    ]

    const times = ["1d", "3d", "1w", "2w", "1m", "3m", "6m", "1y"]

    return (
        <div className="bg-white p-4 tablet:p-6 rounded-md w-full  mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {data.map(({name, label, unit, tooltip}) => (
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
                                            className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E]"
                                        />
                                        <span className="absolute right-3 text-sm text-[#929E9D]">
                        {unit}
                      </span>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    ))}

                    {/*/!* Download / Upload Mbps *!/*/}
                    {/*<div className="flex gap-4">*/}
                    {/*  {["downloadMbps", "uploadMbps"].map((fieldKey) => (*/}
                    {/*      <div className="flex-1 space-y-2" key={fieldKey}>*/}
                    {/*        <FormField*/}
                    {/*            control={form.control}*/}
                    {/*            name={fieldKey as keyof z.infer<typeof formSchema>}*/}
                    {/*            render={({ field }) => (*/}
                    {/*                <FormItem>*/}
                    {/*                  <LabelWithTooltip*/}
                    {/*                      label={fieldKey === "downloadMbps" ? "Download Mbps" : "Upload Mbps"}*/}
                    {/*                      required*/}
                    {/*                  />*/}
                    {/*                  <FormControl>*/}
                    {/*                    <div className="relative">*/}
                    {/*                      <Input*/}
                    {/*                          {...field}*/}
                    {/*                          type="number"*/}
                    {/*                          onChange={(e) => field.onChange(Number(e.target.value))}*/}
                    {/*                          className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E]"*/}
                    {/*                      />*/}
                    {/*                      <span className="absolute right-3 top-3 text-sm text-[#929E9D]">Mbps</span>*/}
                    {/*                    </div>*/}
                    {/*                  </FormControl>*/}
                    {/*                  <FormMessage />*/}
                    {/*                </FormItem>*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*      </div>*/}
                    {/*  ))}*/}
                    {/*</div>*/}

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
                                            {times.map((v) => (
                                                <SelectItem key={v} value={v}>
                                                    {v.replace("d", " day").replace("w", " week").replace("m", " month").replace("y", " year")}
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
                    <div className="flex flex-col tablet:flex-row gap-4">
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
                                                        className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E]"
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
                                            className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 !h-12 text-[#181B1E]">
                                            <SelectValue placeholder="Select region..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us-central1">US Central</SelectItem>
                                            <SelectItem value="us-east1">US East</SelectItem>
                                            <SelectItem value="asia-southeast1">Asia SE</SelectItem>
                                            {/* Thêm các region khác nếu cần */}
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
                                            className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 !h-12  text-[#181B1E]">
                                            <SelectValue placeholder="Select type..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="docker">Docker</SelectItem>
                                            <SelectItem value="kubernetes">Kubernetes</SelectItem>
                                            <SelectItem value="kvm">KVM</SelectItem>
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
                                        className="w-full px-4 py-3 border border-[#EEF0F0] bg-neutral-50 h-12 text-[#181B1E]"
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
                            onClick={() => onContinue?.()}
                            type="submit"
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
