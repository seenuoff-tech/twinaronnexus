import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Download, 
  Users, 
  CheckCircle2,
  HelpCircle,
  Plus,
  Minus
} from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "../constants/products";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import Magnetic from "../components/Magnetic";

const FEATURES = [
  { icon: BarChart3, title: "Expense Tracking", desc: "Monitor every penny spent with granular categorization." },
  { icon: Zap, title: "Real-time Analytics", desc: "Visual dashboards that update instantly as you enter data." },
  { icon: ShieldCheck, title: "Tax Ready", desc: "Pre-formatted reports that make tax season a breeze." },
  { icon: Users, title: "Payroll Manager", desc: "Manage staff salaries and benefits effortlessly." },
  { icon: BarChart3, title: "Profit & Loss", desc: "Clear visibility into your bottom line every single month." },
  { icon: Zap, title: "Cash Flow", desc: "Predict future cash positions and avoid shortfalls." },
];

const FAQS = [
  {
    q: "Are these downloadable templates?",
    a: "Yes. Once payment is completed, the template can be downloaded and used for your business operations."
  },
  {
    q: "Are these templates ready to use?",
    a: "Yes. The templates are designed for immediate business use."
  },
  {
    q: "Can the templates be customized?",
    a: "Our ready-made templates are standardized systems. However, businesses with specific operational requirements can contact us for customized dashboard solutions."
  },
  {
    q: "Who are these templates suitable for?",
    a: "Our templates are suitable for online businesses, freelancers, boutique owners, traders, dealers, and distributors."
  },
  {
    q: "How do I acquire a template?",
    a: "Select the template, complete the payment process, and download the template."
  },
  {
    q: "Do you provide custom dashboards?",
    a: "Yes. Businesses requiring customized operational dashboards can submit a business enquiry."
  },
  {
    q: "How does the custom dashboard process work?",
    a: "Businesses must first submit a business enquiry form with their basic operational requirements.\n\nAfter reviewing the enquiry, a one-to-one consultation session will be scheduled to understand the business workflow, tracking requirements, and dashboard expectations before project confirmation."
  }
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: Math.random() * 3.5 + 1.2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 14 + 10,
  delay: Math.random() * 6,
}));

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative isolate luxury-grid overflow-hidden bg-white min-h-screen text-slate-900">
      {/* Editorial Golden Backlit Radial aura */}
      <div className="absolute inset-0 -z-10 luxury-gradient animate-float-glow" />
      
      {/* Luxurious Floating Stardust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-premium-yellow/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -75, 0],
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

      {/* Geometric Framing Orthogonal Lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-200/50 -z-10 hidden lg:block" />
      <div className="absolute right-1/4 top-0 bottom-0 w-px bg-slate-200/50 -z-10 hidden lg:block" />

      {/* Hero Section */}
      <section className="px-6 pt-36 pb-24 lg:pt-52 lg:pb-36 lg:px-12 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Typography & Intent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-premium-yellow/20 bg-premium-yellow/[0.04] px-4 py-1.5 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-premium-yellow animate-pulse">
                <span>✦ NEW: TRADING JOURNAL V2.0 ✦</span>
              </div>
              
              <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl leading-[1.05] text-slate-900 flex flex-wrap gap-x-4">
                {"Sovereign Ledger Suites for".split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic text-premium-yellow font-normal inline-block"
                >
                  Modern
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  Dynasties
                </motion.span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans font-light">
                Secure total financial sovereignty with masterfully engineered, macro-free offline frameworks. Vetted for flawless formula operations beneath modern high-stakes enterprise structures.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-6 items-center">
                <Magnetic strength={0.2}>
                  <a
                    href="#templates"
                    className="rounded-full bg-premium-yellow px-10 py-4.5 text-xs tracking-widest font-display font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] duration-300 block"
                  >
                    ACQUIRE MATRICES
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link
                    to="/about"
                    className="rounded-full border border-slate-200 px-10 py-4.5 text-xs tracking-widest font-display font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 duration-300 block"
                  >
                    THE ORIGIN STATEMENT
                  </Link>
                </Magnetic>
              </div>

              {/* Verified Trust Metrics Group */}
              <div className="mt-14 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } }
                  }}
                  className="flex -space-x-3"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -15 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      key={i} 
                      className="h-11 w-11 rounded-full border-2 border-white bg-gradient-to-tr from-slate-100 to-slate-200 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-premium-yellow/10" />
                    </motion.div>
                  ))}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="h-11 w-11 rounded-full border-2 border-white bg-premium-yellow/15 flex items-center justify-center text-[10px] text-premium-yellow font-mono font-bold"
                  >
                    +5K
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  <p className="font-display font-bold text-sm tracking-wide text-slate-800 uppercase flex items-center gap-1.5">
                    SOVEREIGN VENTURES RUNNING ACTIVE LEDGERS
                  </p>
                  <p className="text-slate-500 text-[11px] font-mono tracking-wider">SECURED & DIRECTED BY TWINARONNEXUS FRAMEWORKS EVERY FISCAL QUARTER</p>
                </motion.div>
              </div>
            </motion.div>
 
            {/* Right Column: High-End Hardware-grade Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              {/* Luxury Frame Halo Ambient back-glow */}
              <div className="absolute -inset-4 bg-premium-yellow/10 rounded-[2.5rem] blur-2xl -z-10 shadow-[0_10px_50px_rgba(241,184,16,0.05)]" />
              
              <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-premium-yellow/20 via-slate-100/10 to-transparent p-px shadow-2xl">
                <div className="h-full w-full rounded-[inherit] bg-white overflow-hidden relative border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                   <div className="absolute inset-0 metallic-shine pointer-events-none" />
                   
                   {/* Luxury mockup header bar */}
                   <div className="p-6 h-full flex flex-col">
                      <div className="flex justify-between items-center mb-10 border-b border-slate-200/60 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-premium-yellow animate-pulse" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">ACTIVE QUANT CORE v2.09</span>
                        </div>
                        <div className="px-3 py-1 bg-premium-yellow/10 rounded-full border border-premium-yellow/20 text-[9px] font-mono font-bold text-premium-yellow uppercase tracking-widest">
                          UNLOCKED MATRIX
                        </div>
                      </div>

                      {/* Financial visual metrics wireframe */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-1">REVISED NET FLOW</p>
                          <p className="text-lg font-bold font-display text-slate-900 tracking-tight">
                            <AnimatedCounter value={428.9} decimals={1} prefix="$" suffix="K" />
                          </p>
                        </div>
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-1">OPERATIONAL MARGIN</p>
                          <p className="text-lg font-bold font-display text-slate-900 tracking-tight">
                            <AnimatedCounter value={22.3} decimals={1} suffix="%" />
                          </p>
                        </div>
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-1">INDEX COMPLIANT</p>
                          <p className="text-lg font-bold font-display text-slate-900 tracking-tight">OBL-089</p>
                        </div>
                      </div>

                      {/* Beautiful simulated high contrast ledger lines */}
                      <div className="flex-1 glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-slate-200/60">
                        {/* Glowing sweeping scanner line */}
                        <motion.div 
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-premium-yellow to-transparent opacity-40 shadow-[0_0_12px_rgba(241,184,16,0.8)] z-10 pointer-events-none"
                        />
                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <span className="text-[10px] text-slate-800 tracking-widest font-mono">FINANCIAL FORECAST</span>
                          <span className="text-[9px] text-premium-yellow font-mono">YEAR-OVER-YEAR SUITE</span>
                        </div>
                        <div className="flex items-end gap-2.5 h-32 pt-2 border-b border-slate-200/60 pb-2 relative z-10">
                           {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85].map((h, i) => (
                             <motion.div 
                               initial={{ height: "0%" }}
                               whileInView={{ height: `${h}%` }}
                               viewport={{ once: true }}
                               transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.4 + i * 0.06 }}
                               key={i} 
                               className="flex-1 bg-gradient-to-t from-premium-yellow/20 to-premium-yellow border-t border-premium-yellow/40 rounded-sm relative group"
                             >
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-slate-800 text-[9px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-md">
                                 {h * 10} pts
                               </div>
                             </motion.div>
                           ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono tracking-wider pt-2">
                          <span>Q1_INIT</span>
                          <span>MID_PHASE</span>
                          <span>Q4_REAL</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Golden Floating Ornament */}
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, 0, -3, 0],
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-6 -right-6 glass p-5 rounded-2xl border-premium-yellow/30 flex items-center justify-center bg-white/90 shadow-[0_4px_20px_rgba(241,184,16,0.1)] z-30"
              >
                <Download className="h-5 w-5 text-premium-yellow" />
                <span className="h-1.5 w-1.5 rounded-full bg-premium-yellow absolute -top-1 -right-1 animate-ping" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-28 relative">
        <div className="absolute right-1/4 top-0 w-px h-full bg-slate-200/40" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ SYSTEM ARCHITECTURE ✦
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight font-display sm:text-5xl text-slate-900">
              Uncompromising Operational Systems
            </h2>
            <p className="mt-4 text-slate-600 max-w-lg mx-auto text-sm leading-relaxed font-sans">
              Every tracking parameter has been meticulously balanced to supply instant analytics without database lag.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] glass border-slate-200/60 hover:border-premium-yellow/30 hover:bg-slate-50/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Micro ornament */}
                <span className="absolute top-4 right-4 text-[9px] text-premium-yellow/20 font-display opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center mb-6 border border-premium-yellow/20">
                  <feature.icon className="h-5 w-5 text-premium-yellow" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-premium-yellow transition-colors">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2.5 font-sans font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-28 bg-slate-50/55 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                THE LEDGER COLLECTION
              </span>
              <h2 className="text-4xl font-extrabold font-display tracking-tight sm:text-5xl text-slate-900">
                Engineered for Your <span className="text-premium-yellow italic font-display">Venture</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm max-w-lg leading-relaxed font-sans font-light">
                Select from our benchmark financial grids, each tailored to isolate, map, and secure specific multi-tier cashflow profiles.
              </p>
            </div>
            <Link to="/contact" className="group flex items-center gap-2 text-premium-yellow font-display text-xs tracking-widest font-bold">
              ACQUIRE CUSTOM BLUEPRINTS <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <CategoryCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 bg-premium-yellow/5 blur-[120px] rounded-full" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                BENCHMARK INTEGRITY
              </span>
              <h2 className="text-4xl font-extrabold font-display leading-[1.15] text-slate-900">
                The Standards of <span className="text-premium-yellow font-display italic font-normal">TwinaronNexus</span>
              </h2>
              <ul className="mt-12 space-y-8">
                {[
                  { t: "Instant Digital Despatch", d: "Bypasses slow wait-gateways; instant automatic cryptographic download package served to your secure inbox seconds post-checkout." },
                  { t: "Ironclad Transit Architecture", d: "Direct multi-layer encrypted transfer pipelines via Razorpay to guarantee seamless checkout safety." },
                  { t: "Absolute Sovereign License", d: "One single transaction releases lifetime file ownership rights. Zero monthly licensing fees, zero arbitrary database checks." },
                  { t: "Direct Personal Advisory LLC", d: "Immediate human support led directly by our primary system architects via direct VIP WhatsApp channels." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1.5 h-5 w-5 flex-none rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center">
                      <span className="text-[10px] text-premium-yellow font-display font-black">✦</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 font-display tracking-tight">{item.t}</h4>
                      <p className="mt-1 text-slate-600 text-xs leading-relaxed font-sans font-light">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 glass rounded-3xl p-6 flex flex-col justify-between border-slate-200/60 transition-all hover:border-slate-350">
                   <div className="text-premium-yellow font-mono text-xs uppercase tracking-wider font-bold">◆ LATENCY-FREE</div>
                   <div>
                     <p className="font-bold text-3xl font-display text-slate-900">
                       <AnimatedCounter value={0.2} decimals={1} suffix="s" />
                     </p>
                     <p className="text-[11px] text-slate-500 mt-1 leading-snug">Instant automated digital courier delivers your template seconds after checkout.</p>
                   </div>
                </div>
                <div className="h-64 bg-premium-yellow rounded-3xl flex items-center justify-center p-8 text-black border border-slate-200/40 shadow-lg">
                   <div className="text-center">
                      <p className="text-5xl font-extrabold font-display">
                        <AnimatedCounter value={100} suffix="%" />
                      </p>
                      <p className="text-[11px] uppercase font-bold tracking-widest mt-2 opacity-80">UNLOCKED FORMULAS</p>
                      <p className="text-[10px] mt-1 leading-normal opacity-60 max-w-[150px] mx-auto">Zero hidden sheets, macros, or arbitrary restrictions.</p>
                   </div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-64 glass rounded-3xl p-8 flex flex-col justify-between border-slate-200/60 transition-all hover:border-slate-350">
                   <p className="font-bold text-2xl font-display text-slate-900">Ironclad<br />Payments</p>
                   <div>
                      <span className="inline-block text-[10px] bg-premium-yellow/10 text-premium-yellow border border-premium-yellow/30 px-2 py-0.5 rounded font-mono font-bold tracking-wider mb-2">RAZORPAY SECURED</span>
                      <p className="text-xs text-slate-500">256-bit SSL encrypted transit & strict multi-factor authentication protocol.</p>
                   </div>
                </div>
                <div className="h-48 glass rounded-3xl p-6 flex flex-col justify-between border-slate-200/60 transition-all hover:border-slate-350">
                   <div className="text-premium-yellow font-mono text-xs uppercase tracking-wider font-bold">◆ RATING</div>
                   <div>
                     <p className="font-bold text-3xl font-display text-slate-900">
                       <AnimatedCounter value={4.9} decimals={1} suffix="★" />
                     </p>
                     <p className="text-[11px] text-slate-500 mt-1 leading-snug">Premium rating across boutique founders, agencies, and high-growth ventures.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-slate-50/45">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 w-10 rounded-full bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-[10px] text-premium-yellow font-mono font-bold">?</span>
            </div>
            <h2 className="text-4xl font-extrabold font-display text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden border-slate-200/60">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors group"
                >
                  <span className="font-semibold text-base text-slate-800 group-hover:text-slate-900 transition-colors">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 135 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex-none p-1"
                  >
                    <Plus className={`h-4 w-4 transition-colors ${openFaq === i ? "text-premium-yellow" : "text-slate-400"}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 pb-6 text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-4 font-sans font-light whitespace-pre-line">
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

      {/* CTA */}
      <section className="py-28 px-6 relative">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-premium-yellow p-12 lg:p-24 text-black text-center relative overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(255,221,0,0.15)]">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-black/[0.03] blur-3xl transition-transform group-hover:scale-110" />
          <h2 className="text-4xl lg:text-6xl font-display font-extrabold mb-8 tracking-tight text-black">
            Secure Your Financial <span className="font-display italic font-normal">Sovereignty</span>
          </h2>
          <p className="text-black/70 text-base max-w-lg mx-auto mb-12 font-sans font-light leading-relaxed">
            Acquire the ultimate offline frameworks trusted by 5,000+ elite business owners, consultants, and agencies globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Magnetic strength={0.25}>
              <a href="#templates" className="bg-black text-white rounded-full px-10 py-5 font-display text-xs tracking-widest font-bold hover:scale-105 transition-transform shadow-lg block">
                ACQUIRE MATRICES
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link to="/contact" className="border border-black/20 hover:border-black rounded-full px-10 py-5 font-display text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-all block">
                CONTACT SUITE
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
