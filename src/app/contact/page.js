"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Building2,
  CheckCircle2,
  Send,
  Navigation
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage({ city: initialCity }) {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Extract district from URL path if present
  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "items", "contact"];
  const routeDistrict = pathParts.length > 0 && !staticRoutes.includes(pathParts[0]) ? pathParts[0] : null;

  // Formatting district string
  const formatDistrictName = (slug) => {
    if (!slug) return "Jaipur";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const initialDistrictName = initialCity || (routeDistrict ? formatDistrictName(routeDistrict) : "Jaipur");
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrictName);

  const defaultDistricts = [
    { slug: "jaipur", name: "Jaipur", state: "Rajasthan" },
    { slug: "jodhpur", name: "Jodhpur", state: "Rajasthan" },
    { slug: "udaipur", name: "Udaipur", state: "Rajasthan" },
    { slug: "kota", name: "Kota", state: "Rajasthan" },
    { slug: "ajmer", name: "Ajmer", state: "Rajasthan" },
    { slug: "bikaner", name: "Bikaner", state: "Rajasthan" },
    { slug: "alwar", name: "Alwar", state: "Rajasthan" },
    { slug: "bhilwara", name: "Bhilwara", state: "Rajasthan" },
    { slug: "sikar", name: "Sikar", state: "Rajasthan text" },
    { slug: "pali", name: "Pali", state: "Rajasthan" },
    { slug: "sri-ganganagar", name: "Sri Ganganagar", state: "Rajasthan" },
    { slug: "bharatpur", name: "Bharatpur", state: "Rajasthan" }
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    district: selectedDistrict
  });

  // Keep form district updated when selected district changes
  useEffect(() => {
    setForm(prev => ({ ...prev, district: selectedDistrict }));
  }, [selectedDistrict]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDistrictSelect = (districtName) => {
    setSelectedDistrict(districtName);
    const slug = districtName.toLowerCase().replace(/\s+/g, "-");
    toast.success(`Updated location map for ${districtName} District`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) return toast.error("Name is required");
    if (!emailRegex.test(form.email)) return toast.error("Enter valid email");
    if (!phoneRegex.test(form.phone)) return toast.error("Enter valid 10-digit mobile number");
    if (!form.message.trim()) return toast.error("Message is required");

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "globalbiomedicalsnet",
          "contactQueries"
        ),
        {
          ...form,
          selectedDistrict,
          createdAt: new Date(),
        }
      );

      toast.success("Message submitted successfully! We will contact you soon.");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        district: selectedDistrict
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch Firestore districts & contact data
  useEffect(() => {
    const loadContactData = async () => {
      try {
        // Fetch Contact Info
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalsnet", "pages", "contact")
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }

        // Fetch Firebase Districts list
        const distSnap = await getDocs(
          collection(db, "websites", "globalbiomedicalsnet", "districts")
        );

        if (!distSnap.empty) {
          const list = distSnap.docs.map(doc => ({
            slug: doc.id,
            name: doc.data().district || formatDistrictName(doc.id),
            state: doc.data().state || "Rajasthan"
          }));
          setAvailableDistricts(list);
        } else {
          setAvailableDistricts(defaultDistricts);
        }
      } catch (err) {
        console.error("Firestore contact load error:", err);
        setAvailableDistricts(defaultDistricts);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  const phone = contactInfo.find((x) => x.label === "Phone Number")?.value || "";
  const email = contactInfo.find((x) => x.label === "Email Address")?.value || "info@globalbiomedicals.net";
  const baseAddress = contactInfo.find((x) => x.label === "Office Address")?.value || "Global Biomedical Head Office, Jaipur, Rajasthan 302001";
  const hours = contactInfo.find((x) => x.label === "Working Hours")?.value || "Mon - Sat: 9:00 AM - 8:00 PM (Emergency Service 24/7)";

  // Construct dynamic district address for location map & contact display
  const dynamicDistrictAddress = `Global Biomedical Service Center, ${selectedDistrict} District, Rajasthan, India`;
  const mapAddressQuery = encodeURIComponent(dynamicDistrictAddress);

  if (loading) {
    return (
      <section className="section-padding bg-slate-50 min-h-screen">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="h-12 w-64 bg-slate-200 rounded-2xl animate-pulse mb-8" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6" />
              ))}
            </div>
            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title={`Contact Us - ${selectedDistrict}`}
        subtitle={`Connect with Global Biomedical for equipment sales, AMC maintenance, and 24/7 technical support in ${selectedDistrict} District.`}
      />

      {/* District Selector Header Bar */}
      <section className="bg-[#2F241E] text-white py-6 border-b border-[#3D3028]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#6F4E37] text-[#C49A6C]">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-xs text-[#A08875] font-medium uppercase tracking-wider">Select District Location</span>
                <h3 className="text-lg font-bold text-white">
                  District Coverage Hub: <span className="text-[#C49A6C]">{selectedDistrict}</span>
                </h3>
              </div>
            </div>

            {/* Dropdown Selector */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                className="w-full md:w-64 rounded-xl border border-[#6F4E37] bg-[#3D3028] px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/30"
              >
                {availableDistricts.length > 0
                  ? availableDistricts.map((d) => (
                      <option key={d.slug} value={d.name} className="bg-[#2F241E] text-white">
                        {d.name} District, {d.state || "Rajasthan"}
                      </option>
                    ))
                  : defaultDistricts.map((d) => (
                      <option key={d.slug} value={d.name} className="bg-[#2F241E] text-white">
                        {d.name} District
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-start">

          {/* Left Contact Details */}
          <div>
            <span className="inline-block text-[#8B5A2B] bg-[#FFF8F1] border border-[#D9C7B5] px-5 py-2 rounded-full text-xs font-semibold mb-4">
              Regional Support Center
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F241E] tracking-tight">
              Get In Touch with Our Biomedical Team
            </h2>

            <p className="mt-4 leading-7 text-[#6B5F55] text-base md:text-lg">
              Whether you need urgent equipment repairs in {selectedDistrict}, AMC contract inquiries, or fresh reagent supplies, our field engineers and diagnostic experts are ready to assist.
            </p>

            {/* Contact Cards */}
            <div className="space-y-5 mt-8">

              {/* Phone Numbers */}
              <div className="flex items-start gap-5 bg-[#FFFDF9] p-6 rounded-[28px] border border-[#E6D8C8] shadow-sm hover:border-[#C49A6C] transition-all">
                <div className="flex h-14 w-14 items-center justify-center shrink-0 rounded-2xl border border-[#E6CBA8] bg-gradient-to-br from-[#FFF8EE] via-[#FCE8CC] to-[#F4D2A5] text-[#7A4E26] shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2F241E]">Helpline & Technical Support</h4>
                  <p className="text-xs text-[#8B5A2B] font-semibold mt-0.5">24/7 Emergency Breakdown Assistance</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-700 mt-2 text-sm font-semibold">
                    <a href="tel:+919257984336" className="hover:text-[#8B5A2B] transition-colors">+91 9257984336</a>
                    <a href="tel:+918529833535" className="hover:text-[#8B5A2B] transition-colors">+91 8529833535</a>
                    <a href="tel:+919983301657" className="hover:text-[#8B5A2B] transition-colors">+91 9983301657</a>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-5 bg-[#FFFDF9] p-6 rounded-[28px] border border-[#E6D8C8] shadow-sm hover:border-[#C49A6C] transition-all">
                <div className="flex h-14 w-14 items-center justify-center shrink-0 rounded-2xl border border-[#E6CBA8] bg-gradient-to-br from-[#FFF8EE] via-[#FCE8CC] to-[#F4D2A5] text-[#7A4E26] shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2F241E]">Official Email</h4>
                  <p className="text-slate-600 mt-1 text-sm md:text-base font-medium">{email}</p>
                </div>
              </div>

              {/* District Office Address */}
              <div className="flex items-start gap-5 bg-[#FFFDF9] p-6 rounded-[28px] border border-[#E6D8C8] shadow-sm hover:border-[#C49A6C] transition-all">
                <div className="flex h-14 w-14 items-center justify-center shrink-0 rounded-2xl border border-[#E6CBA8] bg-gradient-to-br from-[#FFF8EE] via-[#FCE8CC] to-[#F4D2A5] text-[#7A4E26] shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2F241E]">{selectedDistrict} Regional Location</h4>
                  <p className="text-slate-600 mt-1 text-sm md:text-base font-medium">
                    {dynamicDistrictAddress}
                  </p>
                  <p className="text-xs text-[#8B5A2B] mt-1 font-semibold">
                    Head Office: {baseAddress}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-5 bg-[#FFFDF9] p-6 rounded-[28px] border border-[#E6D8C8] shadow-sm hover:border-[#C49A6C] transition-all">
                <div className="flex h-14 w-14 items-center justify-center shrink-0 rounded-2xl border border-[#E6CBA8] bg-gradient-to-br from-[#FFF8EE] via-[#FCE8CC] to-[#F4D2A5] text-[#7A4E26] shadow-sm">
                  <Clock3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2F241E]">Working Hours</h4>
                  <p className="text-slate-600 mt-1 text-sm font-medium">{hours}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-[40px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-[0_20px_60px_rgba(111,78,55,0.12)] lg:p-10">

            <h3 className="text-2xl md:text-3xl font-extrabold text-[#2F241E]">
              Send Us Message
            </h3>

            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

            <p className="mt-3 text-sm text-[#6B5F55]">
              Fill out the inquiry form below for equipment quotes, maintenance, or service calls in <strong className="text-[#2F241E]">{selectedDistrict}</strong>.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Select Your District Location</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                  className="w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] font-semibold outline-none focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                >
                  {availableDistricts.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name} District
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2F241E] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@hospital.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2F241E] block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Hematology Analyzer AMC Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2F241E] block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Tell us about your machine requirements or support needed..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-5 py-3.5 text-sm text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,55,0.30)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
                {submitting ? "Submitting Inquiry..." : "Send Message"}
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* District-Wise Interactive Google Map Section */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">Interactive Map</span>
              <h3 className="text-2xl font-extrabold text-[#2F241E]">
                District Service Location Map: <span className="text-[#8B5A2B]">{selectedDistrict}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B5F55] bg-[#F5EBDD] px-3.5 py-1.5 rounded-full">
              <Navigation size={14} className="text-[#8B5A2B]" /> GPS Active Location
            </div>
          </div>

          <div className="rounded-[40px] overflow-hidden border border-[#E6D8C8] shadow-xl">
            <iframe
              key={selectedDistrict}
              src={`https://maps.google.com/maps?q=${mapAddressQuery}&z=13&output=embed`}
              width="100%"
              height="480"
              loading="lazy"
              className="border-0 w-full"
              title={`Map of ${selectedDistrict}`}
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}