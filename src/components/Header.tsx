"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import MobileNavBar from "./MobileNavBar";

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href) {
    if (href.startsWith('/#')) {
      window.location.href = href;
      
      window.addEventListener('load', () => {
        const targetId = href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = targetId === 'tools' ? 0 : 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = href === '#tools' ? 0 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isLegalPage = ['/impressum', '/agb', '/datenschutz'].includes(pathname);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Theme Toggle Button - neue Position unten links */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 bottom-24 z-[60]" // Geändert von right-4 top-4 zu left-4 bottom-24
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 shadow-lg w-12 h-12" // Größere Button-Dimensionen
        >
          <Moon className="h-[1.5rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#87CEEB]" />
          <Sun className="absolute h-[1.5rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#87CEEB]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#171717]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          backgroundImage: `url(../../public/img/noise.png)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
          backgroundBlendMode: 'soft-light'
        } : undefined}
      >
        <div className={`container mx-auto px-4 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 md:py-2'
            : 'py-8 md:py-4'
        }`}>
          <nav className="flex items-center justify-between relative pt-2 md:pt-0">
            {/* Desktop Navigation - Left Side */}
            <div className="hidden lg:flex items-center space-x-8 flex-1">
              <Link 
                href="#leistungen" 
                onClick={smoothScroll}
                className={`transition-colors ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-[#87CEEB]' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-[#87CEEB]'
                }`}
              >
                Leistungen
              </Link>
              <Link 
                href="#kontakt" 
                onClick={smoothScroll}
                className={`transition-colors ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-[#87CEEB]' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-[#87CEEB]'
                }`}
              >
                Beratung
              </Link>
              <Link 
                href="#tools" 
                onClick={smoothScroll}
                className={`transition-colors ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-[#87CEEB]' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-[#87CEEB]'
                }`}
              >
                Tools
              </Link>
              <Link 
                href="#faq" 
                onClick={smoothScroll}
                className={`transition-colors ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-[#87CEEB]' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-[#87CEEB]'
                }`}
              >
                FAQ
              </Link>
            </div>
            
            {/* Logo - Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
              <Link href="/" className="relative flex justify-center items-center">
                <AnimatePresence mode="wait">
                  {!isScrolled ? (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-28 h-28 md:w-20 md:h-20 flex justify-center items-center"
                    >
                      <Image
                        src="/logo.png"
                        alt="WebDevian Logo"
                        width={112}
                        height={112}
                        className="object-contain scale-125"
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center py-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xl md:text-lg font-bold text-white hover:text-[#87CEEB] transition-all duration-300 hover:tracking-wider">
                        WEBDEVIAN
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>
      <MobileNavBar />
    </>
  );
} 
