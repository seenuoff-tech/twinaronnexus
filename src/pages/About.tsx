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
    year: "2023",
    title: "Business Foundation",
    desc: "Started helping small businesses organize and analyze operational data."
  },
  {
    year: "2024",
    title: "Dashboard & BI Integration",
    desc: "Expanded into dashboard development and business intelligence solutions."
  },
  {
    year: "2025",
    title: "Custom Systems & Automation",
    desc: "Added custom business systems and workflow automation services."
  },
  {
    year: "2026 & Beyond",
    title: "Global Opportunities Network",
    desc: "Building strategic business connections and growth ecosystems globally."
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
            className="font-display text-5xl font-bold sm:text-7xl mb-8 tracking-tight leading-[1.05] text-black"
          >
            Building Smarter Businesses Through <span className="text-premium-yellow italic">Data, Systems & Connections</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-2xl text-black leading-relaxed max-w-3xl font-sans font-normal"
          >
            TwinaronNexus helps businesses streamline operations, make informed decisions, discover new opportunities and build strategic growth partnerships across industries.
          </motion.p>
        </div>

        {/* Two-Column Core Focus & Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-36">
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-colors">
              <div className="absolute top-0 right-0 h-24 w-24 bg-premium-yellow/5 rounded-full blur-2xl group-hover:bg-premium-yellow/10 transition-all" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-display text-black">
                <Target className="h-6 w-6 text-premium-yellow" /> Our Mission
              </h3>
              <p className="text-black leading-relaxed text-sm font-sans font-normal">
                To help businesses transform data into actionable insights, improve operational efficiency and unlock growth opportunities through technology, analytics and strategic business connections.
              </p>
            </div>
            
            <div className="glass p-8 rounded-3xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-colors">
              <div className="absolute top-0 right-0 h-24 w-24 bg-premium-yellow/5 rounded-full blur-2xl group-hover:bg-premium-yellow/10 transition-all" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-display text-black">
                <Heart className="h-6 w-6 text-premium-yellow" /> Our Values
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-black leading-relaxed text-sm font-sans font-normal">
                {["Transparency", "Business Integrity", "Client-Centric Solutions", "Long-Term Partnerships", "Sustainable Growth", "Data-Driven Decisions"].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-premium-yellow">✔</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership Team Text Card */}
          <div className="glass p-10 rounded-[3rem] border-premium-yellow/20 bg-white shadow-xl h-full flex flex-col justify-center relative overflow-hidden min-h-[300px]">
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-premium-yellow/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-premium-yellow" />
              <h3 className="text-3xl font-extrabold font-display tracking-tight text-black">
                Leadership Team
              </h3>
            </div>
            <p className="text-black leading-relaxed text-base font-sans font-normal">
              TwinaronNexus is led by professionals with experience in business consulting, analytics and growth strategy. We are committed to delivering high-impact solutions that drive tangible business outcomes.
            </p>
          </div>
        </div>

        {/* Acronym Explanation Section */}
        <div className="mb-36">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ IDENTITY DECODED ✦
            </span>
            <h2 className="text-4xl font-bold font-display tracking-tight text-black">
              What TwinaronNexus Means
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* TWINARON card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-slate-200/60 flex flex-col justify-between hover:border-premium-yellow/30 transition-all bg-white"
            >
              <div>
                <h3 className="text-2xl font-extrabold font-display text-premium-yellow tracking-widest mb-6 border-b border-slate-100 pb-4">
                  TWINARON
                </h3>
                <div className="space-y-3">
                  {[
                    { letter: "T", word: "Transforming" },
                    { letter: "W", word: "Wisdom" },
                    { letter: "I", word: "Into" },
                    { letter: "N", word: "New Markets" },
                    { letter: "A", word: "Analytics" },
                    { letter: "R", word: "Relationships" },
                    { letter: "O", word: "Opportunities &" },
                    { letter: "N", word: "Networks" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="font-display font-extrabold text-xl text-black w-6 text-center">{item.letter}</span>
                      <span className="text-base text-black font-sans font-normal">{item.word}</span>
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
                <h3 className="text-2xl font-extrabold font-display text-premium-yellow tracking-widest mb-6 border-b border-slate-100 pb-4">
                  NEXUS
                </h3>
                <div className="space-y-3">
                  {[
                    { letter: "N", word: "Network of" },
                    { letter: "E", word: "Enterprises" },
                    { letter: "X", word: "eXpansion" },
                    { letter: "U", word: "Unified by" },
                    { letter: "S", word: "Strategy" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="font-display font-extrabold text-xl text-black w-6 text-center">{item.letter}</span>
                      <span className="text-base text-black font-sans font-normal">{item.word}</span>
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
              <h2 className="text-4xl font-bold font-display tracking-tight text-black">Core Engineering Pillars</h2>
            </div>
            <p className="text-black text-sm max-w-sm ml-0 md:ml-6 leading-relaxed">
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
                <h4 className="text-lg font-bold font-display mb-3 text-black group-hover:text-premium-yellow transition-colors">{pillar.title}</h4>
                <p className="text-sm text-black leading-relaxed font-sans">{pillar.desc}</p>
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
            <h2 className="text-4xl font-bold font-display tracking-tight leading-tight text-black">The Evolution of TwinaronNexus</h2>
            <p className="text-black text-sm leading-relaxed">
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
                      : "bg-slate-100 text-black border-slate-200 hover:border-slate-350 hover:text-black"
                  }`}
                >
                  {chron.year}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border-slate-200/60 relative overflow-hidden min-h-[290px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03] select-none text-black">
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
                  <h3 className="text-2xl font-bold font-display tracking-tight text-black mb-4">
                    {CHRONICLES[activeChronicle].title}
                  </h3>
                  <p className="text-black text-sm leading-relaxed font-sans max-w-xl">
                    {CHRONICLES[activeChronicle].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-black font-mono mt-8 border-t border-slate-200/60 pt-4">
              <span>METRIC ID: TN-00{activeChronicle + 1}</span>
              <span>•</span>
              <span>VERIFIED STABLE RECORD</span>
            </div>
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="text-center max-w-4xl mx-auto text-black mt-20">
          <span className="inline-block h-2 w-2 rounded-full bg-premium-yellow mb-4" />
          <h2 className="text-4xl font-display font-bold mb-8 tracking-tight">Our Philosophy</h2>
          <p className="text-black text-lg leading-relaxed mb-6 font-sans max-w-2xl mx-auto font-normal">
            We believe businesses grow faster when data, systems and strategic relationships work together.
          </p>
          <p className="text-black text-lg leading-relaxed mb-12 font-sans max-w-2xl mx-auto font-normal">
            Our goal is to simplify decision-making and help businesses scale with clarity and confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
