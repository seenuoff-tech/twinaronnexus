import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Target, 
  Zap, 
  Rocket, 
  Shield, 
  Heart,
  Sparkles,
  Cpu,
  Layers,
  Award,
  TrendingUp,
  Gauge
} from "lucide-react";
import { useState } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import Magnetic from "../components/Magnetic";

const CHRONICLES = [
  {
    year: "Q1 2023",
    title: "The Genesis of Sovereign Finance",
    desc: "Frustrated by subscription-fatigue and bloated SaaS tracking tools, we drafted the blueprint for zero-external-dependency, fully automated financial models operating entirely inside native Excel environments."
  },
  {
    year: "Q3 2024",
    title: "Engine 1.0 Release",
    desc: "Unveiled our first-ever dual-dashboard frameworks. Achieved zero-lag formulas with custom-compiled layout colors optimized to reduce eye fatigue for high-frequency ledger entries."
  },
  {
    year: "Q2 2025",
    title: "Global Venture Integration",
    desc: "Adopted by boutique agencies, retail hubs, and freelance consultancies worldwide. Surpassed 3,000 active customers running our systems under real operational stress without a single broken cell."
  },
  {
    year: "2026 & Beyond",
    title: "Quantitative Projections",
    desc: "Launching fully automated multi-currency ledgers, algorithmic tax-scrapers, and unified cashflow matrices. Championing sovereign, offline-first digital infrastructure for modern founders."
  }
];

const PILLARS = [
  {
    icon: Cpu,
    title: "Mathematical Precision",
    desc: "Every spreadsheet runs customized, non-volatile vector formulas. Zero dependency on heavy VBA macros or complex scripts, guaranteeing cross-device performance and bulletproof formula stability."
  },
  {
    icon: Layers,
    title: "Bespoke SaaS-Like Interface",
    desc: "No more default grid designs. Our templates utilize premium typography pairings, spacious margins, and high-contrast styling guides to look like modern software."
  },
  {
    icon: Gauge,
    title: "Sovereign Asset Mentality",
    desc: "We build tools that you buy once and own forever. Your financial and operational ledger parameters stay entirely local, private, and offline to guarantee total privacy."
  }
];

export default function About() {
  const [activeChronicle, setActiveChronicle] = useState(0);

  return (
    <div className="pt-32 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Modern Minimalist Pre-Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-premium-yellow/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase">
            THE ORIGIN STATEMENT
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-bold sm:text-7xl mb-8 tracking-tight leading-[1.05] text-slate-900"
          >
            Redefining <span className="text-premium-yellow italic">Financial Clarity</span> for Small Business.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-slate-650 leading-relaxed max-w-3xl font-sans"
          >
            TwinaronNexus was founded with an unyielding mandate: to equip high-growth ventures and sovereign entrepreneurs with world-class financial analytical models that skip the complexity of heavy enterprise software and require zero recurring fees.
          </motion.p>
        </div>

        {/* Two-Column Core Focus & CEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-36">
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-colors">
              <div className="absolute top-0 right-0 h-24 w-24 bg-premium-yellow/5 rounded-full blur-2xl group-hover:bg-premium-yellow/10 transition-all" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-display text-slate-900">
                <Target className="h-6 w-6 text-premium-yellow" /> Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                To bridge the structural gap between overly complex, slow web tools and manual, disorganized spreadsheets. We engineer standard-compliant, fully automated ledger designs leveraging Microsoft Excel and Google Sheets as high-performance runtimes.
              </p>
            </div>
            
            <div className="glass p-8 rounded-3xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-colors">
              <div className="absolute top-0 right-0 h-24 w-24 bg-premium-yellow/5 rounded-full blur-2xl group-hover:bg-premium-yellow/10 transition-all" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-display text-slate-900">
                <Heart className="h-6 w-6 text-premium-yellow" /> Our Values
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Absolute transparency, sovereign data control, and lifetime utility. Your intellectual property and financial stats shouldn't be leased back to you via server gateways; they belong in a file you fully own and command.
              </p>
            </div>
          </div>

          {/* CEO Aspect Card */}
          <div className="relative aspect-[3/4] sm:aspect-square glass rounded-[3rem] overflow-hidden border-premium-yellow/20 group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              alt="CEO of TwinaronNexus" 
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            {/* Elegant glassmorphic text tag */}
            <div className="absolute bottom-6 left-6 right-6 glass backdrop-blur-md p-6 rounded-2xl border-white/10 transition-transform duration-300 group-hover:translate-y-[-5px]">
              <span className="text-[10px] uppercase tracking-widest text-premium-yellow font-extrabold font-mono mb-1 block">FOUNDER & CEO</span>
              <h4 className="text-xl font-bold font-display tracking-tight text-white mb-1">Aman Vardhan</h4>
              <p className="text-xs text-gray-400 font-mono leading-relaxed">Overseeing quantitative systems design & financial research frameworks at TwinaronNexus.</p>
              
              <div className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-premium-yellow/10 border border-premium-yellow/30">
                <span className="text-[10px] text-premium-yellow font-display font-black">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acronym Explanation Section */}
        <div className="mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ IDENTITY DECODED ✦
              </span>
              <h2 className="text-4xl font-bold font-display tracking-tight text-slate-900">
                What Does TwinaronNexus Mean?
              </h2>
            </div>
            <p className="text-slate-650 text-sm max-w-sm ml-0 md:ml-6 leading-relaxed font-sans font-light">
              Together, TwinaronNexus represents the connection between business wisdom, data-driven insights, strategic partnerships and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* TWINARON card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-slate-200/60 flex flex-col justify-between hover:border-premium-yellow/30 transition-all bg-white"
            >
              <div>
                <h3 className="text-3xl font-extrabold font-display text-premium-yellow tracking-widest mb-8 border-b border-slate-100 pb-4">
                  TWINARON
                </h3>
                <div className="space-y-4">
                  {[
                    { letter: "T", word: "Turning" },
                    { letter: "W", word: "Wisdom" },
                    { letter: "I", word: "Into" },
                    { letter: "N", word: "Next-generation" },
                    { letter: "A", word: "Analytics," },
                    { letter: "R", word: "Risk Management," },
                    { letter: "O", word: "Optimization and" },
                    { letter: "N", word: "Networked Insights." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="font-display font-extrabold text-2xl text-slate-900 w-8 text-center">{item.letter}</span>
                      <span className="text-sm text-slate-650 font-sans">{item.word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* NEXUS card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-slate-200/60 flex flex-col justify-between hover:border-premium-yellow/30 transition-all bg-white"
            >
              <div>
                <h3 className="text-3xl font-extrabold font-display text-premium-yellow tracking-widest mb-8 border-b border-slate-100 pb-4">
                  NEXUS
                </h3>
                <div className="space-y-4">
                  {[
                    { letter: "N", word: "Network of" },
                    { letter: "E", word: "Excellence," },
                    { letter: "X", word: "X-factor Analytics," },
                    { letter: "U", word: "Unified Intelligence and" },
                    { letter: "S", word: "Strategic Growth." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="font-display font-extrabold text-2xl text-slate-900 w-8 text-center">{item.letter}</span>
                      <span className="text-sm text-slate-650 font-sans">{item.word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interactive Engineering Pillars Bento Grid */}
        <div className="mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                SYSTEM STANDARDS
              </span>
              <h2 className="text-4xl font-bold font-display tracking-tight text-slate-900">Core Engineering Pillars</h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm ml-0 md:ml-6 leading-relaxed">
              Every formula grid we craft must pass extremely rigorous verification tests to maximize compute optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: idx * 0.08 }}
                className="glass p-8 rounded-3xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-all hover:translate-y-[-4px]"
              >
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center mb-6 border border-premium-yellow/20">
                  <pillar.icon className="h-6 w-6 text-premium-yellow" />
                </div>
                <h4 className="text-lg font-bold font-display mb-3 text-slate-900 group-hover:text-premium-yellow transition-colors">{pillar.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline Chronicle */}
        <div className="mb-36 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-32 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase">
              CHRONICLE ROADMAP
            </span>
            <h2 className="text-4xl font-bold font-display tracking-tight leading-tight text-slate-900">The Evolution of TwinaronNexus</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              A brief retrospective documenting our journey from a minimalist private utility to a global standard for sovereign financial tracking.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {CHRONICLES.map((chron, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChronicle(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    activeChronicle === idx 
                      ? "bg-premium-yellow text-black border-premium-yellow" 
                      : "bg-slate-100 text-slate-650 border-slate-200 hover:border-slate-350 hover:text-slate-800"
                  }`}
                >
                  {chron.year}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border-slate-200/60 relative overflow-hidden min-h-[290px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03] select-none text-slate-900">
              <span className="text-9xl font-black font-display font-black">✦</span>
            </div>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChronicle}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="text-xs text-premium-yellow font-mono font-extrabold tracking-widest uppercase block mb-3">
                    {CHRONICLES[activeChronicle].year} / STAGE NOTE
                  </span>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 mb-4">
                    {CHRONICLES[activeChronicle].title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans max-w-xl">
                    {CHRONICLES[activeChronicle].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-8 border-t border-slate-200/60 pt-4">
              <span>METRIC ID: TN-00{activeChronicle + 1}</span>
              <span>•</span>
              <span>VERIFIED STABLE RECORD</span>
            </div>
          </div>
        </div>

        {/* Quantitative Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 glass rounded-2xl border-slate-200/60 relative group hover:border-premium-yellow/30 transition-colors"
          >
            <div className="absolute top-2 right-4 text-[9px] text-premium-yellow/20 font-display font-black">✦</div>
            <p className="text-[10px] text-premium-yellow uppercase tracking-widest font-extrabold font-mono mb-2">Systems Founded</p>
            <p className="text-4xl font-extrabold font-display text-slate-900">
              <AnimatedCounter value={2023} decimals={0} />
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-8 glass rounded-2xl border-slate-200/60 relative group hover:border-premium-yellow/30 transition-colors"
          >
            <div className="absolute top-2 right-4 text-[9px] text-premium-yellow/20 font-display font-black">✦</div>
            <p className="text-[10px] text-premium-yellow uppercase tracking-widest font-extrabold font-mono mb-2">Ledgers Executed</p>
            <p className="text-4xl font-extrabold font-display text-slate-900">
              <AnimatedCounter value={5000} decimals={0} suffix="+" />
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-8 glass rounded-2xl border-slate-200/60 relative group hover:border-premium-yellow/30 transition-colors"
          >
            <div className="absolute top-2 right-4 text-[9px] text-premium-yellow/20 font-display font-black">✦</div>
            <p className="text-[10px] text-premium-yellow uppercase tracking-widest font-extrabold font-mono mb-2">Premium Matrices</p>
            <p className="text-4xl font-extrabold font-display text-slate-900">
              <AnimatedCounter value={10} decimals={0} suffix="+" />
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-8 glass rounded-2xl border-slate-200/60 relative group hover:border-premium-yellow/30 transition-colors"
          >
            <div className="absolute top-2 right-4 text-[9px] text-premium-yellow/20 font-display font-black">✦</div>
            <p className="text-[10px] text-premium-yellow uppercase tracking-widest font-extrabold font-mono mb-2">Formula Integrity</p>
            <p className="text-4xl font-extrabold font-display text-slate-900">
              <AnimatedCounter value={100} decimals={0} suffix="%" />
            </p>
          </motion.div>
        </div>

        {/* High-Contrast Philosophy Section */}
        <div className="text-center max-w-4xl mx-auto text-slate-900">
          <span className="inline-block h-2 w-2 rounded-full bg-premium-yellow mb-4" />
          <h2 className="text-4xl font-display font-bold mb-8 tracking-tight">Meet the Philosophy</h2>
          <p className="text-slate-650 text-base leading-relaxed mb-12 font-sans max-w-2xl mx-auto">
            At TwinaronNexus, we don’t just build spreadsheets. We deliver absolute operational engineering. Let’s eliminate the overhead of clumsy cloud services together and unlock structural financial prosperity with robust, local tools.
          </p>
          
          <div className="inline-flex items-center gap-4 text-left glass p-5 rounded-2xl border-slate-200/60 transition-all hover:bg-slate-100/50">
             <div className="h-14 w-14 rounded-full overflow-hidden border border-premium-yellow/25">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                  alt="Aman Vardhan" 
                  className="h-full w-full object-cover"
                />
             </div>
             <div>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                   Aman Vardhan
                   <span className="text-[9px] bg-premium-yellow/10 text-premium-yellow border border-premium-yellow/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">FOUNDER</span>
                </p>
                <p className="text-xs text-slate-500 font-mono">Chief Systems Architect & Quantitative Lead</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
