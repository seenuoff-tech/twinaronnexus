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
  Info
} from "lucide-react";
import { useState, useEffect } from "react";
import { PRODUCTS, Product } from "../constants/products";
import { formatCurrency, cn } from "../lib/utils";
import { loadRazorpay } from "../lib/razorpay";
import Magnetic from "../components/Magnetic";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!product) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center pt-24">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <Link to="/" className="text-premium-yellow hover:underline">Return Home</Link>
      </div>
    );
  }

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
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder", // Will use fallback if not set
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
            // In real app, trigger email delivery
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
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black text-base font-normal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: visuals */}
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

            <div className="glass rounded-3xl p-8 border-slate-200/60 text-black">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-premium-yellow" />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-black uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-base font-semibold text-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: info & checkout */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4 text-base text-black font-medium">
                <span className="text-premium-yellow font-bold">✔</span> Trusted by Growing Businesses
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight mb-4 sm:text-5xl lg:text-6xl text-black">
                {product.name}
              </h1>
              <p className="text-xl text-black mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4 mb-10">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-premium-yellow flex-none mt-0.5" />
                    <span className="text-black text-base font-normal">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="glass p-8 rounded-[2rem] border-premium-yellow/20 mb-8 relative overflow-hidden text-black">
                <div className="absolute top-0 right-0 p-8">
                  <div className="h-12 w-12 rounded-full border border-premium-yellow/20 flex items-center justify-center animate-pulse">
                    <Info className="h-5 w-5 text-premium-yellow" />
                  </div>
                </div>
                <p className="text-base text-black mb-2 uppercase tracking-widest font-bold">Price</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold font-display text-black">{formatCurrency(product.price)}</span>
                  <span className="text-slate-400 line-through text-lg">{formatCurrency(product.price * 2)}</span>
                  <span className="text-premium-yellow text-sm font-bold bg-premium-yellow/10 px-2 py-0.5 rounded ml-2">50% OFF</span>
                </div>
 
                 <div className="space-y-4 flex flex-col items-center">
                   <Magnetic strength={0.15}>
                     <button
                       onClick={handleBuyNow}
                       disabled={loading || success}
                       className={cn(
                          "rounded-full px-12 py-5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer w-full sm:w-auto",
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

                   <Magnetic strength={0.15}>
                     <Link
                       to="/contact?type=Customized%20Solution"
                       className="rounded-full px-12 py-5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer w-full sm:w-auto bg-black text-white hover:bg-slate-900 border border-black text-center"
                     >
                       REQUEST CUSTOM SOLUTION <ChevronRight className="h-4 w-4 text-premium-yellow" />
                     </Link>
                   </Magnetic>

                   <p className="text-center text-xs text-black italic pt-2">
                     Need a customized version for your business? Schedule a consultation with our team.
                   </p>

                   <p className="text-center text-xs text-black flex items-center justify-center gap-2 pt-2">
                     <ShieldCheck className="h-3.5 w-3.5 text-premium-yellow" /> Secure checkout transfer protocol via Razorpay
                   </p>
                 </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-4 p-5 glass rounded-[1.5rem] border-slate-200/60 shadow-sm bg-white">
                  <div className="h-12 w-12 flex-none rounded-xl bg-slate-100 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-premium-yellow" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1 uppercase tracking-wider">One-Time Purchase</p>
                    <p className="text-xs text-black">Download & Use</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 glass rounded-[1.5rem] border-slate-200/60 shadow-sm bg-white">
                  <div className="h-12 w-12 flex-none rounded-xl bg-slate-100 flex items-center justify-center">
                    <Download className="h-6 w-6 text-premium-yellow" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1 uppercase tracking-wider">Digital Delivery</p>
                    <p className="text-xs text-black">Template will be provided after successful purchase confirmation.</p>
                  </div>
                </div>
              </div>

              {/* Looking for a Customized Business Solution Box */}
              <div className="glass rounded-[2rem] border-premium-yellow/20 bg-premium-yellow/[0.02] p-8 text-black mb-8">
                <h3 className="font-display font-bold text-lg mb-2">Looking for a Customized Business Solution?</h3>
                <p className="text-sm text-black leading-relaxed mb-6 font-sans font-normal">
                  Our ready-to-use systems are designed for common business needs. If your business requires customized reports, dashboards, tracking systems or operational solutions, schedule a consultation with our team.
                </p>
                <Link
                  to="/contact?type=Customized%20Solution"
                  className="inline-block rounded-full bg-premium-yellow px-8 py-3 text-xs tracking-widest font-display font-semibold text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] duration-300 text-center"
                >
                  REQUEST CUSTOM SOLUTION
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* New sections: Who Is This For & Challenges */}
        <div className="mt-20 space-y-10 border-t border-slate-100 pt-16">
          {/* Who Is This For? */}
          <div className="glass rounded-[2.5rem] p-8 lg:p-12 border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 flex flex-col justify-start lg:justify-center">
              <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ Target Audience ✦
              </span>
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-black leading-tight">
                Who Is This For?
              </h3>
              <div className="h-1 w-12 bg-premium-yellow mt-4 rounded-full" />
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.whoIsFor.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="glass rounded-2xl p-5 border-slate-100 bg-slate-50/30 hover:border-premium-yellow/20 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <span className="h-7 w-7 rounded-lg bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-[10px] text-premium-yellow font-bold mt-0.5 flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                      ✔
                    </span>
                    <span className="text-sm text-black font-sans font-normal leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Common Business Challenges This System Solves */}
          <div className="glass rounded-[2.5rem] p-8 lg:p-12 border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 flex flex-col justify-start lg:justify-center">
              <span className="font-mono text-[9px] tracking-[0.25em] text-premium-yellow font-extrabold uppercase block mb-3">
                ✦ Problem Solver ✦
              </span>
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-black leading-tight">
                Common Business Challenges This System Solves
              </h3>
              <div className="h-1 w-12 bg-premium-yellow mt-4 rounded-full" />
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.challenges.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="glass rounded-2xl p-5 border-slate-100 bg-slate-50/30 hover:border-premium-yellow/20 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <span className="h-7 w-7 rounded-lg bg-premium-yellow/10 border border-premium-yellow/20 flex items-center justify-center text-[10px] text-premium-yellow font-bold mt-0.5 flex-none group-hover:bg-premium-yellow group-hover:text-black transition-colors duration-300">
                      ✔
                    </span>
                    <span className="text-sm text-black font-sans font-normal leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


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
                className="max-w-md w-full glass rounded-[2.5rem] p-10 text-center border-premium-yellow/20"
              >
                <div className="h-20 w-20 rounded-full bg-premium-yellow/20 flex items-center justify-center mx-auto mb-8">
                  <Download className="h-10 w-10 text-premium-yellow" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-display">Thank You!</h2>
                <p className="text-gray-400 mb-8">
                  Your payment was successful. We have sent the download link to your email. You can also download it directly below.
                </p>
                <a 
                  href={`/api/download/ORDER_SUCCESS`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-premium-yellow text-black py-4 rounded-2xl font-bold mb-4 hover:scale-105 transition-transform"
                >
                  Download .xlsx Template
                </a>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-black text-sm hover:text-white"
                >
                  Close Window
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Customized Consultation Callout Section */}
      <section className="py-20 mt-20 border-t border-slate-100 bg-slate-50/10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold font-display mb-4 text-black">Need Something More Customized?</h2>
          <p className="text-base text-black leading-relaxed mb-8 max-w-2xl mx-auto font-sans font-normal">
            Every business operates differently. If you need customized dashboards, business reporting, operational tracking or industry-specific solutions, our team can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact?type=Customized%20Solution"
              className="inline-block rounded-full bg-premium-yellow px-10 py-4.5 text-xs tracking-widest font-display font-semibold text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(241,184,16,0.3)] duration-300 transition-transform"
            >
              REQUEST CONSULTATION
            </Link>
            <a
              href="https://wa.me/919787333379"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-black text-white px-10 py-4.5 text-xs tracking-widest font-display font-semibold hover:bg-slate-900 duration-300 transition-all text-center border border-black"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
