import { cn } from "@/lib/utils"

const steps = [
  { id: 1, label: "Select application" },
  { id: 2, label: "Configurations" },
  { id: 3, label: "Upfront payment" },
]

export function StepProgress({ currentStep = 1 }: { currentStep: number }) {
  return (
    <div className="relative w-full ">
      {/* Line behind all steps */}
      <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 z-0" />
      {/* Filled line up to current step */}
      <div
        className="absolute top-4 left-0 h-1 bg-[#00BC7D] z-0 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      
      <div className="relative flex justify-between w-full z-10">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isActive = step.id === currentStep
          
          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center",
                index === 0 && "items-start",
                index === steps.length - 1 && "items-end"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium",
                  isActive || isCompleted ? "bg-[#00BC7D]" : "bg-gray-300"
                )}
              >
                {step.id}
              </div>
              <div
                className={cn(
                  "mt-2 text-sm text-center",
                  isActive ? "text-black font-semibold" : "text-gray-500"
                )}
              >
                {step.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
