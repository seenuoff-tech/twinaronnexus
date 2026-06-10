import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Star,
  Info,
  Plus,
  Minus,
  FileText,
  Laptop,
  Layers,
  Settings,
  HelpCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { PRODUCTS } from "../constants/products";
import { formatCurrency, cn } from "../lib/utils";
import { loadRazorpay } from "../lib/razorpay";
import Magnetic from "../components/Magnetic";

const FAQ_ITEMS = [
  {
    q: "How do I receive the template after purchase?",
    a: "Immediately after a successful payment, a download link will be displayed on the screen. Additionally, we will send an automated email containing the download link to your registered email address."
  },
  {
    q: "Do I need any special software to use this system?",
    a: "No special software is required. The system is built in standard Excel (.xlsx) format. It works perfectly on Microsoft Excel (2016 or newer) and Google Sheets."
  },
  {
    q: "Is this a one-time purchase or a subscription?",
    a: "This is a strictly one-time purchase. You get lifetime access to use the template with zero recurring monthly or annual subscription fees."
  },
  {
    q: "Can I customize the sheets and formulas myself?",
    a: "Yes. The files are fully unlocked. You can add sheets, edit columns, customize formulas, and apply your own branding/logo as needed."
  },
  {
    q: "Do you offer customer support if I have questions?",
    a: "Yes. We provide dedicated support for download issues and basic setup. You can reach out to us via email or WhatsApp for quick assistance."
  }
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 3.5 + 1.2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 15 + 12,
  delay: Math.random() * 8,
}));

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "usage">("features");

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center pt-24 bg-white">
        <h1 className="text-2xl font-bold mb-4 font-display">Template not found</h1>
        <Link to="/" className="text-premium-yellow hover:underline">Return Home</Link>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create Order on Server
      const orderResponse = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price,
          currency: "INR",
          receipt: `receipt_${product.id}_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TwinaronNexus",
        description: `Purchase of ${product.name}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          // Verify payment on server
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            setSuccess(true);
          } else {
            alert("Payment verification failed: " + verifyData.message);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F3AE1B",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white min-h-screen text-black pt-24 pb-32">
      {/* Editorial Luxury Radial Background Glow */}
      <div className="absolute inset-0 -z-10 luxury-gradient animate-float-glow" />
      <div className="absolute top-1/3 left-1/4 -z-10 w-[600px] h-[600px] bg-premium-yellow/[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-premium-yellow/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Thin Orthogonal Lines to structure page grid */}
      <div className="absolute left-[12%] top-0 bottom-0 w-px bg-slate-100 -z-10 hidden xl:block" />
      <div className="absolute right-[12%] top-0 bottom-0 w-px bg-slate-100 -z-10 hidden xl:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 border-b border-slate-100 pb-4">
          <Link to="/" className="hover:text-premium-yellow font-bold uppercase tracking-widest transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-400 font-bold uppercase tracking-widest">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left Column: Visual Showcase (Browser mockup) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[2rem] bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-slate-800 overflow-hidden group"
            >
              {/* Mac OS Browser header */}
              <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56] block" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E] block" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F] block" />
                </div>
                <div className="bg-slate-900 border border-slate-800 px-6 py-1 rounded-lg text-[10px] font-mono text-slate-500 w-1/2 text-center uppercase tracking-widest truncate">
                  twinaronnexus.com/templates/{product.slug}
                </div>
                <div className="w-8" />
              </div>

              {/* Main Active Image Display */}
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                
                {/* Active Category Tag */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-premium-yellow text-[9px] font-bold uppercase tracking-widest bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-premium-yellow/20">
                    ✦ {product.category} ✦
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Controls (Interactive) */}
            <div className="grid grid-cols-4 gap-4">
              {product.previews.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={cn(
                    "aspect-video rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 relative border",
                    activeImage === imgUrl 
                      ? "border-premium-yellow ring-2 ring-premium-yellow shadow-md opacity-100 scale-105" 
                      : "border-slate-200/60 opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={imgUrl} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Key Details */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-premium-yellow/20 bg-premium-yellow/[0.04] px-4 py-1.5 text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-premium-yellow">
                <span>✦ PREMIUM BUSINESS SOLUTION ✦</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {product.name}
              </h1>

              <div className="h-1 w-16 bg-premium-yellow rounded-full" />

              <p className="text-lg text-slate-700 leading-relaxed font-sans font-normal">
                {product.description}
              </p>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="rounded-full bg-premium-yellow text-black px-10 py-5 text-xs font-bold tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.35)] active:scale-95 duration-300 transition-all cursor-pointer text-center w-full sm:w-auto luxury-shine-hover shadow-md font-display"
                  >
                    GET TEMPLATE NOW <ChevronRight className="inline-block h-4 w-4 ml-1.5" />
                  </button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollToSection("details-hub")}
                    className="rounded-full bg-black text-white px-10 py-5 text-xs font-bold tracking-widest uppercase hover:bg-slate-900 border border-black duration-300 transition-all cursor-pointer text-center w-full sm:w-auto luxury-shine-hover shadow-sm font-display"
                  >
                    EXPLORE SPECS <ChevronRight className="inline-block h-4 w-4 ml-1.5 text-premium-yellow" />
                  </button>
                </Magnetic>
              </div>

              {/* Quick Spec Badges */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 mt-6">
                {[
                  "Instant Download",
                  "Lifetime Access",
                  "100% Unlocked File",
                  "Sheets & Excel ready"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-premium-yellow flex-none" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section (SaaS Bento Grid Layout) */}
        <div id="benefits" className="border-t border-slate-100 pt-24 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ Strategic Advantages ✦
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight">
              Why Choose Our Ready-To-Use Systems?
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans font-normal leading-relaxed">
              Skip development delays and developer cost pools. Deploy a professional operational system designed to immediately clean up metrics tracking.
            </p>
            <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Setup & Deployment",
                desc: "No waiting for development cycles or complex configurations. Download, open in Excel or Google Sheets, and start tracking your business operations in minutes.",
                icon: Clock
              },
              {
                title: "One-Time Cost, Lifetime Use",
                desc: "Forget expensive monthly software subscriptions. Pay once and own the entire system forever, with zero recurring charges or unexpected maintenance fees.",
                icon: ShieldCheck
              },
              {
                title: "100% Customization Freedom",
                desc: "Unlike rigid SaaS applications, our systems are fully unlocked. Edit formulas, add custom columns, create new dashboards, and adapt it exactly to your growing team.",
                icon: Download
              }
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="glass glass-hover luxury-shine-hover rounded-[2rem] p-10 bg-white relative group overflow-hidden shadow-sm hover:-translate-y-1"
              >
                <div className="h-14 w-14 rounded-2xl bg-premium-yellow/10 flex items-center justify-center mb-8 border border-premium-yellow/20 text-premium-yellow group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-black mb-4 group-hover:text-premium-yellow transition-colors">{benefit.title}</h3>
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-normal">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details & Specs Dynamic Tab Hub (Reduces Scrolling, Extremely Professional) */}
        <div id="details-hub" className="border-t border-slate-100 pt-24 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ System Blueprint ✦
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight">
              Explore The System Structure
            </h2>
            <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
          </div>

          {/* Tab Selector Header */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 p-1.5 rounded-full flex gap-1 border border-slate-200">
              {[
                { id: "features", label: "Core Features", icon: Layers },
                { id: "specs", label: "Technical Specs", icon: FileText },
                { id: "usage", label: "Usage Model", icon: Laptop }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer font-display",
                    activeTab === tab.id 
                      ? "bg-white text-black shadow-sm" 
                      : "text-slate-550 hover:text-black"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {product.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className="glass glass-hover rounded-[1.5rem] p-6 border-slate-100 bg-slate-50/20 flex items-start gap-4 group transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-xl bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-premium-yellow font-bold flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                        <span className="text-sm font-display font-extrabold">0{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-black mb-2 group-hover:text-premium-yellow transition-colors">{feature}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans font-normal">
                          Engineered interface element providing quick parameters inputs, real-time recalculations, and visual graphing logic.
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="glass rounded-[2rem] overflow-hidden border-slate-200/60 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-150">
                          <th className="p-6 text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Specification Parameter</th>
                          <th className="p-6 text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Detail Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specs).map(([key, value], idx) => (
                          <tr key={key} className={cn("border-b border-slate-100 last:border-b-0", idx % 2 === 1 && "bg-slate-50/10")}>
                            <td className="p-6 text-sm font-bold text-slate-900 font-display">{key}</td>
                            <td className="p-6 text-sm text-slate-650 font-sans">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "usage" && (
                <motion.div
                  key="usage"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  {[
                    {
                      step: "01",
                      title: "Secure Purchase Download",
                      desc: "Pay securely via Razorpay. Your file starts downloading instantly, and is simultaneously delivered to your registered email address."
                    },
                    {
                      step: "02",
                      title: "Launch in Sheets / Excel",
                      desc: "Double-click the downloaded .xlsx file to open it in Microsoft Excel, or drag & drop it directly into Google Drive to use it in Google Sheets."
                    },
                    {
                      step: "03",
                      title: "Input Base Settings",
                      desc: "Enter your base currency, tax rates, sales channels, or target values in the structured configurations module to set up your equations."
                    },
                    {
                      step: "04",
                      title: "Daily Ledger Operations",
                      desc: "Begin cataloging client entries, transactions records, or orders. Watch the dashboard automatically populate with trends graphs."
                    }
                  ].map((step, i) => (
                    <div key={i} className="glass glass-hover rounded-[2rem] p-8 bg-white/40 border-slate-100 flex gap-6">
                      <span className="text-3xl font-display font-extrabold text-premium-yellow/30">{step.step}</span>
                      <div>
                        <h4 className="font-display font-bold text-base text-slate-900 mb-2">{step.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Split problem-solution split canvas (Modern, High Contrast) */}
        <div id="split-solution" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 pt-10">
          
          {/* Left Panel: Common Business Challenges (Deep Slate Card) */}
          <div className="bg-[#111625] text-white rounded-[3rem] p-10 lg:p-14 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient gold glow decoration */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-premium-yellow/[0.02] blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF5F56] font-bold uppercase block mb-4">
                ✦ Key Challenges Solved ✦
              </span>
              <h3 className="font-display font-extrabold text-3xl lg:text-4xl leading-tight text-white mb-6">
                Tired Of Manual Chaos?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md font-sans">
                Operating a growing enterprise shouldn't translate to endless hours of administrative stress. We solve these critical bottlenecks:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <span className="h-6 w-6 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[10px] text-red-400 font-bold mt-0.5 flex-none group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                      ✕
                    </span>
                    <span className="text-xs text-slate-300 leading-relaxed font-sans">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 mt-10 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
              <span>PROBLEM SET</span>
              <span className="text-[#FF5F56]">LOCKED</span>
            </div>
          </div>

          {/* Right Panel: Target Audience & ideal fits (Clean White/Gold Card) */}
          <div className="glass rounded-[3rem] p-10 lg:p-14 border-slate-200/60 bg-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient gold glow decoration */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-premium-yellow/[0.04] blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-bold uppercase block mb-4">
                ✦ Who is this for? ✦
              </span>
              <h3 className="font-display font-extrabold text-3xl lg:text-4xl leading-tight text-slate-900 mb-6">
                Designed For Growth
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed mb-10 max-w-md font-sans">
                {product.whoIsForDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.whoIsFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <span className="h-6 w-6 rounded-lg bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center text-[10px] text-premium-yellow font-bold mt-0.5 flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                      ✔
                    </span>
                    <span className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 mt-10 border-t border-slate-100 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>TARGET SPACE</span>
              <span className="text-premium-yellow font-bold">MATCHED</span>
            </div>
          </div>
        </div>

        {/* Pricing Section (Centered Box Card Styling) */}
        <div id="pricing" className="border-t border-slate-100 pt-24 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ Pricing Plan ✦
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans font-normal leading-relaxed">
              No hidden fees, no subscriptions. Get lifetime access to the entire template now.
            </p>
            <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass p-8 lg:p-12 rounded-[2.5rem] border-premium-yellow/20 bg-gradient-to-b from-white to-slate-50/20 shadow-[0_25px_60px_rgba(241,184,16,0.06)] relative overflow-hidden text-black">
              {/* Premium Glow Accent */}
              <div className="absolute top-0 right-0 p-8">
                <div className="h-12 w-12 rounded-full border border-premium-yellow/20 flex items-center justify-center animate-pulse">
                  <Info className="h-5 w-5 text-premium-yellow" />
                </div>
              </div>

              <div className="text-center mb-8">
                <span className="text-premium-yellow text-xs font-bold bg-premium-yellow/10 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  One-Time Investment
                </span>
                <h3 className="font-display font-extrabold text-2xl mt-4 text-black">{product.name}</h3>
                <p className="text-sm text-slate-500 mt-2">Fully unlocked .xlsx spreadsheet template</p>
              </div>

              <div className="flex flex-col items-center justify-center mb-10">
                <span className="text-5xl lg:text-6xl font-extrabold font-display text-black">{formatCurrency(product.price)}</span>
              </div>

              <div className="space-y-4 flex flex-col items-center">
                <Magnetic strength={0.15}>
                  <button
                    onClick={handleBuyNow}
                    disabled={loading || success}
                    className={cn(
                      "rounded-full px-16 py-5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer w-full sm:w-auto luxury-shine-hover shadow-md font-display",
                      success 
                        ? "bg-green-500 text-white cursor-default" 
                        : "bg-premium-yellow text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] active:scale-95 disabled:opacity-50"
                    )}
                  >
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : success ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" /> PAYMENT SUCCESSFUL
                      </>
                    ) : (
                      <>PURCHASE TEMPLATE <ChevronRight className="h-4 w-4" /></>
                    )}
                  </button>
                </Magnetic>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2 pt-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-premium-yellow" /> Secure checkout transfer protocol via Razorpay
                </p>
              </div>

              {/* Delivery Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 border-t border-slate-100 pt-8">
                <div className="flex items-start gap-4 p-4 glass rounded-[1.5rem] border-slate-100 bg-slate-50/30">
                  <div className="h-10 w-10 flex-none rounded-xl bg-slate-100 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-premium-yellow" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black mb-1 uppercase tracking-wider font-mono">One-Time Purchase</p>
                    <p className="text-[11px] text-slate-505 leading-relaxed">Download once, use forever. No subscriptions or hidden fees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 glass rounded-[1.5rem] border-slate-100 bg-slate-50/30">
                  <div className="h-10 w-10 flex-none rounded-xl bg-slate-100 flex items-center justify-center">
                    <Download className="h-5 w-5 text-premium-yellow" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black mb-1 uppercase tracking-wider font-mono">Instant Delivery</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Get immediate access on the screen and via email after purchase.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customized Consultation Callout Section (Yellow background) */}
        <section id="custom-cta" className="mb-24 pt-10">
          <div className="mx-auto max-w-4xl rounded-[3rem] bg-gradient-to-r from-premium-yellow via-[#F3AE1B] to-[#F1B810] p-10 lg:p-16 text-black text-center relative overflow-hidden group shadow-[0_20px_55px_rgba(243,174,27,0.25)] border border-white/10">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-black/[0.04] blur-3xl transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/[0.1] blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="font-mono text-[9px] tracking-[0.25em] text-black font-extrabold uppercase block mb-4">
                ✦ Tailored Solutions ✦
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-display mb-4 tracking-tight text-black leading-tight">
                Need a Customized Dashboard, Reporting System or Business Tracking Solution?
              </h2>
              <p className="text-black/85 text-sm sm:text-base max-w-2xl mx-auto mb-10 font-sans font-normal leading-relaxed">
                Every business operations model is unique. Book a free consultation call with our analyst team, and we will build a custom-tailored system designed specifically around your workflow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Magnetic strength={0.15}>
                  <Link
                    to="/contact?type=Customized%20Solution"
                    className="inline-block rounded-full bg-black text-white px-10 py-4.5 text-xs tracking-widest font-display font-semibold hover:bg-slate-900 transition-all duration-300 shadow-lg cursor-pointer text-center w-full sm:w-auto luxury-shine-hover"
                  >
                    REQUEST CONSULTATION
                  </Link>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="https://wa.me/919787333379"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-white text-black px-10 py-4.5 text-xs tracking-widest font-display font-semibold hover:bg-slate-105 transition-all duration-300 shadow-md text-center border border-white w-full sm:w-auto luxury-shine-hover"
                  >
                    WHATSAPP US
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-slate-100 pt-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <div className="h-10 w-10 rounded-full bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-sm text-premium-yellow font-mono font-bold">?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-black leading-tight">Frequently Asked Questions</h2>
              <p className="mt-4 text-sm text-slate-500 font-sans leading-relaxed">
                Everything you need to know about purchasing, customizing, and using our business templates.
              </p>
            </div>
            
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <span className="font-semibold text-base text-black group-hover:text-black transition-colors">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="flex-none p-1"
                    >
                      {openFaq === i ? (
                        <Minus className="h-4 w-4 text-premium-yellow" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-400" />
                      )}
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-6 pb-6 text-slate-700 text-sm leading-relaxed border-t border-slate-200/60 pt-4 font-sans font-normal whitespace-pre-line">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Modal */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full glass rounded-[2.5rem] p-10 text-center border-premium-yellow/20 animate-fade-in"
              >
                <div className="h-20 w-20 rounded-full bg-premium-yellow/20 flex items-center justify-center mx-auto mb-8">
                  <Download className="h-10 w-10 text-premium-yellow" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-display text-black">Thank You!</h2>
                <p className="text-slate-650 mb-8 text-sm">
                  Your payment was successful. We have sent the download link to your email. You can also download it directly below.
                </p>
                <a 
                  href={`/api/download/ORDER_SUCCESS`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-premium-yellow text-black py-4 rounded-2xl font-bold mb-4 hover:scale-105 transition-transform text-center"
                >
                  Download .xlsx Template
                </a>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-slate-500 text-sm hover:underline"
                >
                  Close Window
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
