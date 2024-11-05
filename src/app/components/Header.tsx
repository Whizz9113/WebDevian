"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const navItems = isHomePage ? [
    { href: "#hero", label: "Home" },
    { href: "#leistungen", label: "Leistungen" },
    { href: "#kontakt", label: "Kontakt" },
    { href: "#faq", label: "FAQ" },
  ] : [
    { href: "/", label: "Home" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] origin-left z-50"
        style={{ scaleX }}
      />
      
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#0D1717]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text">
                WebDevian
              </span>
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-gray-600 hover:text-[#87CEEB] dark:text-gray-300 dark:hover:text-[#87CEEB] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header; 