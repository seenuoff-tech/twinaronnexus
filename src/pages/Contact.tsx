import { motion } from "motion/react";
import { Mail, MessageSquare, Phone, MapPin, Send, Plus, Minus } from "lucide-react";
import { useState, FormEvent } from "react";
import { cn } from "../lib/utils";
import Magnetic from "../components/Magnetic";

const formItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const SUPPORT_FAQS = [
  { q: "My download link expired?", a: "No worries! Just reply to your order confirmation email or contact us with your Order ID, and we will send a fresh link immediately." },
  { q: "Can I use the sheets on mobile?", a: "Yes, you can open them in the Excel or Google Sheets mobile apps. For the best experience, we recommend using a tablet or desktop for complex data entry." },
  { q: "Do you offer custom template development?", a: "Yes, we handle custom financial modeling projects. Reach out via the form below or WhatsApp us for a quote." },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="font-display text-5xl font-bold mb-8">Let's <span className="text-premium-yellow">Talk Business.</span></h1>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              Have questions about a specific template? Facing a technical issue? Our support team is ready to assist you.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <Mail className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email Support</h4>
                  <p className="text-gray-400 text-sm mb-1">General inquiries & Support</p>
                  <a href="mailto:support@twinaronnexus.com" className="text-premium-yellow font-semibold">support@twinaronnexus.com</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <svg className="h-6 w-6 text-premium-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">WhatsApp Support</h4>
                  <p className="text-gray-400 text-sm mb-1">Instant support on the go</p>
                  <a href="https://wa.me/919787333379" target="_blank" rel="noopener noreferrer" className="text-premium-yellow font-semibold">+91 97873 33379</a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-premium-yellow/10 flex items-center justify-center flex-none mt-1">
                  <MapPin className="h-6 w-6 text-premium-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Headquarters</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    TwinaronNexus Office, Cyber Hub<br />
                    Business District, New Delhi - 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xl mb-6">Quick Help</h3>
              {SUPPORT_FAQS.map((faq, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden border-white/5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="font-semibold text-sm">{faq.q}</span>
                    {openFaq === i ? <Minus className="h-4 w-4 text-premium-yellow" /> : <Plus className="h-4 w-4 text-gray-500" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-gray-400 text-xs leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-[2.5rem] p-8 lg:p-12 border-white/5 h-fit sticky top-32"
          >
            <h3 className="text-2xl font-bold mb-8 font-display">Send a Message</h3>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div variants={formItemVariants}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">First Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300" />
                </motion.div>
                <motion.div variants={formItemVariants}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Last Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300" />
                </motion.div>
              </div>
              <motion.div variants={formItemVariants}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-premium-yellow/50 transition-colors appearance-none focus:scale-[1.01] duration-300">
                  <option className="bg-black">Pre-sales Question</option>
                  <option className="bg-black">Technical Support</option>
                  <option className="bg-black">Custom Template Inquiry</option>
                  <option className="bg-black">Payment Issue</option>
                </select>
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Message</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-premium-yellow/50 transition-all focus:scale-[1.01] duration-300" />
              </motion.div>
              
              <motion.div variants={formItemVariants} className="flex justify-center pt-2">
                <Magnetic strength={0.2}>
                  <button
                    disabled={status !== "idle"}
                    type="submit"
                    className={cn(
                      "rounded-full px-12 py-4.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer",
                      status === "sent" 
                        ? "bg-green-500 text-white cursor-default" 
                        : "bg-premium-yellow text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] active:scale-95"
                    )}
                  >
                    {status === "idle" && <><Send className="h-4 w-4" /> SEND DISPATCH</>}
                    {status === "sending" && <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />}
                    {status === "sent" && "TRANSMITTED SUCCESSFULLY"}
                  </button>
                </Magnetic>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
