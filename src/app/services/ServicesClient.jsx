"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Send,
  Sparkles
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { servicesData, serviceCategories } from "@/data/servicesData";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function ServicesClient() {
  const [services, setServices] = useState(servicesData);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Services");
  
  // Quick Inquiry Modal State
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    hospitalName: "",
    message: ""
  });

  const getServiceIcon = (nameOrIdx) => {
    switch (nameOrIdx) {
      case "Microscope": return <Microscope size={28} />;
      case "Wrench": return <Wrench size={28} />;
      case "ShieldCheck": return <ShieldCheck size={28} />;
      case "FlaskConical": return <FlaskConical size={28} />;
      case "Stethoscope": return <Stethoscope size={28} />;
      case "Activity": return <Activity size={28} />;
      default: return <Activity size={28} />;
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalsnet",
            "pages",
            "services"
          )
        );

        if (snap.exists() && snap.data().services?.length > 0) {
          const fbServices = snap.data().services.map((s, idx) => ({
            id: `fb-${idx}`,
            title: s.title || "Biomedical Service",
            category: s.category || (idx % 2 === 0 ? "Maintenance" : "Sales & Supply"),
            desc: s.desc || s.description || "Trusted biomedical solution for diagnostic laboratories.",
            features: s.features || ["OEM Quality Compliance", "24/7 Technical Assistance", "On-site Installation"],
            turnaround: s.turnaround || "Express Service",
            badge: s.badge || "Certified",
            icon: s.icon || (idx === 0 ? "Microscope" : idx === 1 ? "Wrench" : "ShieldCheck")
          }));
          setServices(fbServices);
        }
      } catch (error) {
        console.error("Firebase fetch failed, using fallback data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = activeCategory === "All Services" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const handleOpenInquiry = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    if (!inquiryForm.name.trim()) return toast.error("Please enter your name");
    if (!/^[6-9]\d{9}$/.test(inquiryForm.phone)) return toast.error("Please enter valid 10-digit mobile number");

    try {
      setInquirySubmitting(true);
      await addDoc(
        collection(db, "websitesQueries", "globalbiomedicalsnet", "serviceInquiries"),
        {
          serviceTitle: selectedService?.title || "General Service Request",
          serviceCategory: selectedService?.category || "Service Inquiry",
          ...inquiryForm,
          createdAt: new Date()
        }
      );

      toast.success("Service inquiry submitted! Our engineer will call you shortly.");
      setModalOpen(false);
      setInquiryForm({
        name: "",
        phone: "",
        email: "",
        hospitalName: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again or call us.");
    } finally {
      setInquirySubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Biomedical & Diagnostic Services"
        subtitle="Delivering turnkey hospital solutions, equipment AMC maintenance, NABL calibration, and diagnostic sales with healthcare precision."
      />

      <section className="section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">
        <div className="container-custom">
          
          <SectionTitle
            badge="Healthcare Solutions"
            title="Comprehensive Biomedical & Lab Services"
            description="We provide end-to-end support for pathology centers, multi-specialty hospitals, and diagnostic labs across North India."
            center
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#6F4E37] text-white shadow-md scale-105"
                    : "bg-[#FFFDF9] text-[#6B5F55] border border-[#E6D8C8] hover:bg-[#F5EBDD] hover:text-[#2F241E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-sm"
                >
                  <div className="mb-6 h-16 w-16 rounded-2xl bg-[#ECE4DA]" />
                  <div className="mb-4 h-6 w-3/4 rounded-xl bg-[#ECE4DA]" />
                  <div className="space-y-3">
                    <div className="h-4 rounded bg-[#ECE4DA]" />
                    <div className="h-4 w-11/12 rounded bg-[#ECE4DA]" />
                  </div>
                </div>
              ))
            ) : (
              filteredServices.map((service, index) => (
                <div
                  key={service.id || index}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-[0_15px_45px_rgba(111,78,55,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(111,78,55,0.18)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] shadow-sm transition-all duration-500 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">
                        {getServiceIcon(service.icon)}
                      </div>
                      
                      {service.badge && (
                        <span className="rounded-full bg-[#F5EBDD] border border-[#E6D8C8] px-3.5 py-1 text-xs font-semibold text-[#8B5A2B]">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#C49A6C]">
                      {service.category}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-[#2F241E] group-hover:text-[#8B5A2B] transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 leading-7 text-[#6B5F55] text-sm md:text-base">
                      {service.desc}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="mt-6 space-y-2.5 pt-4 border-t border-[#F0E6DB]">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                            <span className="text-xs md:text-sm font-medium text-[#4A3E34]">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F0E6DB] flex items-center justify-between">
                    {service.turnaround && (
                      <div className="flex items-center gap-1.5 text-xs text-[#8B5A2B] font-semibold">
                        <Clock size={14} />
                        <span>{service.turnaround}</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleOpenInquiry(service)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#6F4E37] to-[#8B5A2B] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                    >
                      Book Service <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <section className="relative overflow-hidden section-padding bg-white">
        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Execution Process"
            title="Simple & Professional Service Workflow"
            description="We follow a systematic procedure to ensure fast diagnosis, original spare parts deployment, and zero diagnostic downtime."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Requirement & Audit",
                desc: "Consultation and site audit to understand diagnostic machine requirements or repair needs."
              },
              {
                step: "02",
                title: "Solution Design",
                desc: "Providing optimal equipment recommendations, AMC contracts, or spare replacement plans."
              },
              {
                step: "03",
                title: "Deployment & Calibration",
                desc: "On-site installation, optical sensor alignment, and precision standard calibration."
              },
              {
                step: "04",
                title: "24/7 Support",
                desc: "Continuous preventive maintenance, staff training, and fast breakdown response."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6F4E37] to-[#8B5A2B] text-lg font-bold text-white shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#2F241E] group-hover:text-[#8B5A2B] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 leading-6 text-sm text-[#6B5F55]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-2xl">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 rounded-full bg-[#F5EBDD] p-2 text-[#6F4E37] transition hover:bg-[#8B5A2B] hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#F5EBDD] text-[#8B5A2B]">
                <Sparkles size={22} />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase text-[#8B5A2B]">Request Service</span>
                <h3 className="text-xl font-bold text-[#2F241E]">
                  {selectedService?.title || "Book Biomedical Service"}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#6B5F55] mb-6">
              Fill in your details below and our service engineer will get back to you within 30 minutes.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full rounded-xl border border-[#D9C7B5] bg-white px-4 py-3 text-sm text-[#2F241E] outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#C49A6C]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2F241E] block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full rounded-xl border border-[#D9C7B5] bg-white px-4 py-3 text-sm text-[#2F241E] outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#C49A6C]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2F241E] block mb-1">Hospital / Lab Name</label>
                  <input
                    type="text"
                    placeholder="e.g. City Diagnostics"
                    value={inquiryForm.hospitalName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, hospitalName: e.target.value })}
                    className="w-full rounded-xl border border-[#D9C7B5] bg-white px-4 py-3 text-sm text-[#2F241E] outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#C49A6C]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Service Details / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Describe your machine model or issue..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-[#D9C7B5] bg-white px-4 py-3 text-sm text-[#2F241E] outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#C49A6C]/20"
                />
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
              >
                <Send size={16} />
                {inquirySubmitting ? "Submitting Request..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      <CTASection />
    </>
  );
}
