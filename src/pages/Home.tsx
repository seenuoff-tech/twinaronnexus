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
  Minus,
  Eye,
  Brain,
  Cpu,
  TrendingUp,
  Handshake,
  Globe,
  ChevronRight,
  Factory,
  HeartPulse,
  Store,
  Ship,
  Construction,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "../constants/products";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import Magnetic from "../components/Magnetic";

const FEATURES = [
  { icon: Eye, title: "Business Visibility", desc: "Gain clarity on business performance, revenue, expenses and opportunities." },
  { icon: Brain, title: "Smarter Decision Making", desc: "Move beyond assumptions with structured business insights." },
  { icon: Cpu, title: "Operational Efficiency", desc: "Reduce confusion and improve day-to-day business management." },
  { icon: TrendingUp, title: "Revenue Growth", desc: "Identify profitable opportunities and growth areas." },
  { icon: Handshake, title: "Strategic Partnerships", desc: "Connect with relevant business opportunities and networks." },
  { icon: Globe, title: "Global Business Opportunities", desc: "Explore expansion, sourcing, distribution and international collaboration opportunities." },
];

const SERVICES = [
  {
    icon: BarChart3,
    title: "Business Intelligence & Analytics",
    desc: "Gain clarity on revenue, expenses, operational performance and growth opportunities through structured business analysis."
  },
  {
    icon: Cpu,
    title: "Customized Business Dashboards",
    desc: "Customized management systems designed around your business operations, reporting requirements and decision-making needs."
  },
  {
    icon: Brain,
    title: "Business Growth Consulting",
    desc: "Identify business bottlenecks, improve operational efficiency and implement practical growth strategies."
  },
  {
    icon: Handshake,
    title: "Business Matchmaking",
    desc: "Connect with buyers, suppliers, distributors, investors and strategic business partners through curated business introductions."
  },
  {
    icon: Globe,
    title: "Global Business Connections",
    desc: "Explore international sourcing, distribution, export and partnership opportunities through global business networks."
  }
];

const INDUSTRIES = [
  { icon: Factory, name: "Manufacturing", desc: "Production tracking, supply chain visibility, efficiency optimization." },
  { icon: HeartPulse, name: "Healthcare", desc: "Operational workflows, inventory management, performance dashboards." },
  { icon: Store, name: "Retail & Distribution", desc: "Sales analysis, inventory tracking, channel management." },
  { icon: Ship, name: "Export & Import", desc: "Global shipping logs, customs workflows, overseas market analysis." },
  { icon: Construction, name: "Construction", desc: "Project cost tracking, resource allocation, vendor dashboards." },
  { icon: Briefcase, name: "Professional Services", desc: "Billing efficiency, client management, resource utilization." }
];

const PROCESS_STEPS = [
  { step: "Step 1", title: "Submit Business Requirement", desc: "Share details of your business operations and what you want to solve." },
  { step: "Step 2", title: "Consultation & Discovery", desc: "We schedule a dedicated call to dive deep into your workflow." },
  { step: "Step 3", title: "Requirement Analysis", desc: "Our analysts examine your tracking bottlenecks and systems." },
  { step: "Step 4", title: "Proposed Solution", desc: "We map out a customized dashboard or strategic growth plan." },
  { step: "Step 5", title: "Proposal & Quotation", desc: "We deliver a detailed scope, project timeline, and pricing breakdown." },
  { step: "Step 6", title: "Implementation", desc: "We design, build, test, and implement your customized solution." }
];

const WHY_CHOOSE_US = [
  { t: "Business-Focused Approach", d: "We focus on solving real business challenges, improving visibility and supporting growth." },
  { t: "Practical Growth Strategies", d: "Action-oriented recommendations designed for implementation." },
  { t: "Customized Solutions", d: "Solutions designed around your specific business operations and workflows." },
  { t: "Strategic Business Connections", d: "Access relevant buyers, suppliers, distributors and growth opportunities." },
  { t: "Industry Understanding", d: "Experience working across manufacturing, trading, healthcare, retail and export-oriented businesses." },
  { t: "Long-Term Value Creation", d: "Build systems and processes you own without recurring software dependency." },
  { t: "Consultation-Based Engagement", d: "Every solution begins with understanding your business needs." },
  { t: "Scalable Business Solutions", d: "Designed to grow along with your business operations." }
];

const FAQS = [
  {
    q: "Are the business systems downloadable?",
    a: "Yes. Access is provided immediately after successful payment."
  },
  {
    q: "Are these systems ready to use?",
    a: "Yes. They are designed to help businesses start using them immediately."
  },
  {
    q: "Can the systems be customized?",
    a: "Yes. Customization is available after a consultation process and is priced separately based on business requirements."
  },
  {
    q: "Are customized solutions downloadable?",
    a: "No. Customized solutions are developed specifically for your business and implemented based on project scope."
  },
  {
    q: "How do I request a customized solution?",
    a: "Submit the consultation form and our team will review your requirements before scheduling a discussion."
  },
  {
    q: "Who are these solutions suitable for?",
    a: "Manufacturers, Traders, Exporters, Healthcare Businesses, Consultants, Service Providers, Retail Businesses, Startups and Growing Enterprises."
  },
  {
    q: "Do you provide business matchmaking services?",
    a: "Yes. We help connect businesses with potential buyers, suppliers, distributors, investors, and strategic partners through curated introductions."
  },
  {
    q: "Can you connect us with buyers, distributors or strategic partners?",
    a: "Yes. Through our matchmaking channels and partner network, we facilitate targeted connections to help expand your market reach."
  },
  {
    q: "Are your solutions suitable for startups and SMEs?",
    a: "Yes. Our systems and services are designed specifically to meet the needs and resource constraints of startups, small business owners, manufacturers, and growing enterprises."
  },
  {
    q: "Do you offer consultation before implementation?",
    a: "Yes. Every customized solution begins with a structured business requirement analysis and consultation to align with your operations."
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white min-h-screen text-black">
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
              <div className="inline-flex items-center gap-3 rounded-full border border-premium-yellow/20 bg-premium-yellow/[0.04] px-4 py-1.5 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-premium-yellow">
                <span>✦ BUSINESS INTELLIGENCE, STRATEGIC PARTNERSHIPS & GROWTH SOLUTIONS ✦</span>
              </div>
              
              <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl leading-[1.1] text-black">
                Transform Data Into <br />
                <span className="font-display italic text-premium-yellow font-normal">Business Growth</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-black leading-relaxed font-sans font-normal max-w-2xl">
                Helping Business Owners, Manufacturers, Traders, Healthcare Professionals and Exporters gain better visibility, improve decision-making, streamline operations and unlock new business opportunities.
              </p>

              <div className="border-l-2 border-premium-yellow/40 pl-4 py-1">
                <p className="text-base text-black italic font-sans font-normal">
                  Whether you need a ready-to-use business system, a customized management dashboard or strategic business support, TwinaronNexus helps you make informed decisions with confidence.
                </p>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="inline-block rounded-full bg-premium-yellow px-8 py-4 text-xs tracking-widest font-display font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] duration-300 cursor-pointer"
                  >
                    EXPLORE SOLUTIONS
                  </button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <Link
                    to="/contact?type=Customized%20Solution"
                    className="inline-block rounded-full bg-black border border-black px-8 py-4 text-xs tracking-widest font-display font-semibold text-white transition-all hover:bg-slate-900 duration-300 text-center"
                  >
                    REQUEST CONSULTATION
                  </Link>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="https://aaryaworldconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-slate-200 px-8 py-4 text-xs tracking-widest font-display font-semibold text-black transition-all hover:bg-slate-50 hover:border-slate-300 duration-300 text-center"
                  >
                    EXPLORE OPPORTUNITIES
                  </a>
                </Magnetic>
              </div>

              {/* Verified Trust Metrics Group */}
              <div className="mt-14 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-11 w-11 rounded-full border-2 border-white bg-gradient-to-tr from-slate-100 to-slate-200 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-premium-yellow/10" />
                    </div>
                  ))}
                  <div 
                    className="h-11 w-11 rounded-full border-2 border-white bg-premium-yellow/15 flex items-center justify-center text-[10px] text-premium-yellow font-mono font-bold"
                  >
                    500+
                  </div>
                </div>
                <div>
                  <p className="font-display font-bold text-sm tracking-wide text-black uppercase flex items-center gap-1.5">
                    BUSINESS PROFESSIONALS CONNECTED
                  </p>
                  <p className="text-black text-xs font-mono tracking-wider">GUIDED BY BUSINESS OUTCOMES & MATCHMAKING CHANNELS</p>
                </div>
              </div>
            </motion.div>
 
            {/* Right Column: High-End Hardware-grade Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 bg-premium-yellow/10 rounded-[2.5rem] blur-2xl -z-10 shadow-[0_10px_50px_rgba(241,184,16,0.05)]" />
              
              <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-premium-yellow/20 via-slate-100/10 to-transparent p-px shadow-2xl">
                <div className="h-full w-full rounded-[inherit] bg-white overflow-hidden relative border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                   <div className="absolute inset-0 metallic-shine pointer-events-none" />
                   
                   <div className="p-6 h-full flex flex-col">
                      <div className="flex justify-between items-center mb-10 border-b border-slate-200/60 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-premium-yellow animate-pulse" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black">ACTIVE QUANT CORE v3.0</span>
                        </div>
                        <div className="px-3 py-1 bg-premium-yellow/10 rounded-full border border-premium-yellow/20 text-[9px] font-mono font-bold text-premium-yellow uppercase tracking-widest">
                          UNLOCKED MATRIX
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-black font-mono tracking-wider uppercase mb-1">REVISED NET FLOW</p>
                          <p className="text-lg font-bold font-display text-black tracking-tight">
                            <AnimatedCounter value={428.9} decimals={1} prefix="$" suffix="K" />
                          </p>
                        </div>
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-black font-mono tracking-wider uppercase mb-1">OPERATIONAL MARGIN</p>
                          <p className="text-lg font-bold font-display text-black tracking-tight">
                            <AnimatedCounter value={22.3} decimals={1} suffix="%" />
                          </p>
                        </div>
                        <div className="glass rounded-2xl p-4 border-slate-200/60 hover:border-premium-yellow/10 transition-colors">
                          <p className="text-[9px] text-black font-mono tracking-wider uppercase mb-1">INDEX COMPLIANT</p>
                          <p className="text-lg font-bold font-display text-black tracking-tight">OBL-089</p>
                        </div>
                      </div>

                      <div className="flex-1 glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-slate-200/60">
                        <motion.div 
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-premium-yellow to-transparent opacity-40 shadow-[0_0_12px_rgba(241,184,16,0.8)] z-10 pointer-events-none"
                        />
                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <span className="text-[10px] text-black tracking-widest font-mono">FINANCIAL FORECAST</span>
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
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-black text-[9px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-md">
                                 {h * 10} pts
                                </div>
                             </motion.div>
                           ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-black font-mono tracking-wider pt-2">
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

      {/* Stats Row Section */}
      <section className="py-12 border-t border-b border-slate-100 bg-slate-50/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: 500, suffix: "+", label: "Business Professionals Connected" },
              { val: 50, suffix: "+", label: "Business Assessments Completed" },
              { val: 10, suffix: "+", label: "Industries Served" },
              { val: 100, suffix: "%", label: "Customized Approach" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl font-extrabold font-display text-black">
                  <AnimatedCounter value={stat.val} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-black font-sans tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help Businesses Achieve */}
      <section className="py-28 relative border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ CORE OUTCOMES ✦
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight font-display sm:text-5xl text-black">
              What We Help Businesses Achieve
            </h2>
            <p className="mt-4 text-black max-w-lg mx-auto text-base leading-relaxed font-sans font-normal">
              Practical metrics and strategic pathways engineered to unlock absolute clarity, connections, and sustainable revenue growth.
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
                <span className="absolute top-4 right-4 text-[9px] text-premium-yellow/20 font-display opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center border border-premium-yellow/20">
                    <feature.icon className="h-5 w-5 text-premium-yellow" />
                  </div>
                  <span className="text-2xl font-extrabold font-display text-premium-yellow/20 group-hover:text-premium-yellow/40 transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-black group-hover:text-premium-yellow transition-colors">{feature.title}</h3>
                <p className="text-sm text-black leading-relaxed mt-2.5 font-sans font-normal">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 bg-slate-50/30 relative border-t border-slate-100 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ BUSINESS SOLUTIONS ✦
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight font-display sm:text-5xl text-black">
              Services & Custom Solutions
            </h2>
            <p className="mt-4 text-black max-w-lg mx-auto text-base leading-relaxed font-sans font-normal">
              Professional business intelligence, tailored dashboards, performance consulting, and networking channels for growing ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass rounded-[2rem] p-8 border-slate-200/60 hover:border-premium-yellow/30 transition-all duration-300 hover:bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center mb-6 border border-premium-yellow/20">
                    <service.icon className="h-5 w-5 text-premium-yellow" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-sm text-black leading-relaxed font-sans font-normal">{service.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <Link 
                    to={`/contact?type=${encodeURIComponent(service.title)}`}
                    className="flex items-center gap-1.5 text-[10px] tracking-wider font-bold text-premium-yellow hover:text-black transition-colors uppercase"
                  >
                    {service.title === "Business Intelligence & Analytics" && "Request Consultation"}
                    {service.title === "Customized Business Dashboards" && "Discuss Requirements"}
                    {service.title === "Business Growth Consulting" && "Schedule Consultation"}
                    {service.title === "Business Matchmaking" && "Find Business Matches"}
                    {service.title === "Global Business Connections" && "Explore Global Opportunities"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-28 bg-slate-50/55 relative border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ READY-TO-USE BUSINESS SYSTEMS ✦
              </span>
              <h2 className="text-4xl font-extrabold font-display tracking-tight sm:text-5xl text-black">
                Ready-to-Use <span className="text-premium-yellow italic font-display">Business Systems</span>
              </h2>
              <p className="mt-4 text-black text-base leading-relaxed font-sans font-normal">
                Affordable business management systems designed to help business owners organize operations and improve visibility. These systems are instantly downloadable after payment and can be implemented immediately.
              </p>
              <p className="mt-2 text-black text-sm italic font-sans font-normal">
                For businesses requiring advanced customization, we also provide tailored solutions through consultation.
              </p>
            </div>
            <Link to="/contact?type=Customized%20Solution" className="group flex items-center gap-2 text-premium-yellow font-display text-xs tracking-widest font-bold">
              REQUEST CUSTOM SOLUTIONS <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <CategoryCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Important Note for Templates */}
          <div className="mt-16 glass rounded-[2rem] border-premium-yellow/20 bg-premium-yellow/[0.02] p-8 max-w-4xl mx-auto text-center">
            <h5 className="font-display font-bold text-sm text-black uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-premium-yellow" /> Important Note
            </h5>
            <p className="text-sm sm:text-base text-black leading-relaxed font-sans font-normal">
              These systems are ready-to-use business management templates designed for immediate implementation. Businesses requiring advanced customization can request a tailored solution through consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-28 relative overflow-hidden bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ CUSTOM BUSINESS SOLUTIONS ✦
            </span>
            <h2 className="text-4xl font-extrabold font-display sm:text-5xl text-black leading-tight">
              Need Something Built Specifically For Your Business?
            </h2>
            <p className="mt-6 text-black text-base leading-relaxed font-sans font-normal">
              Every business is unique. While our ready-to-use systems help businesses get started quickly, some organizations require solutions tailored to their specific operations, workflows and reporting requirements.
            </p>
            <p className="mt-3 text-black text-base font-semibold">
              Our custom solutions are designed after understanding your business needs through a structured consultation process.
            </p>
          </div>

          {/* Process Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: idx * 0.05 }}
                className="glass rounded-[2rem] p-8 border-slate-200/60 relative group hover:border-premium-yellow/30 hover:bg-slate-50/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-6 text-[32px] font-extrabold font-display text-premium-yellow/10 group-hover:text-premium-yellow/20 transition-colors">
                  0{idx + 1}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-premium-yellow font-bold uppercase block mb-2">{step.step}</span>
                <h4 className="font-bold text-base text-black font-display mb-3 group-hover:text-premium-yellow transition-colors">{step.title}</h4>
                <p className="text-sm text-black leading-relaxed font-sans font-normal">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Important Note Alert */}
          <div className="glass rounded-[2rem] border-premium-yellow/20 bg-premium-yellow/[0.02] p-8 max-w-4xl mx-auto text-center mb-12">
            <h5 className="font-display font-bold text-sm text-black uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-premium-yellow" /> Important Note
            </h5>
            <div className="text-sm sm:text-base text-black leading-relaxed font-sans font-normal space-y-2">
              <p>Custom solutions are designed after understanding your business requirements through a structured consultation process.</p>
              <p>Pricing depends on project scope, complexity, integrations and implementation requirements.</p>
              <p className="font-medium text-black">Custom solutions are not downloadable templates.</p>
            </div>
          </div>

          <div className="text-center">
            <Magnetic strength={0.2}>
              <Link
                to="/contact?type=Customized%20Solution"
                className="inline-block rounded-full bg-premium-yellow px-10 py-4.5 text-xs tracking-widest font-display font-semibold text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] duration-300"
              >
                REQUEST CUSTOM SOLUTION
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Business Matchmaking Section */}
      <section className="py-28 relative overflow-hidden bg-slate-50/30 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-premium-yellow/20 bg-premium-yellow/[0.04] px-4 py-1.5 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-premium-yellow">
                <span>✦ BEYOND BUSINESS MANAGEMENT ✦</span>
              </div>
              
              <h2 className="text-4xl font-extrabold font-display text-black leading-tight">
                Beyond Business Management
              </h2>
              
              <p className="text-lg text-black leading-relaxed font-sans font-normal">
                Business growth is not only about tracking numbers. It is also about building the right relationships, accessing new markets and finding the right opportunities.
              </p>
              
              <div className="pt-4">
                <Magnetic strength={0.15}>
                  <a
                    href="https://aaryaworldconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-black px-10 py-4.5 text-xs tracking-widest font-display font-semibold text-white hover:bg-premium-yellow hover:text-black duration-300 transition-all shadow-md"
                  >
                    EXPLORE BUSINESS OPPORTUNITIES
                  </a>
                </Magnetic>
              </div>
            </div>
            
            {/* Right Column: Connection Checklist Card */}
            <div className="lg:col-span-6 glass rounded-[2.5rem] p-8 lg:p-10 border-slate-200/60 bg-white shadow-lg">
              <p className="font-display font-bold text-sm text-black uppercase tracking-widest mb-6">
                Explore opportunities to connect with:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Manufacturers",
                  "Exporters",
                  "Importers",
                  "Retail Chains",
                  "Procurement Teams",
                  "Channel Partners",
                  "Corporate Buyers",
                  "Hospitals",
                  "Medical Equipment Suppliers",
                  "Distributors",
                  "Franchise Partners",
                  "Investors",
                  "Global Buyers",
                  "Strategic Partners"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="h-5 w-5 rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center text-[10px] text-premium-yellow font-bold">✔</span>
                    <span className="text-sm text-black font-sans font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-28 bg-white relative border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
              ✦ CORE SECTORS ✦
            </span>
            <h2 className="text-4xl font-extrabold font-display sm:text-5xl text-black">
              Industries We Serve
            </h2>
            <p className="mt-4 text-black max-w-lg mx-auto text-base leading-relaxed font-sans font-normal">
              Tailored analytics, operational systems, and strategic connections designed for your specific industry workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] glass border-slate-200/60 hover:border-premium-yellow/30 hover:bg-slate-50/50 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center border border-premium-yellow/20">
                      <ind.icon className="h-5 w-5 text-premium-yellow" />
                    </div>
                    <span className="text-[20px] filter saturate-75 opacity-80 group-hover:opacity-100 transition-opacity">
                      {idx === 0 && "🏭"}
                      {idx === 1 && "🏥"}
                      {idx === 2 && "🏪"}
                      {idx === 3 && "🌍"}
                      {idx === 4 && "🏗"}
                      {idx === 5 && "💼"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-black group-hover:text-premium-yellow transition-colors flex items-center gap-2">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-black leading-relaxed mt-2.5 font-sans font-normal">{ind.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Choose TwinaronNexus */}
      <section className="py-32 relative overflow-hidden bg-slate-50/20 border-b border-slate-100">
        <div className="absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 bg-premium-yellow/5 blur-[120px] rounded-full" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ BENCHMARK QUALITY ✦
              </span>
              <h2 className="text-4xl font-extrabold font-display leading-[1.15] text-black">
                Why Businesses Choose <br />
                <span className="text-premium-yellow font-display italic font-normal">TwinaronNexus</span>
              </h2>
              <ul className="mt-12 space-y-6">
                {WHY_CHOOSE_US.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 h-5 w-5 flex-none rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center">
                      <span className="text-[10px] text-premium-yellow font-display font-black">✔</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-black font-display tracking-tight">{item.t}</h4>
                      <p className="mt-1 text-black text-sm leading-relaxed font-sans font-normal">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-[2.5rem] p-8 lg:p-10 border-slate-200/60 bg-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <ShieldCheck className="h-24 w-24 text-premium-yellow" />
              </div>
              <h3 className="font-display font-bold text-xl text-black uppercase tracking-widest mb-8">
                Why Clients Prefer Us
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Business-Centric Solutions", desc: "We design tools and strategies centered around your operations, not complex software." },
                  { title: "Customized Implementation", desc: "No generic templates for custom needs—every custom project is tailored to your workflow." },
                  { title: "Direct Expert Consultation", desc: "Work directly with business analysts and consultants to solve bottlenecks." },
                  { title: "Global Business Network", desc: "Access direct connections with buyers, distributors, and exporters." },
                  { title: "No Monthly Software Lock-In", desc: "Own your systems forever with zero recurring subscription fees." },
                  { title: "Scalable Systems", desc: "Robust data architectures built to support your growing business volume." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 h-5 w-5 flex-none rounded-full bg-premium-yellow/10 border border-premium-yellow/30 flex items-center justify-center text-[10px] text-premium-yellow font-bold">
                      ✔
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-black font-display tracking-tight">{item.title}</h4>
                      <p className="text-black text-sm leading-normal mt-0.5 font-sans font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
            <h2 className="text-4xl font-extrabold font-display text-black">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden border-slate-200/60 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors group"
                >
                  <span className="font-semibold text-base text-black group-hover:text-black transition-colors">{faq.q}</span>
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
                      <div className="px-6 pb-6 text-black text-sm leading-relaxed border-t border-slate-200/60 pt-4 font-sans font-normal whitespace-pre-line">
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
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold mb-8 tracking-tight text-black leading-tight">
            Transform Your Business With Data, Strategy & Opportunities
          </h2>
          <p className="text-black/80 text-base sm:text-lg max-w-2xl mx-auto mb-12 font-sans font-normal leading-relaxed">
            Whether you need a business system, custom solution, strategic consulting or business connections, TwinaronNexus helps you move forward with clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Magnetic strength={0.15}>
              <button
                onClick={() => scrollToSection("services")}
                className="bg-black text-white rounded-full px-8 py-4.5 font-display text-xs tracking-widest font-bold hover:scale-105 transition-transform shadow-lg cursor-pointer"
              >
                EXPLORE SOLUTIONS
              </button>
            </Magnetic>
            <Magnetic strength={0.15}>
              <Link 
                to="/contact?type=Customized%20Solution" 
                className="border border-black/20 hover:border-black rounded-full px-8 py-4.5 font-display text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-all text-center block"
              >
                REQUEST CONSULTATION
              </Link>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a 
                href="https://aaryaworldconnect.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black/20 hover:border-black rounded-full px-8 py-4.5 font-display text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-all text-center block"
              >
                EXPLORE OPPORTUNITIES
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
