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
  Minus
} from "lucide-react";
import { useState } from "react";
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

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center pt-24">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
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
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-black mb-8">
          <Link to="/" className="hover:text-black font-medium transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-600 text-sm font-normal">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Visuals & Tech Specs */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-video glass rounded-[2rem] overflow-hidden border-slate-200/60 relative group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-8 left-8">
                <span className="text-premium-yellow text-xs font-bold uppercase tracking-widest bg-slate-900/10 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/20">
                  {product.category}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square glass rounded-2xl border-slate-200/60 opacity-60 overflow-hidden">
                   <img src={product.image} className="h-full w-full object-cover blur-[1px]" />
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-8 border-slate-200/60 text-black bg-white/50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-premium-yellow" />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">{key}</p>
                    <p className="text-base font-semibold text-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: info */}
          <div className="flex flex-col justify-center lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4 text-base text-black font-semibold">
                <span className="text-premium-yellow font-bold">✔</span> Trusted by Growing Businesses
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight mb-6 sm:text-5xl lg:text-6xl text-black">
                {product.name}
              </h1>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="rounded-full bg-premium-yellow text-black px-10 py-5 text-xs font-bold tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] duration-300 transition-all cursor-pointer text-center w-full sm:w-auto"
                  >
                    VIEW PRICING & BUY <ChevronRight className="inline-block h-4 w-4 ml-1" />
                  </button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="rounded-full bg-black text-white px-10 py-5 text-xs font-bold tracking-widest uppercase hover:bg-slate-900 border border-black duration-300 transition-all cursor-pointer text-center w-full sm:w-auto"
                  >
                    EXPLORE FEATURES <ChevronRight className="inline-block h-4 w-4 ml-1 text-premium-yellow" />
                  </button>
                </Magnetic>
              </div>

              {/* Core Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-3 text-black">
                  <CheckCircle2 className="h-5 w-5 text-premium-yellow flex-none" />
                  <span className="text-sm font-semibold">Instant Digital Download</span>
                </div>
                <div className="flex items-center gap-3 text-black">
                  <CheckCircle2 className="h-5 w-5 text-premium-yellow flex-none" />
                  <span className="text-sm font-semibold">One-Time Pay, Lifetime Access</span>
                </div>
                <div className="flex items-center gap-3 text-black">
                  <CheckCircle2 className="h-5 w-5 text-premium-yellow flex-none" />
                  <span className="text-sm font-semibold">100% Fully Unlocked & Edit-ready</span>
                </div>
                <div className="flex items-center gap-3 text-black">
                  <CheckCircle2 className="h-5 w-5 text-premium-yellow flex-none" />
                  <span className="text-sm font-semibold">Excel & Google Sheets Compatible</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="mt-28 border-t border-slate-100 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ Strategic Advantages ✦
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-black leading-tight">
              Why Choose Our Ready-To-Use Systems?
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans font-normal leading-relaxed">
              Skip weeks of custom development and thousands in setup costs. Get a professional business tracking layout designed for immediate operational clarity.
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
                className="glass rounded-3xl p-8 border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"
              >
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center mb-6 border border-premium-yellow/20">
                  <benefit.icon className="h-5 w-5 text-premium-yellow" />
                </div>
                <h3 className="font-display text-lg font-bold text-black mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans font-normal">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-28 border-t border-slate-100 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ Powerful Features ✦
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-black leading-tight">
              Key Capabilities of the System
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans font-normal leading-relaxed">
              Every section of the dashboard is engineered to provide absolute control and visual insight into your daily operations.
            </p>
            <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, i) => (
              <div 
                key={i} 
                className="glass rounded-2xl p-6 border-slate-100 bg-slate-50/20 hover:border-premium-yellow/30 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="h-9 w-9 rounded-xl bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-premium-yellow font-bold flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-black mb-1">{feature}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-normal">
                    Streamlined interface component engineered specifically for tracking and operational optimization.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who Is This For Section */}
        <div id="audience" className="mt-28 border-t border-slate-100 pt-20">
          <div className="glass rounded-[2.5rem] p-8 lg:p-12 border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ Target Audience ✦
              </span>
              <h3 className="font-display font-bold text-3.5xl text-black leading-tight mb-4">
                Who Is This For?
              </h3>
              <p className="text-base text-slate-600 font-sans font-normal leading-relaxed">
                {product.whoIsForDescription}
              </p>
              <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.whoIsFor.map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass rounded-2xl p-5 border-slate-100 bg-slate-50/30 hover:border-premium-yellow/20 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                >
                  <span className="h-7 w-7 rounded-lg bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-[10px] text-premium-yellow font-bold mt-0.5 flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                    ✔
                  </span>
                  <span className="text-sm text-black font-sans font-semibold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Challenges Solved Section */}
        <div id="challenges" className="mt-28 border-t border-slate-100 pt-20">
          <div className="glass rounded-[2.5rem] p-8 lg:p-12 border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ Problem Solver ✦
              </span>
              <h3 className="font-display font-bold text-3.5xl text-black leading-tight mb-4">
                Common Business Challenges This System Solves
              </h3>
              <p className="text-base text-slate-600 font-sans font-normal leading-relaxed">
                Running a business shouldn't mean drowning in administrative tasks. Our pre-built systems are explicitly engineered to resolve these daily operational pain points.
              </p>
              <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.challenges.map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass rounded-2xl p-5 border-slate-100 bg-slate-50/30 hover:border-premium-yellow/20 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                >
                  <span className="h-7 w-7 rounded-lg bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-[10px] text-premium-yellow font-bold mt-0.5 flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                    ✔
                  </span>
                  <span className="text-sm text-black font-sans font-semibold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-28 border-t border-slate-100 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ Pricing Plan ✦
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-black leading-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans font-normal leading-relaxed">
              No hidden fees, no subscriptions. Get lifetime access to the entire template now.
            </p>
            <div className="h-1 w-12 bg-premium-yellow mt-4 mx-auto rounded-full" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass p-8 lg:p-12 rounded-[2.5rem] border-premium-yellow/20 bg-white shadow-lg relative overflow-hidden text-black">
              {/* Premium Glow Accent */}
              <div className="absolute top-0 right-0 p-8">
                <div className="h-12 w-12 rounded-full border border-premium-yellow/20 flex items-center justify-center animate-pulse">
                  <Info className="h-5 w-5 text-premium-yellow" />
                </div>
              </div>

              <div className="text-center mb-8">
                <span className="text-premium-yellow text-xs font-bold bg-premium-yellow/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  One-Time Investment
                </span>
                <h3 className="font-display font-bold text-2xl mt-4 text-black">{product.name}</h3>
                <p className="text-sm text-slate-500 mt-2">Fully unlocked .xlsx spreadsheet template</p>
              </div>

              <div className="flex flex-col items-center justify-center mb-10">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-5xl lg:text-6xl font-bold font-display text-black">{formatCurrency(product.price)}</span>
                  <span className="text-slate-400 line-through text-xl">{formatCurrency(product.price * 2)}</span>
                </div>
                <span className="text-premium-yellow text-xs font-bold bg-premium-yellow/15 px-3 py-1 rounded-full mt-3 uppercase tracking-wider">
                  50% OFF (Limited Time Offer)
                </span>
              </div>

              <div className="space-y-4 flex flex-col items-center">
                <Magnetic strength={0.15}>
                  <button
                    onClick={handleBuyNow}
                    disabled={loading || success}
                    className={cn(
                      "rounded-full px-16 py-5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer w-full sm:w-auto",
                      success 
                        ? "bg-green-500 text-white cursor-default" 
                        : "bg-premium-yellow text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] active:scale-95 disabled:opacity-50"
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
                    <p className="text-xs font-bold text-black mb-1 uppercase tracking-wider">One-Time Purchase</p>
                    <p className="text-[11px] text-slate-500">Download once, use forever. No subscriptions or hidden fees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 glass rounded-[1.5rem] border-slate-100 bg-slate-50/30">
                  <div className="h-10 w-10 flex-none rounded-xl bg-slate-100 flex items-center justify-center">
                    <Download className="h-5 w-5 text-premium-yellow" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black mb-1 uppercase tracking-wider">Instant Delivery</p>
                    <p className="text-[11px] text-slate-500">Get immediate access on the screen and via email after purchase.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customized Consultation Callout Section */}
        <section id="custom-cta" className="mt-28 border-t border-slate-100 pt-20">
          <div className="mx-auto max-w-4xl rounded-[3rem] bg-gradient-to-r from-premium-yellow via-[#F3AE1B] to-[#F1B810] p-10 lg:p-16 text-black text-center relative overflow-hidden group shadow-[0_15px_50px_rgba(243,174,27,0.25)] border border-white/10">
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
              <p className="text-black/80 text-sm sm:text-base max-w-2xl mx-auto mb-10 font-sans font-normal leading-relaxed">
                Every business operations model is unique. Book a free consultation call with our analyst team, and we will build a custom-tailored system designed specifically around your workflow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Magnetic strength={0.15}>
                  <Link
                    to="/contact?type=Customized%20Solution"
                    className="inline-block rounded-full bg-black text-white px-10 py-4.5 text-xs tracking-widest font-display font-semibold hover:bg-slate-900 transition-all duration-300 shadow-lg cursor-pointer text-center w-full sm:w-auto"
                  >
                    REQUEST CONSULTATION
                  </Link>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="https://wa.me/919787333379"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-white text-black px-10 py-4.5 text-xs tracking-widest font-display font-semibold hover:bg-slate-100 transition-all duration-300 shadow-md text-center border border-white w-full sm:w-auto"
                  >
                    WHATSAPP US
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-28 border-t border-slate-100 pt-20">
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
                    className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors group"
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
                <p className="text-slate-600 mb-8 text-sm">
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
