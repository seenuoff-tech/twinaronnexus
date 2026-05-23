import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Rocket, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import Logo from "./Logo";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Templates", path: "/#templates" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white border-gray-100 py-1 shadow-md" 
          : "bg-white border-gray-100/80 py-2 shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center group">
          <Logo className="h-20 w-20 scale-100 group-hover:scale-105 transition-transform duration-300" iconOnly={false} />
        </Link>
 
        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-xs tracking-widest uppercase font-display font-extrabold text-gray-800 transition-colors hover:text-premium-yellow py-1 group"
            >
              {link.name}
              {/* Luxury Sliding Underline */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-premium-yellow transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
          <a
            href="#templates"
            className="flex items-center gap-2 rounded-full bg-black px-6 py-2 text-xs tracking-widest uppercase font-display font-extrabold text-white transition-all hover:bg-premium-yellow hover:text-black duration-300 shadow-md"
          >
            ACQUIRE LEDGER
          </a>
        </div>
 
        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-gray-700 md:hidden hover:text-black transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
 
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full w-full border-b border-gray-200 bg-white/98 p-6 backdrop-blur-xl md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold tracking-widest uppercase font-mono text-gray-800 hover:text-premium-yellow"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#templates"
                className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-display text-xs tracking-widest uppercase font-bold text-white hover:bg-premium-yellow hover:text-black transition-all"
              >
                ACQUIRE LEDGER
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
