import BILL_BACKGROUND from '@/assets/new_cluster_page/bill_background.png'
import NewClusterForm from "./NewClusterForm"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  cpu: z.number().min(1).max(100),
  ram: z.number().min(1).max(100),
  gpu: z.number().min(1).max(100),
  activeTime: z.number().min(1).max(100),
  typeOfWorkload: z.string().min(2).max(50),
})

const NewCluster = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpu: 0,
      ram: 0,
      gpu: 0,
      activeTime: 0,
      typeOfWorkload: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex flex-col justify-between md:flex-row gap-6 md:gap-16 lg:gap-20 py-6 md:py-8 lg:py-12 px-4 md:px-32 bg-stone-50">
      {/* Left: Form Section */}
      <NewClusterForm form={form} onSubmit={onSubmit} />
      {/* Right: Summary */}
      <div className="flex-1 sticky top-0 flex">
        <img src={BILL_BACKGROUND} alt="Bill Background" className="object-cover absolute top-0 left-0 right-0" />
        <div className="relative z-10 p-6">
          <div className="justify-start text-zinc-900 text-lg font-normal font-['Pixelyze'] uppercase leading-7">Summary</div>
        </div>
      </div>
    </div>
  )
}

export default NewCluster
