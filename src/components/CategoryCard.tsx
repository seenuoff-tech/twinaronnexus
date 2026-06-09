import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Product } from "../constants/products";
import { formatCurrency } from "../lib/utils";

interface CategoryCardProps {
  product: Product;
  index: number;
  key?: string | number;
}

export default function CategoryCard({ product, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 14, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group relative block overflow-hidden rounded-[2.5rem] bg-slate-50/40 border border-slate-200/60 hover:border-premium-yellow/30 p-6 h-full transition-all duration-300 hover:bg-slate-50/85 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_8px_30px_rgb(0,0,0,0.015)] luxury-shine-hover"
      >
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 z-10">
          <ArrowRight className="h-5 w-5 text-premium-yellow" />
        </div>

        <div className="mb-6 aspect-video overflow-hidden rounded-[1.75rem] bg-slate-100/50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] text-premium-yellow font-extrabold font-mono">
            {product.category}
          </span>
          <h3 className="font-display text-lg font-bold leading-snug text-black group-hover:text-premium-yellow transition-colors tracking-tight">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-black line-clamp-2 leading-relaxed font-sans font-normal">
            {product.description}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-slate-200/60 pt-4">
            <span className="text-base font-extrabold font-display text-black tracking-wide">{formatCurrency(product.price)}</span>
            <span className="flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-slate-400 group-hover:text-black transition-colors">
              GET SYSTEM <ChevronRight className="h-3 w-3 text-premium-yellow" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
