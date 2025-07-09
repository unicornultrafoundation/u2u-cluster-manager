import {useState} from "react"
import u2u from "@/assets/u2u_logo.png";

const networks = Array(16).fill({
    name: "U2U NETWORK",
    logo: u2u,
})

interface Props {
    onContinue: () => void
}

export default function SelectApplication({onContinue}: Props) {
    const [selected, setSelected] = useState<number | null>(0)
    const [minBid, setMinBid] = useState("")
    const [maxBid, setMaxBid] = useState("")

    const isValid = selected !== null && minBid && maxBid


    const handleContinue = () => {
        if (isValid) {
            onContinue();
        }
    }
    return (
        <div className="w-full p-4 tablet:p-6 bg-white">
            <div className="max-h-[350px] overflow-y-auto mb-6 pr-1">
                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
                    {networks.map((network, index) => (
                        <div
                            key={index}
                            onClick={() => setSelected(index)}
                            className={`cursor-pointer border rounded-md flex flex-col items-center justify-center px-6 pt-6 pb-4 transition duration-200 ${
                                selected === index
                                    ? "border-black"
                                    : "border-gray-200 hover:border-gray-400"
                            }`}
                        >
                            <img src={network.logo} alt={network.name} className="w-12 h-12 mb-3" />
                            <p className="tablet:text-base desktop:text-lg text-sm font-title font-normal text-gray-700">
                                {network.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bid Inputs */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-6">
                {/* Min bid */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Minimum bid price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full border rounded-md py-2 pl-3 pr-12"
                            value={minBid}
                            onChange={(e) => setMinBid(e.target.value)}
                            placeholder="e.g. 100"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500 text-sm">USD</span>
                    </div>
                </div>

                {/* Max bid */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Maximum bid price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full border rounded-md py-2 pl-3 pr-12"
                            value={maxBid}
                            onChange={(e) => setMaxBid(e.target.value)}
                            placeholder="e.g. 1000"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500 text-sm">USD</span>
                    </div>
                </div>
            </div>


            {/* Button */}
            <button
                onClick={handleContinue}
                disabled={!isValid}
                className={`w-full py-3 rounded-md font-medium transition ${
                    isValid
                        ? "bg-black text-white hover:bg-gray-900"
                        : "bg-black  opacity-[0.3] text-white cursor-not-allowed"
                }`}
            >
                Continue
            </button>
        </div>
    )
}
