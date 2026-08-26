export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-[#F8F5F0]">
            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl">

                    <span className="inline-flex items-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-sm">
                        Learn More About Us
                    </span>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-[#2F241E] leading-tight">
                        Your Trusted Medical Device Partner in {location}
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

                </div>

                {/* Content */}
                <div className="mt-10 space-y-6 text-lg leading-9 text-[#6B5F55]">

                    <p>
                        Global Biomedical delivers reliable lab machinery and diagnostic testing tools right to your doorstep in <strong className="text-[#6F4E37]">{location}</strong>. 
                        We supply CBC blood counters, biochemistry systems, electrolyte units, and diagnostic reagents to pathology labs, clinics, and hospitals.
                    </p>

                    <p>
                        Our primary goal is to ensure every medical clinic and lab gets access to dependable machinery without high stress or long waiting times. 
                        We work side by side with doctors, lab owners, and technician staff to choose the perfect devices for their setup.
                    </p>

                    <p>
                        Beyond selling machines, we handle full setup, user training, and ongoing check-ups. 
                        If you are opening a fresh pathology lab or upgrading old instruments, our engineers guide you through every choice.
                    </p>

                    <p>
                        We operate across multiple towns and districts, ensuring prompt delivery, genuine spare parts, and fast on-site support whenever you need help.
                    </p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="flex items-center gap-4">

                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2F241E]">
                            Common Questions & Answers
                        </h2>

                        <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-transparent" />

                    </div>

                    <div className="mt-10 grid gap-6">

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                How fast can you deliver biomedical machines to our lab?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                We usually deliver standard equipment and lab consumables within 24 to 48 hours depending on your city or district location.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                What main types of diagnostic tools can we order?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                You can order full-auto and semi-auto biochemistry analyzers, 3-part & 5-part CBC machines, urine strip readers, centrifuge machines, and testing reagents.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                Do you help train our laboratory staff on new machines?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                Yes! Our certified biomedical engineers do complete hands-on setup and train your lab technicians so they can run tests easily.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-[#2F241E]">
                                What happens if a machine stops working suddenly?
                            </h3>

                            <p className="mt-3 leading-8 text-[#6B5F55]">
                                We offer 24/7 on-call technical help. Our engineers visit your site promptly or assist over phone/video call to resolve any machine error.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}