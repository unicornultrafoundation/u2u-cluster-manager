import Img from "@/assets/404-maintenance.png";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8f9] text-center px-4">
      <div className="w-full tablet:max-w-[578px]">
        <img src={Img} alt="404" className="mx-auto mb-6 w-28" />
        <h1 className="tablet:text-2xl text-xl  uppercase text-black">Error 404 - Page not Found</h1>
        <p className="text-sm text-[#6b7280] mt-2 mb-6">
          We’re sorry, but the page you requested could not be found. It may have been removed, renamed, or is temporarily unavailable.
        </p>
        <a href="/" className="bg-black text-white px-4 py-3 text-sm ">
          Back to Home
        </a>
      </div>
    </div>
  );
}
