import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Global Biomedical"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="relative">

            <div className="rounded-[40px] border border-[#E6D8C8] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(111,78,55,0.12)] p-8 h-[600px] flex items-center justify-center">

              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
              />

            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 hidden lg:block rounded-[28px] border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-[0_20px_45px_rgba(111,78,55,0.18)]">

              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-4xl font-extrabold text-transparent">
                10+
              </h3>

              <p className="mt-2 font-medium text-[#6B5F55]">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 leading-8 text-[#6B5F55] text-lg">
              At Global Biomedical, we are committed to delivering
              premium-quality healthcare and biomedical technologies
              designed to improve diagnostics, laboratory performance,
              and medical efficiency.
            </p>

            <p className="mt-6 leading-8 text-[#6B5F55] text-lg">
              Our mission is to empower healthcare professionals with
              trusted equipment, expert consultation, and innovative
              biomedical support.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="group rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_20px_45px_rgba(111,78,55,0.18)]">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] transition-all duration-500 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">
                  ⭐
                </div>

                <h4 className="text-xl font-bold text-[#2F241E]">
                  Premium Equipment
                </h4>

                <p className="mt-3 leading-7 text-[#6B5F55]">
                  High-end diagnostic technologies.
                </p>

              </div>

              <div className="group rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_20px_45px_rgba(111,78,55,0.18)]">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] transition-all duration-500 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">
                  🛠️
                </div>

                <h4 className="text-xl font-bold text-[#2F241E]">
                  Expert Support
                </h4>

                <p className="mt-3 leading-7 text-[#6B5F55]">
                  Trusted healthcare consultation.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}