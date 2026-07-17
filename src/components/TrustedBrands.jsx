export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden border-y border-[#E6D8C8] bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4] py-16">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#C49A6C]/15 blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#8B5A2B]/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center">

          <span className="inline-flex items-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-sm">
            Trusted Partners
          </span>

          <p className="mt-5 text-lg font-medium text-[#6B5F55]">
            Trusted by Healthcare & Biomedical Organizations
          </p>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

        </div>

        {/* Brand Cards */}
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group flex h-28 items-center justify-center rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] px-6 text-center text-lg font-bold text-[#2F241E] shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:bg-gradient-to-br hover:from-[#F8F5F0] hover:to-[#F3E7D9] hover:text-[#8B5A2B] hover:shadow-[0_18px_45px_rgba(111,78,55,0.18)]"
            >
              {brand}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}