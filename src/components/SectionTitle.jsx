export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >

      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-sm mb-5">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#2F241E]">
        {title}
      </h2>

      {/* Decorative Line */}
      <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] mx-auto" />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-[#6B5F55] max-w-2xl">
        {description}
      </p>

    </div>
  );
}