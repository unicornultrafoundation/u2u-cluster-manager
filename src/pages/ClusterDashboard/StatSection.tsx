import CLUSTER_ILLUSTRATION from "@/assets/dashboard_page/cluster_manager.png";

const StatSection = () => {
  return (
    <div
      className="self-stretch flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6"
      data-data="No"
      data-device="Responsive"
    >
      {/* Left Section: Cluster Illustration and Title */}
      <div className="flex-1 flex flex-col justify-start items-start gap-4">
        {/* Cluster Illustration */}
        <div
          data-type="Cluster"
          className="relative w-20 h-20 md:w-28 md:h-28 lg:w-28 lg:h-28"
        >
          <img
            src={CLUSTER_ILLUSTRATION}
            alt="Cluster Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Title and Subtitle */}
        <div className="flex flex-col justify-center items-start gap-1">
          <div className="text-zinc-900 font-['Pixelyze'] uppercase font-normal justify-start leading-10 text-2xl md:text-3xl">
            Cluster Management
          </div>
          <div className="text-gray-500 font-['Figtree'] leading-normal justify-start font-medium md:font-normal text-sm">
            Powered by U2U Network
          </div>
        </div>
      </div>
      {/* Right Section: Stats */}
      <div className="flex flex-col lg:flex-row w-full lg:w-[560px] justify-start items-start lg:items-center gap-4 lg:gap-8">
        {/* CPU Usage */}
        <div className="flex-1 flex flex-col justify-start items-start lg:items-end gap-1">
          <div className="text-neutral-400 font-['Figtree'] uppercase font-semibold text-xs md:text-sm leading-none md:leading-normal tracking-wide">
            Total CPU usage
          </div>
          <div className="text-zinc-900 font-['Pixelyze'] uppercase font-normal text-xl md:text-2xl leading-loose">
            0 GB
          </div>
        </div>
        {/* RAM Usage */}
        <div className="flex-1 flex flex-col justify-start items-start lg:items-end gap-1">
          <div className="text-neutral-400 font-['Figtree'] uppercase font-semibold text-xs md:text-sm leading-none md:leading-normal tracking-wide">
            Total RAM usage
          </div>
          <div className="text-zinc-900 font-['Pixelyze'] uppercase font-normal text-xl md:text-2xl leading-loose">
            0 GB
          </div>
        </div>
        {/* GPU Usage */}
        <div className="flex-1 flex flex-col justify-start items-start lg:items-end gap-1">
          <div className="text-neutral-400 font-['Figtree'] uppercase font-semibold text-xs md:text-sm leading-none md:leading-normal tracking-wide">
            Total GPU usage
          </div>
          <div className="text-zinc-900 font-['Pixelyze'] uppercase font-normal text-xl md:text-2xl leading-loose">
            0 GB
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatSection;