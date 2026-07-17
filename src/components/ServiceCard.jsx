import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-[30px] p-8 border border-slate-100 card-shadow hover:-translate-y-2 transition-all duration-300">

      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#FDF2E2] via-[#F6DFC2] to-[#EBC79B] text-[#6F4E37] shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#6F4E37] group-hover:via-[#8B5A2B] group-hover:to-[#A06A3B] group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-slate-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-7 mb-6">
        {description}
      </p>

    </div>
  );
}