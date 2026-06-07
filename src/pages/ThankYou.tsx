import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";

export default function ThankYou() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12 text-slate-900 px-6">
      <div className="mx-auto max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="glass rounded-[3rem] p-12 border-slate-200/60 bg-white shadow-2xl relative overflow-hidden"
        >
          {/* Backlight glow */}
          <div className="absolute -inset-4 bg-premium-yellow/5 rounded-[3rem] blur-2xl -z-10" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="h-20 w-20 rounded-full bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="h-10 w-10 text-premium-yellow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-display text-3xl font-extrabold mb-4 text-slate-950 tracking-tight"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-600 text-sm leading-relaxed mb-10 font-sans font-light"
          >
            Thank you for reaching out.<br />
            Our team will review your requirements and contact you shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center"
          >
            <Magnetic strength={0.15}>
              <Link
                to="/"
                className="rounded-full bg-premium-yellow px-10 py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] duration-300"
              >
                RETURN HOME <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
