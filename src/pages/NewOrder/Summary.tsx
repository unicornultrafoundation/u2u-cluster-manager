import {Button} from "@/components/ui/button"

const summaryData = [
    {label: "Application", value: "U2DPN"},
    {label: "Bid price", value: "10 ~ 100 USD"},
    {label: "Total CPU", value: "32 Cores"},
    {label: "Total RAM", value: "64 GB"},
    {label: "Total GPU", value: "128 GB"},
    {label: "Renting time", value: "1 Week"},
    {label: "Type of workload", value: "Data Processing"},
    {label: "Region", value: "us-central1"},
    {label: "Machine Type", value: "Docker"},
    {label: "Description", value: "Node runner"},
]

const systemFeeData = [
    {label: "Network", value: "U2U"},
    {label: "Transaction fee", value: "0.05 U2U"},
]

export default function OrderSummary() {
    return (
        <div
            className=" bg-white p-4 tablet:p-6 rounded-md desktop:max-w-[768px] w-full  mx-auto overflow-hidden">


            {/* Content */}
            <div className="">
                <p className=" font-title text-lg mb-3 tracking-widest text-[#181B1E]">
                    SUMMARY
                </p>

                <div className="space-y-3">
                    {summaryData.map(({label, value}) => (
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
                    <div className="border-t border-dashed border-[#E5E7EB]" />

                    {/* Left circle */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full" />

                    {/* Right circle */}
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full" />
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
