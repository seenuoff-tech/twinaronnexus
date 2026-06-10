import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Plus, Minus, Globe, Calendar } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../lib/utils";
import Magnetic from "../components/Magnetic";

const formItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const getNormalizedSupport = (type: string | null): string => {
  if (!type) return "Customized Business Dashboards";
  const t = type.toLowerCase();
  if (t.includes("analytics") || t.includes("intelligence")) {
    return "Business Intelligence & Analytics";
  }
  if (t.includes("dashboard") || t.includes("customized solution") || t.includes("customized dashboard")) {
    return "Customized Business Dashboards";
  }
  if (t.includes("growth") || t.includes("consulting")) {
    return "Business Growth Consulting";
  }
  if (t.includes("matchmaking")) {
    return "Business Matchmaking";
  }
  if (t.includes("global") || t.includes("connections") || t.includes("opportunities")) {
    return "Global Business Connections";
  }
  return "Customized Business Dashboards"; // default
};

const getFormHeading = (supportType: string) => {
  switch (supportType) {
    case "Business Intelligence & Analytics":
      return "Schedule Analytics Consultation";
    case "Customized Business Dashboards":
      return "Request Custom Dashboard Consultation";
    case "Business Growth Consulting":
      return "Schedule Growth Strategy Consultation";
    case "Business Matchmaking":
      return "Submit Matchmaking Request";
    case "Global Business Connections":
      return "Request Global Business Introduction";
    default:
      return "Schedule Business Consultation";
  }
};

const getLeftTitle = (supportType: string) => {
  if (supportType === "Business Matchmaking") {
    return (
      <>
        Find the Right <span className="text-premium-yellow italic font-normal">Business Partners</span>
      </>
    );
  }
  if (supportType === "Global Business Connections") {
    return (
      <>
        Expand <span className="text-premium-yellow italic font-normal">Beyond Borders</span>
      </>
    );
  }
  return (
    <>
      Let's <span className="text-premium-yellow italic font-normal">Connect.</span>
    </>
  );
};

const getLeftDescription = (supportType: string) => {
  switch (supportType) {
    case "Business Intelligence & Analytics":
      return "Transform business data into actionable insights. Schedule a consultation to identify growth opportunities, performance gaps, and strategic improvements.";
    case "Customized Business Dashboards":
      return "Get a dashboard tailored to your business processes, reporting needs, and operational goals. Discuss your requirements with our consultants.";
    case "Business Growth Consulting":
      return "Identify business bottlenecks, improve operational efficiency, and create practical strategies to accelerate growth.";
    case "Business Matchmaking":
      return "Connect with verified buyers, suppliers, distributors, importers, exporters, investors, and strategic partners through our structured business matchmaking process.";
    case "Global Business Connections":
      return "Build international business relationships, explore new markets, and connect with global partners through curated business introductions.";
    default:
      return "Transform business data into actionable insights. Schedule a consultation to identify growth opportunities, performance gaps, and strategic improvements.";
  }
};

const getWhoIsThisFor = (supportType: string) => {
  if (supportType === "Business Matchmaking") {
    return [
      "Manufacturers",
      "Traders",
      "Exporters",
      "Importers",
      "Startups",
      "Business Owners",
      "Franchise Brands",
      "Investors"
    ];
  }
  if (supportType === "Global Business Connections") {
    return [
      "Exporters",
      "Importers",
      "Manufacturers",
      "International Traders",
      "Business Associations",
      "Investors",
      "Growing Enterprises"
    ];
  }
  return null;
};

const getButtonText = (supportType: string, status: "idle" | "sending" | "sent") => {
  if (status === "sending") return "TRANSMITTING...";
  if (status === "sent") return "TRANSMITTED SUCCESSFULLY";
  
  switch (supportType) {
    case "Business Intelligence & Analytics":
      return "Request Consultation";
    case "Customized Business Dashboards":
      return "Discuss My Requirements";
    case "Business Growth Consulting":
      return "Schedule Consultation";
    case "Business Matchmaking":
      return "FIND BUSINESS MATCHES";
    case "Global Business Connections":
      return "REQUEST GLOBAL CONNECTIONS";
    default:
      return "Submit Request";
  }
};

const getFAQs = (supportType: string) => {
  switch (supportType) {
    case "Business Intelligence & Analytics":
      return [
        {
          q: "How can analytics help my business?",
          a: "Analytics helps you identify growth opportunities, performance gaps, bottlenecks, and strategic areas of improvement using data-driven insights."
        },
        {
          q: "What information is required for analysis?",
          a: "We typically require data on your key operational metrics, sales records, current reporting tools, and major operational challenges."
        },
        {
          q: "How long does the consultation process take?",
          a: "The initial discussion takes 30-45 minutes. A complete assessment and roadmap are delivered within 3-5 business days."
        }
      ];
    case "Customized Business Dashboards":
      return [
        {
          q: "Can the dashboard be customized?",
          a: "Yes, the dashboard is fully customized and tailored specifically to your business processes, reporting needs, and operational goals."
        },
        {
          q: "What information is required?",
          a: "We need to understand your current data sources, workflow, reporting frequency, and key metrics you wish to track."
        },
        {
          q: "How long will implementation take?",
          a: "The implementation timeline ranges from 1 to 4 weeks depending on the complexity, size of data, and specific custom requirements."
        }
      ];
    case "Business Growth Consulting":
      return [
        {
          q: "What type of businesses do you work with?",
          a: "We work with SMEs, manufacturers, exporters, traders, startups, healthcare professionals, and growth-focused enterprises."
        },
        {
          q: "How does the consulting process work?",
          a: "We start with bottleneck identification, analyze your operational efficiency, and then design and implement practical strategy roadmaps."
        },
        {
          q: "What results can I expect?",
          a: "Expect improved operational visibility, reduced bottlenecks, streamlined processes, and a clear growth implementation roadmap."
        }
      ];
    case "Business Matchmaking":
      return [
        {
          q: "How does business matchmaking work?",
          a: "We understand your product, capacity, and target market, and then leverage our curated database and partner network to facilitate direct, verified introductions."
        },
        {
          q: "How are connections identified?",
          a: "Connections are identified based on active requirements, verification of business credentials, and alignment of sourcing/buying capacity."
        },
        {
          q: "What industries are supported?",
          a: "We support manufacturing, trading, retail, distribution, healthcare, export/import, agriculture, and service sectors."
        },
        {
          q: "How long does the matchmaking process take?",
          a: "The initial mapping takes 3-5 days. Introduction meetings are typically coordinated within 1 to 2 weeks."
        }
      ];
    case "Global Business Connections":
      return [
        {
          q: "Which countries are covered?",
          a: "We specialize in trade corridors spanning India, UAE, Singapore, Malaysia, UK, USA, and global virtual networks."
        },
        {
          q: "Can you help identify distributors?",
          a: "Yes. We help manufacturers and brands map out and connect with qualified distributors and channel partners in target markets."
        },
        {
          q: "Can you assist with international partnerships?",
          a: "Yes. We facilitate joint venture introductions, international sourcing connections, and global investment introductions."
        },
        {
          q: "What information is required to begin?",
          a: "We require a detailed business profile, product list/specification catalog, and a clear description of your target partner profile."
        }
      ];
    default:
      return [
        {
          q: "How does business matchmaking work?",
          a: "We understand your product, capacity, and target market, and then leverage our curated database and partner network to facilitate direct, verified introductions."
        },
        {
          q: "How are connections identified?",
          a: "Connections are identified based on active requirements, verification of business credentials, and alignment of sourcing/buying capacity."
        }
      ];
  }
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const initialSupport = getNormalizedSupport(searchParams.get("type"));

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    support: initialSupport,
    preferredTime: "",
    
    // Consulting fields
    industry: "",
    businessSize: "Small Business",
    revenueRange: "Below ₹50 Lakhs",
    challenges: "",
    lookingForConsulting: [] as string[],
    
    // Matchmaking fields
    lookingForMatch: [] as string[],
    productCategory: "",
    targetMarket: [] as string[],
    monthlyCapacity: "",
    businessIntro: "",
    
    // Global Connections fields
    countryOfInterest: "",
    globalIndustry: "",
    businessObjective: "",
    targetCompanies: "",
    briefRequirement: ""
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setFormData(prev => ({ ...prev, support: getNormalizedSupport(type) }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isMatchmaking = formData.support === "Business Matchmaking";
  const isGlobalConnections = formData.support === "Global Business Connections";
  const isConsulting = !isMatchmaking && !isGlobalConnections;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      
      // Build WhatsApp message
      let waMessage = "";
      if (formData.support === "Business Matchmaking") {
        waMessage = `Hello, I have submitted a Matchmaking Request for *${formData.name}* at *${formData.company}*.\n\nLooking for: ${formData.lookingForMatch.join(", ")}\nProduct Category: ${formData.productCategory}\nTarget Market: ${formData.targetMarket.join(", ")}\nRequirement/Capacity: ${formData.monthlyCapacity}\nPreferred Time: ${formData.preferredTime}\nIntroduction: ${formData.businessIntro}`;
      } else if (formData.support === "Global Business Connections") {
        waMessage = `Hello, I have submitted a Global Business Introduction Request for *${formData.name}* at *${formData.company}*.\n\nCountry of Interest: ${formData.countryOfInterest}\nIndustry: ${formData.globalIndustry}\nObjective: ${formData.businessObjective}\nTarget Companies: ${formData.targetCompanies}\nPreferred Time: ${formData.preferredTime}\nBrief Requirement: ${formData.briefRequirement}`;
      } else {
        waMessage = `Hello, I have submitted a Consultation Request for *${formData.name}* at *${formData.company}*.\n\nSupport Type: ${formData.support}\nIndustry: ${formData.industry}\nBusiness Size: ${formData.businessSize}\nRevenue Range: ${formData.revenueRange}\nPreferred Time: ${formData.preferredTime}\nChallenges: ${formData.challenges}`;
      }
      
      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/919787333379?text=${encodedMsg}`;
      
      // Redirect to thank-you and open WhatsApp
      navigate("/thank-you");
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1500);
  };

  const whoIsForItems = getWhoIsThisFor(formData.support);

  return (
    <div className="pt-32 pb-24 text-black bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Details & FAQ */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h1 className="font-display text-5xl font-extrabold mb-6 text-black tracking-tight leading-[1.15]">
                {getLeftTitle(formData.support)}
              </h1>
              <p className="text-lg text-black leading-relaxed font-sans font-normal">
                {getLeftDescription(formData.support)}
              </p>
              
              {/* Who Is This For Section (Dynamic) */}
              {whoIsForItems && (
                <div className="glass rounded-[2rem] p-6 border-slate-200/60 bg-slate-50/50 mt-8">
                  <h4 className="font-display font-bold text-sm text-black uppercase tracking-widest mb-4">Who Is This For?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whoIsForItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="h-5 w-5 rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center text-[10px] text-premium-yellow font-bold flex-none">✔</span>
                        <span className="text-sm text-black font-sans font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8 text-black">
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <Mail className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-black font-display">Email Support</h4>
                  <p className="text-black text-sm mb-1">General inquiries & Custom project discussions</p>
                  <a href="mailto:info@twinaronnexus.com" className="text-premium-yellow font-semibold text-sm hover:underline">info@twinaronnexus.com</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <svg className="h-6 w-6 text-premium-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-black font-display">WhatsApp Support</h4>
                  <p className="text-black text-sm mb-1">Direct advisory support channel</p>
                  <a href="https://wa.me/919787333379" target="_blank" rel="noopener noreferrer" className="text-premium-yellow font-semibold text-sm hover:underline">+91 97873 33379</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <Globe className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-black font-display">Service Coverage</h4>
                  <div className="text-black text-sm leading-relaxed font-sans space-y-1.5 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-premium-yellow font-bold">✔</span> India
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-premium-yellow font-bold">✔</span> UAE
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-premium-yellow font-bold">✔</span> Singapore
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-premium-yellow font-bold">✔</span> Malaysia
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-premium-yellow font-bold">✔</span> Global Virtual Consultation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-xl mb-4 font-display text-black">Quick Help</h3>
              {getFAQs(formData.support).map((faq, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden border-slate-200/60 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left text-black hover:text-black transition-colors"
                  >
                    <span className="font-semibold text-base font-sans">{faq.q}</span>
                    {openFaq === i ? <Minus className="h-4 w-4 text-premium-yellow" /> : <Plus className="h-4 w-4 text-slate-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-black text-sm leading-relaxed border-t border-slate-200/60 pt-3 font-sans font-normal">
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
              <h3 className="text-2xl font-bold font-display text-black mb-2">
                {getFormHeading(formData.support)}
              </h3>
              <p className="text-sm text-black">Provide details about your operations to help our analysts prepare for our discussion.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* What support are you looking for? */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">What support are you looking for?</label>
                <select 
                  name="support"
                  value={formData.support}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base appearance-none"
                >
                  <option value="Business Intelligence & Analytics">Business Intelligence & Analytics</option>
                  <option value="Customized Business Dashboards">Customized Business Dashboards</option>
                  <option value="Business Growth Consulting">Business Growth Consulting</option>
                  <option value="Business Matchmaking">Business Matchmaking</option>
                  <option value="Global Business Connections">Global Business Connections</option>
                  <option value="Other Support">Other Support</option>
                </select>
              </div>

              {/* Shared Fields: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Company Name</label>
                  <input 
                    required 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                  />
                </div>
              </div>

              {/* Shared Fields: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contact number"
                    className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                  />
                </div>
              </div>

              {/* Dynamic Section: Consulting */}
              {isConsulting && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Industry</label>
                      <select 
                        required 
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base appearance-none"
                      >
                        <option value="" disabled hidden>Select Industry</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Trading">Trading</option>
                        <option value="Retail">Retail</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Services">Services</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Business Size</label>
                      <select 
                        name="businessSize"
                        value={formData.businessSize}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base appearance-none"
                      >
                        <option value="Solo Professional">Solo Professional</option>
                        <option value="Startup">Startup</option>
                        <option value="Small Business">Small Business</option>
                        <option value="Growing Business">Growing Business</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Annual Revenue Range</label>
                      <select 
                        name="revenueRange"
                        value={formData.revenueRange}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base appearance-none"
                      >
                        <option value="Below ₹50 Lakhs">Below ₹50 Lakhs</option>
                        <option value="₹50 Lakhs – ₹2 Crores">₹50 Lakhs – ₹2 Crores</option>
                        <option value="₹2 – ₹10 Crores">₹2 – ₹10 Crores</option>
                        <option value="₹10 Crores+">₹10 Crores+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Preferred Discussion Time</label>
                      <input 
                        required 
                        type="text" 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        placeholder="e.g. Weekdays 3 PM - 5 PM IST"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Looking For</label>
                    <div className="grid grid-cols-2 gap-3 px-1">
                      {[
                        "Data Analytics",
                        "Dashboard",
                        "Business Consulting",
                        "Business Matchmaking",
                        "Market Expansion",
                        "Strategic Partnerships"
                      ].map((item) => {
                        const isChecked = formData.lookingForConsulting.includes(item);
                        return (
                          <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setFormData(prev => {
                                  const lookingForConsulting = prev.lookingForConsulting.includes(item)
                                    ? prev.lookingForConsulting.filter(i => i !== item)
                                    : [...prev.lookingForConsulting, item];
                                  return { ...prev, lookingForConsulting };
                                });
                              }}
                              className="sr-only"
                            />
                            <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                              isChecked 
                                ? "bg-premium-yellow border-premium-yellow text-black" 
                                : "border-slate-300 group-hover:border-premium-yellow/50 bg-slate-50"
                            }`}>
                              {isChecked && <span className="text-[10px] font-bold">✔</span>}
                            </div>
                            <span className="text-sm text-black font-sans font-normal">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Current Challenges</label>
                    <textarea 
                      required 
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={4} 
                      placeholder="Tell us about the main issues or bottlenecks you are facing..."
                      className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                    />
                  </div>
                </>
              )}

              {/* Dynamic Section: Business Matchmaking */}
              {isMatchmaking && (
                <>
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Looking For</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-1">
                      {[
                        "Buyer",
                        "Supplier",
                        "Distributor",
                        "Importer",
                        "Exporter",
                        "Investor",
                        "Strategic Partner"
                      ].map((item) => {
                        const isChecked = formData.lookingForMatch.includes(item);
                        return (
                          <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setFormData(prev => {
                                  const lookingForMatch = prev.lookingForMatch.includes(item)
                                    ? prev.lookingForMatch.filter(i => i !== item)
                                    : [...prev.lookingForMatch, item];
                                  return { ...prev, lookingForMatch };
                                });
                              }}
                              className="sr-only"
                            />
                            <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                              isChecked 
                                ? "bg-premium-yellow border-premium-yellow text-black" 
                                : "border-slate-300 group-hover:border-premium-yellow/50 bg-slate-50"
                            }`}>
                              {isChecked && <span className="text-[10px] font-bold">✔</span>}
                            </div>
                            <span className="text-sm text-black font-sans font-normal">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Product / Service Category</label>
                      <input 
                        required 
                        type="text" 
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                        placeholder="e.g. Textiles, Medical Devices"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Monthly Requirement / Capacity</label>
                      <input 
                        required 
                        type="text" 
                        name="monthlyCapacity"
                        value={formData.monthlyCapacity}
                        onChange={handleInputChange}
                        placeholder="e.g. 5000 units/month"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Target Market</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 px-1">
                      {[
                        "India",
                        "UAE",
                        "Singapore",
                        "Malaysia",
                        "UK",
                        "USA",
                        "Global"
                      ].map((market) => {
                        const isChecked = formData.targetMarket.includes(market);
                        return (
                          <label key={market} className="flex items-center gap-3 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setFormData(prev => {
                                  const targetMarket = prev.targetMarket.includes(market)
                                    ? prev.targetMarket.filter(m => m !== market)
                                    : [...prev.targetMarket, market];
                                  return { ...prev, targetMarket };
                                });
                              }}
                              className="sr-only"
                            />
                            <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                              isChecked 
                                ? "bg-premium-yellow border-premium-yellow text-black" 
                                : "border-slate-300 group-hover:border-premium-yellow/50 bg-slate-50"
                            }`}>
                              {isChecked && <span className="text-[10px] font-bold">✔</span>}
                            </div>
                            <span className="text-sm text-black font-sans font-normal">{market}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Preferred Discussion Time</label>
                      <input 
                        required 
                        type="text" 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        placeholder="e.g. Weekdays 3 PM - 5 PM IST"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Business Introduction</label>
                    <textarea 
                      required 
                      name="businessIntro"
                      value={formData.businessIntro}
                      onChange={handleInputChange}
                      rows={4} 
                      placeholder="Briefly introduce your business operations and requirements..."
                      className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                    />
                  </div>
                </>
              )}

              {/* Dynamic Section: Global Business Connections */}
              {isGlobalConnections && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Country of Interest</label>
                      <input 
                        required 
                        type="text" 
                        name="countryOfInterest"
                        value={formData.countryOfInterest}
                        onChange={handleInputChange}
                        placeholder="e.g. UAE, Singapore"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Industry</label>
                      <input 
                        required 
                        type="text" 
                        name="globalIndustry"
                        value={formData.globalIndustry}
                        onChange={handleInputChange}
                        placeholder="e.g. Manufacturing, Retail"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Business Objective</label>
                      <select 
                        required 
                        name="businessObjective"
                        value={formData.businessObjective}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base appearance-none"
                      >
                        <option value="" disabled hidden>Select Objective</option>
                        <option value="Import">Import</option>
                        <option value="Export">Export</option>
                        <option value="Joint Venture">Joint Venture</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Investment">Investment</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Preferred Discussion Time</label>
                      <input 
                        required 
                        type="text" 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        placeholder="e.g. Weekdays 3 PM - 5 PM IST"
                        className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Target Companies</label>
                    <input 
                      required 
                      type="text" 
                      name="targetCompanies"
                      value={formData.targetCompanies}
                      onChange={handleInputChange}
                      placeholder="e.g. Distributors in UAE, Retail chains in UK"
                      className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-black uppercase tracking-widest px-1">Brief Requirement</label>
                    <textarea 
                      required 
                      name="briefRequirement"
                      value={formData.briefRequirement}
                      onChange={handleInputChange}
                      rows={4} 
                      placeholder="Describe your international expansion requirements..."
                      className="w-full bg-slate-50 border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300 font-sans text-base" 
                    />
                  </div>
                </>
              )}
              
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
                    {status === "sending" && <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />}
                    {status !== "sending" && (
                      <>
                        {status === "idle" && <Send className="h-4 w-4" />}
                        {getButtonText(formData.support, status)}
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>

            {/* Prefer Instant Assistance Section */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h4 className="text-base font-bold font-display text-black mb-4 uppercase tracking-widest">
                Prefer Instant Assistance?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="tel:+919787333379"
                  className="bg-slate-50 border border-slate-200 text-black hover:border-premium-yellow/50 hover:bg-slate-100/30 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 justify-center group"
                >
                  <Phone className="h-4 w-4 text-premium-yellow group-hover:scale-110 transition-transform" />
                  <span>Call 1-to-1</span>
                </a>
                <a
                  href="https://wa.me/919787333379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 border border-slate-200 text-black hover:border-premium-yellow/50 hover:bg-slate-100/30 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 justify-center group"
                >
                  <svg className="h-4 w-4 text-[#25D366] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="https://wa.me/919787333379?text=I%20want%20to%20schedule%20a%20consultation%20meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 border border-slate-200 text-black hover:border-premium-yellow/50 hover:bg-slate-100/30 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 justify-center group"
                >
                  <Calendar className="h-4 w-4 text-premium-yellow group-hover:scale-110 transition-transform" />
                  <span>Book Meeting</span>
                </a>
              </div>
            </div>

            {/* What Happens Next Section */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h4 className="text-base font-bold font-display text-black mb-4 uppercase tracking-widest">
                What Happens Next?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Consultation request received",
                  "Initial requirement discussion",
                  "Business assessment",
                  "Solution recommendation",
                  "Proposal & implementation roadmap"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="h-5 w-5 rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center text-[10px] text-premium-yellow font-bold flex-none">✔</span>
                    <span className="text-sm text-black font-sans font-normal">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
