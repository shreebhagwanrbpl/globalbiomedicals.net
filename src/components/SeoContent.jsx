export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-[#F8F5F0]">
            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl">

                    <span className="inline-flex items-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-sm">
                        About Our Services
                    </span>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-[#2F241E] leading-tight">
                        Biomedical Equipment Supplier in {location}
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

                </div>

                {/* Content */}
                <div className="mt-10 space-y-6 text-lg leading-9 text-[#6B5F55]">

                    <p>
                        Central Biomedicals is a trusted supplier of biomedical
                        and laboratory equipment in <strong className="text-[#6F4E37]">{location}</strong>.
                        We provide CBC Machines, Hematology Analyzers,
                        Biochemistry Analyzers, Urine Analyzers, ELISA Readers
                        and diagnostic instruments for hospitals, pathology labs
                        and healthcare facilities.
                    </p>

                    <p>
                        Our mission is to provide reliable and high-quality
                        laboratory equipment to healthcare professionals across
                        India. We work with diagnostic centres, hospitals,
                        research laboratories and medical institutions to
                        deliver advanced biomedical solutions.
                    </p>

                    <p>
                        We offer installation assistance, product guidance and
                        technical support for a wide range of laboratory
                        instruments. Whether you are setting up a new
                        diagnostic laboratory or upgrading existing equipment,
                        our team can help you select the right solution.
                    </p>

                    <p>
                        Central Biomedicals supplies equipment across multiple
                        districts and cities, helping healthcare providers
                        improve testing efficiency and diagnostic accuracy.
                    </p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="flex items-center gap-4">

                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2F241E]">
                            Frequently Asked Questions
                        </h2>

                        <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-transparent" />

                    </div>

                    <div className="mt-10 grid gap-6">

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                Yes, we supply biomedical and laboratory equipment across multiple districts and cities.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                We provide CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers,
                                Urine Analyzers and other diagnostic equipment.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                Do you provide installation support?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                Yes, installation assistance and technical support
                                are available depending on location and equipment type.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                Hospitals, pathology labs, diagnostic centres,
                                research laboratories and healthcare facilities
                                can purchase equipment from us.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}