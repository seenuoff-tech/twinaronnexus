import { Link } from "react-router-dom";
import { Rocket, Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white text-black pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
              <Logo className="h-36 w-36 scale-100 group-hover:scale-105 transition-transform duration-300" iconOnly={false} />
            </Link>
            <div className="max-w-sm text-base text-black leading-relaxed font-sans font-normal space-y-2">
              <p>Connecting businesses, opportunities, and growth through strategic introductions, business intelligence, and global networking solutions.</p>
            </div>
            <div className="mt-8 flex gap-5 items-center">
              <a 
                href="https://www.instagram.com/twinaronnexus?igsh=OTZkbGdoM3l3dHJo&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-premium-yellow hover:scale-110 transition-all duration-200"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/919787333379" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-premium-yellow hover:scale-110 transition-all duration-200"
                title="WhatsApp Support"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-premium-yellow hover:scale-110 transition-all duration-200" title="Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-black hover:text-premium-yellow hover:scale-110 transition-all duration-200" title="Linkedin"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:support@twinaronnexus.com" className="text-black hover:text-premium-yellow hover:scale-110 transition-all duration-200" title="Email Support"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6 font-display">Products</h3>
            <ul className="space-y-4">
              {[
                { name: "Online Business System", slug: "online-business-system" },
                { name: "Freelancer Business System", slug: "freelancer-business-system" },
                { name: "Boutique Business System", slug: "boutique-business-system" },
                { name: "Traders & Manufacturers System", slug: "traders-manufacturers-system" }
              ].map((item) => (
                <li key={item.slug}>
                  <Link to={`/product/${item.slug}`} className="text-sm uppercase tracking-widest text-black hover:text-premium-yellow transition-colors font-display font-bold">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6 font-display">Support</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Refund Policy", path: "/refund" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm uppercase tracking-widest text-black hover:text-premium-yellow transition-colors font-display font-bold">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-base text-black font-display font-bold">
              © {currentYear} TwinaronNexus. All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-base text-black font-display font-bold">
              Designed & Developed by <a href="mailto:skeneticdigital@gmail.com" className="text-premium-yellow hover:text-black hover:underline transition-all font-black">skeneticdigital</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
