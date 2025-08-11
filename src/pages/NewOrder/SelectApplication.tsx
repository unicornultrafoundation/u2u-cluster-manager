import {useState} from "react";
import {Application} from "@/types";
import {useApplications} from "@/hooks/useApplications"; // ensure path is correct
import {Skeleton} from "@/components/ui/skeleton";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/pages/NewOrder/index.tsx"; // optional loading fallback

interface Props {
  onContinue: (app: Application) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>
  
}

export default function SelectApplication({onContinue, form}: Props) {
  const {setValue} = form;
  const {applications, isLoading, error} = useApplications();
  console.log("applications", applications)
  
  const [selected, setSelected] = useState<number | null>(null);
  const isValid = selected !== null;
  
  const handleContinue = () => {
    if(isValid && applications[selected]) {
      onContinue(applications[selected]);
    }
  };
  
  return (
    <div className="w-full p-4 tablet:p-6 bg-white">
      <div className="max-h-[350px] overflow-y-auto mb-6 pr-1">
        {isLoading ? (
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
            {Array.from({length: 8}).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-md"/>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load applications</p>
        ) : (
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
            {applications.map((app, index) => (
              <div
                key={app.id}
                onClick={() => {
                  setSelected(index)
                  setValue("name", app.name)
                  setValue("logo", app.logo)
                  setValue("cpu", Number(app.manifest.services.minio.resources.cpu.units.value))
                  setValue("ram", Number(app.manifest.services.minio.resources.memory.size.value))
                  setValue("disk", Number(app.manifest.services.minio.resources.storage.size.value))
                  setValue("templateId", app.id)
                  // setValue("gpu", Number(app.manifest.services.minio.resources.))
                }}
                className={`cursor-pointer border rounded-md flex flex-col items-center justify-center px-6 pt-6 pb-4 transition duration-200 ${
                  selected === index
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-12 h-12 mb-3 object-contain"
                />
                <p className="tablet:text-base desktop:text-lg text-sm font-title font-normal text-gray-700">
                  {app.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleContinue}
        disabled={!isValid}
        className={`w-full py-3 font-medium transition ${
          isValid
            ? "bg-black text-white hover:bg-gray-900"
            : "bg-black opacity-30 text-white cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
