import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Plus, Minus } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../lib/utils";
import Magnetic from "../components/Magnetic";

const formItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const SUPPORT_FAQS = [
  { q: "Are the custom solutions downloadable?", a: "No. Customized solutions are developed specifically for your business processes and are implemented directly based on project scope." },
  { q: "How do I request a customized solution?", a: "Submit the consultation form on the right. Our team will review your business challenges and schedule a one-to-one discussion." },
  { q: "What is the typical delivery timeline?", a: "Ready-to-use systems are delivered instantly. Custom projects vary from 1 to 4 weeks depending on complexity and customization requirements." },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const initialSupport = searchParams.get("type") || "Customized Solution";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: "",
    phone: "",
    email: "",
    businessSize: "1-10",
    challenges: "",
    support: initialSupport,
    preferredTime: ""
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setFormData(prev => ({ ...prev, support: type }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      navigate("/thank-you");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 text-slate-900 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Details & FAQ */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h1 className="font-display text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">
                Let's <span className="text-premium-yellow italic font-normal">Connect.</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed font-sans font-light">
                Whether you need a ready-made business system, a custom operational dashboard, or strategic growth connections, we are here to support your venture.
              </p>
            </div>

            <div className="space-y-8 text-slate-900">
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <Mail className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-950 font-display">Email Support</h4>
                  <p className="text-slate-500 text-xs mb-1">General inquiries & Custom project discussions</p>
                  <a href="mailto:support@twinaronnexus.com" className="text-premium-yellow font-semibold text-sm hover:underline">support@twinaronnexus.com</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <svg className="h-6 w-6 text-premium-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-950 font-display">WhatsApp Support</h4>
                  <p className="text-slate-500 text-xs mb-1">Direct advisory support channel</p>
                  <a href="https://wa.me/919787333379" target="_blank" rel="noopener noreferrer" className="text-premium-yellow font-semibold text-sm hover:underline">+91 97873 33379</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <MapPin className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-955 font-display">Office Location</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">
                    TwinaronNexus Hub, Cyber City District,<br />
                    New Delhi, India - 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-xl mb-4 font-display text-slate-950">Quick Help</h3>
              {SUPPORT_FAQS.map((faq, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden border-slate-200/60 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left text-slate-800 hover:text-slate-950 transition-colors"
                  >
                    <span className="font-semibold text-sm font-sans">{faq.q}</span>
                    {openFaq === i ? <Minus className="h-4 w-4 text-premium-yellow" /> : <Plus className="h-4 w-4 text-slate-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-slate-500 text-xs leading-relaxed border-t border-slate-200/60 pt-3 font-sans font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 glass rounded-[2.5rem] p-8 lg:p-12 border-slate-200/60 bg-white shadow-xl"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display text-slate-950 mb-2">Schedule Business Consultation</h3>
              <p className="text-xs text-slate-500">Provide details about your operations to help our analysts prepare for our discussion.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Company Name</label>
                  <input 
                    required 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Industry</label>
                  <input 
                    required 
                    type="text" 
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g. Manufacturing, Retail"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Business Size</label>
                  <select 
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm appearance-none"
                  >
                    <option value="Solo">Solo Practitioner / Freelancer</option>
                    <option value="1-10">1 - 10 Employees</option>
                    <option value="11-50">11 - 50 Employees</option>
                    <option value="51-200">51 - 200 Employees</option>
                    <option value="200+">200+ Employees</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contact number"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">What support are you looking for?</label>
                <select 
                  name="support"
                  value={formData.support}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm appearance-none"
                >
                  <option value="Business Analytics">Business Analytics & Intelligence</option>
                  <option value="Customized Solution">Customized Dashboard / Solution</option>
                  <option value="Business Growth">Business Growth Consulting</option>
                  <option value="Business Matchmaking">Business Matchmaking</option>
                  <option value="Global Business Opportunities">Global Business Opportunities</option>
                  <option value="Other">Other Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Preferred Discussion Time</label>
                <input 
                  required 
                  type="text" 
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  placeholder="e.g. Weekdays 3 PM - 5 PM IST, or a specific date"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest px-1">Current Challenges</label>
                <textarea 
                  required 
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="Tell us about the main issues or bottlenecks you are facing..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-sm" 
                />
              </div>
              
              <div className="flex justify-center pt-2">
                <Magnetic strength={0.15}>
                  <button
                    disabled={status !== "idle"}
                    type="submit"
                    className={cn(
                      "rounded-full px-12 py-4.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer w-full sm:w-auto",
                      status === "sent" 
                        ? "bg-green-500 text-white cursor-default" 
                        : "bg-premium-yellow text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] active:scale-95 disabled:opacity-50"
                    )}
                  >
                    {status === "idle" && <><Send className="h-4 w-4" /> SUBMIT CONSULTATION REQUEST</>}
                    {status === "sending" && <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />}
                    {status === "sent" && "TRANSMITTED SUCCESSFULLY"}
                  </button>
                </Magnetic>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
