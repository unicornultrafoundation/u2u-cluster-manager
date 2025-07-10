import Img from "@/assets/404-maintenance.png";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8f9] text-center px-4">
      <div>
        <img src={Img} alt="Maintenance" className="mx-auto mb-6 w-28" />
        <h1 className="text-xl font-semibold text-[#2d2d2d]">WEBSITE IS UNDER MAINTENANCE</h1>
        <p className="text-sm text-[#6b7280] mt-2">
          We’re currently performing essential updates to improve performance and reliability.<br />
          Thank you for your patience — we’ll be back shortly.
        </p>
      </div>
    </div>
  );
}
