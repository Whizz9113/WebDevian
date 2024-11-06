"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Briefcase, 
  HeadphonesIcon, 
  Wrench,
  HelpCircle
} from "lucide-react";

const MobileNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Briefcase, label: "Leistungen", href: "#leistungen" },
    { icon: HeadphonesIcon, label: "Beratung", href: "#kontakt" },
    { icon: Wrench, label: "Tools", href: "#tools" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

  // Funktion zur Überprüfung des aktiven Abschnitts
  const isActiveSection = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href.startsWith("#")) {
      const section = document.querySelector(href);
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 2;
        return isVisible;
      }
    }
    return false;
  };

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[#171717]/95 backdrop-blur-md border-t border-gray-800 z-50"
      style={{
        backgroundImage: `url(/img/noise.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveSection(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Icon 
                  className={`w-5 h-5 mb-1 transition-all duration-300 ${
                    isActive 
                      ? "text-[#87CEEB]" 
                      : "text-gray-400 group-hover:text-[#87CEEB]/70"
                  }`} 
                />
                <span 
                  className={`text-xs transition-all duration-300 ${
                    isActive 
                      ? "text-[#87CEEB] font-medium" 
                      : "text-gray-400 group-hover:text-[#87CEEB]/70"
                  }`}
                >
                  {item.label}
                </span>
                
                {/* Aktiver Indikator mit Animation */}
                <motion.div
                  className={`absolute -bottom-4 w-12 h-1 rounded-full transition-all duration-300 ${
                    isActive ? "bg-[#87CEEB]" : "bg-transparent group-hover:bg-[#87CEEB]/30"
                  }`}
                  layoutId="activeTab"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />

                {/* Hover Highlight Effekt */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-[#87CEEB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileNavBar;