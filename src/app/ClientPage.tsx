"use client";

import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Alert } from "@/components/ui/alert";
import { SiTypescript, SiTailwindcss, SiFramer } from "react-icons/si";

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href) {
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const Page = () => {
  const { scrollYProgress } = useScroll();
  const [selectedGender, setSelectedGender] = useState<'HERR' | 'FRAU' | 'DIVERS'>('HERR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    callbackTime: '',
    message: '',
  });
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['hero', 'leistungen', 'kontakt', 'faq'];
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: selectedGender,
          ...formData,
        }),
      });

      const data = await response.json();
      console.log('Server Antwort:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        callbackTime: '',
        message: '',
      });

      toast({
        description: (
          <Alert className="border-l-4 border-green-500 bg-background">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <svg 
                className="h-4 w-4 text-green-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>Ihre Nachricht wurde erfolgreich gesendet!</span>
            </motion.div>
          </Alert>
        ),
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Fehler Details:', error);
      
      toast({
        description: (
          <Alert className="border-l-4 border-red-500 bg-background">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <svg 
                className="h-4 w-4 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
              <span>Fehler beim Senden: {error.message || 'Unbekannter Fehler'}</span>
            </motion.div>
          </Alert>
        ),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? []
        : [index]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-[#0D1717]">
      <Header />
      <main className="flex-grow">
        <div className="relative">
          {/* Hero Section */}
          <motion.section
            id="hero"
            initial="hidden"
            animate={activeSection === 0 ? "visible" : "hidden"}
            variants={sectionVariants}
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/20 via-transparent to-[#FF7F50]/15" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 relative z-10 max-w-4xl mx-auto pt-20 px-4 sm:px-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text">
                Innovation mit klassischer Essenz
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ihre Vision. Unsere Expertise. Gemeinsam erschaffen wir aussergewöhnliche digitale Lösungen.
              </p>
            </motion.div>
            
            {/* Hero Section Buttons */}
            <motion.div 
              className="flex gap-4 mt-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href="#kontakt"
                onClick={smoothScroll}
                className="px-6 py-3 md:px-6 md:py-3 px-4 py-2 text-sm md:text-base bg-[#87CEEB] hover:bg-[#87CEEB]/90 text-white rounded-lg transition-colors duration-200"
              >
                Projekt starten →
              </Link>
              <Link 
                href="#leistungen"
                onClick={smoothScroll}
                className="px-6 py-3 md:px-6 md:py-3 px-4 py-2 text-sm md:text-base border border-[#87CEEB] text-[#87CEEB] hover:bg-[#87CEEB]/10 rounded-lg transition-colors duration-200"
              >
                Leistungen ansehen
              </Link>
            </motion.div>
          </motion.section>

          {/* Leistungen Section */}
          <motion.section
            id="leistungen"
            initial="hidden"
            animate={activeSection === 1 ? "visible" : "hidden"}
            variants={sectionVariants}
            className="min-h-screen py-24 px-4 bg-[#171717]/95 relative flex items-center"
          >
            <div className="absolute inset-0">
              <Image
                src="/noise.png"
                alt="Background Noise"
                fill
                className="object-none opacity-20"
                priority
                sizes="100vw"
                quality={100}
              />
            </div>
            
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <div className="flex flex-col gap-8 lg:gap-12">
                <div className="relative z-10 space-y-4 w-full">
                  <span className="text-[#FF7F50] font-medium inline-block pb-2">
                    UNSERE EXPERTISE!
                  </span>
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text pb-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ 
                      paddingBottom: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <span className="inline-block">
                      Unsere Leistungen
                    </span>
                  </motion.h2>
                  <motion.p 
                    className="text-gray-300 max-w-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Massgeschneiderte Lösungen für Ihren digitalen Erfolg
                  </motion.p>
                </div>
              </div>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8"
                style={{ 
                  gridTemplateRows: "auto auto auto",
                  gridAutoRows: "auto"
                }}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "WebClassic",
                    description: "WebDevian bietet massgeschneiderte Lösungen für Ihren digitalen Auftritt. Von der Erstellung funktionaler Webseiten und Redesigns bis hin zu SEO und gezielten Ads – wir sorgen für Ihre optimale Sichtbarkeit. Unsere Experten gewährleisten reibungslose Performance und überzeugende Designs auf allen Geräten. Vertrauen Sie auf WebDevian, um Ihre Online-Präsenz nachhaltig zu stärken und auf das nächste Level zu bringen.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    className: "col-span-2 row-span-2",
                    image: "/img/webclassic-bg.jpg"
                  },
                  {
                    title: "WebCommerce",
                    description: "Massgeschneiderte E-Commerce-Lösungen, die Ihren Online-Shop optimieren und automatisieren.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    ),
                    className: "col-span-1 sm:col-span-1"
                  },
                  {
                    title: "WebIndividual",
                    description: "Individuelle Lösungen, abgestimmt auf Ihre spezifischen Anforderungen.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                      </svg>
                    ),
                    className: "col-span-1 sm:col-span-1"
                  },
                  {
                    title: "WebIntelligence",
                    description: "KI-gestützte Agenten und Chatbots für smarte, datenbasierte Entscheidungen.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        <circle cx="12" cy="12" r="3" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 0 1 6 0M15 9a3 3 0 0 1-6 0" />
                      </svg>
                    ),
                    className: "col-span-1 sm:col-span-1",
                    comingSoon: true
                  },
                  {
                    title: "WebAutomate",
                    description: "Automatisierungen für effizientere Abläufe und zeitsparende Prozesse.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    ),
                    className: "col-span-1 sm:col-span-1",
                    comingSoon: true
                  },
                  {
                    title: "WebHosting",
                    description: "Sicheres Hosting mit skalierbaren Lösungen, E-Mail, Domain und SSL für Ihre Daten.",
                    icon: (
                      <svg className="h-12 w-12 text-[#87CEEB] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    ),
                    className: "col-span-2",
                    comingSoon: true
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className={`${service.className} p-6 rounded-xl bg-[#1d1d1d] backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {service.comingSoon && (
                      <div className="absolute -right-14 top-6 rotate-45 bg-[#FF7F50] text-white text-xs font-bold py-1 w-48 text-center transform origin-center">
                        COMING SOON
                      </div>
                    )}
                    {service.title === "WebClassic" && service.image && (
                      <div className="absolute inset-0 opacity-10">
                        <Image
                          src={service.image}
                          alt="WebClassic Background"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    )}
                    <div className={`h-full flex flex-col ${service.title === "WebClassic" ? "justify-between" : ""}`}>
                      {service.title === "WebClassic" && (
                        <div className="relative mb-4 h-[140px]">
                          <div className="absolute top-4 left-4 text-[#87CEEB] z-10">
                            {service.icon}
                          </div>
                        </div>
                      )}
                      {service.title !== "WebClassic" && (
                        <div className="text-[#87CEEB] relative z-10">
                          {service.icon}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-[#87CEEB] mb-2">{service.title}</h3>
                        <p className="text-gray-300 text-sm">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Kontakt Section */}
          <motion.section
            id="kontakt"
            initial="hidden"
            animate={activeSection === 2 ? "visible" : "hidden"}
            variants={sectionVariants}
            className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-[#171717]/95"
          >
            <div className="absolute inset-0">
              <Image
                src="/noise.png"
                alt="Background Noise"
                fill
                className="object-none opacity-20"
                priority
                sizes="100vw"
                quality={100}
              />
            </div>

            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Linke Seite */}
                <motion.div className="space-y-6 sm:space-y-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text">
                    Jetzt kostenloses Beratungsgesprch vereinbaren.
                  </h2>
                  
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5 text-[#FF7F50]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Detailliertes Beratungsgespräch</span>
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5 text-[#FF7F50]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Analyse des aktuellen Standes</span>
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5 text-[#FF7F50]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Unverbindliches Angebot</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Rechte Seite - Kontaktformular */}
                <motion.div className="bg-[#1d1d1d] p-4 sm:p-6 lg:p-8 rounded-xl border border-[#87CEEB]/20">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="flex gap-2 sm:gap-4 mb-6">
                      {[
                        { value: 'HERR', label: 'HERR' },
                        { value: 'FRAU', label: 'FRAU' },
                        { value: 'DIVERS', label: 'DIVERS' },
                      ].map((gender) => (
                        <button
                          key={gender.value}
                          type="button"
                          onClick={() => setSelectedGender(gender.value as 'HERR' | 'FRAU' | 'DIVERS')}
                          className={`flex-1 px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-[#87CEEB] transition-colors duration-200 ${
                            selectedGender === gender.value
                              ? 'bg-[#87CEEB] text-white'
                              : 'text-[#87CEEB] hover:bg-[#87CEEB]/10'
                          }`}
                        >
                          {gender.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Vorname"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Nachname"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200"
                        required
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="E-Mail-Adresse"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Unternehmen"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Telefonnummer"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200"
                      />
                      
                      <select
                        value={formData.callbackTime}
                        onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                        className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200 appearance-none"
                      >
                        <option value="" disabled>Bevorzugte Rückrufzeit</option>
                        <option value="morning">Vormittags (9-12 Uhr)</option>
                        <option value="afternoon">Nachmittags (12-17 Uhr)</option>
                        <option value="evening">Abends (17-20 Uhr)</option>
                      </select>
                    </div>

                    <textarea
                      placeholder="Womit können wir dir helfen?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#87CEEB]/20 focus:border-[#87CEEB] outline-none transition-colors duration-200 resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            id="tools"
            className="relative min-h-screen flex items-center justify-center py-24 bg-[#171717]/95"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="absolute inset-0">
              <Image
                src="/noise.png"
                alt="Background Noise"
                fill
                className="object-none opacity-20"
                priority
                sizes="100vw"
                quality={100}
              />
            </div>

            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#FF7F50] font-medium">UNSERE TOOLS</span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mt-2">
                  Mit was wir arbeiten
                </h2>
                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                  Modernste Technologien für maximale Performance und Skalierbarkeit
                </p>
              </motion.div>

              {/* Grid für Tools mit angepassten Abständen */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
                {/* Next.js & React - große Karte */}
                <motion.div className="col-span-1 lg:col-span-2 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <svg className="w-12 h-12 text-[#87CEEB]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3 className="text-2xl font-bold text-[#87CEEB]">Next.js & React</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Mit Next.js 14 und React entwickeln wir hochperformante und SEO-optimierte Webanwendungen. 
                        Durch Server Components, Streaming und das App Router Framework erreichen wir maximale Performance 
                        und beste User Experience.
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Server-Side Rendering (SSR)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Static Site Generation (SSG)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Incremental Static Regeneration</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <span className="px-3 py-1 rounded-full bg-[#87CEEB]/10 text-[#87CEEB] text-sm">Server Components</span>
                      <span className="px-3 py-1 rounded-full bg-[#87CEEB]/10 text-[#87CEEB] text-sm">React 18+</span>
                      <span className="px-3 py-1 rounded-full bg-[#87CEEB]/10 text-[#87CEEB] text-sm">App Router</span>
                      <span className="px-3 py-1 rounded-full bg-[#87CEEB]/10 text-[#87CEEB] text-sm">Edge Runtime</span>
                    </div>
                  </div>
                </motion.div>

                {/* Frontend Technologien */}
                <motion.div className="col-span-1 lg:col-span-2 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                  <h3 className="text-xl font-bold text-[#87CEEB] mb-4">Frontend Technologien</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <SiTypescript className="w-6 h-6 text-[#87CEEB]" />
                        <span className="text-gray-300">TypeScript</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <SiTailwindcss className="w-6 h-6 text-[#87CEEB]" />
                        <span className="text-gray-300">Tailwind CSS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <SiFramer className="w-6 h-6 text-[#87CEEB]" />
                        <span className="text-gray-300">Framer Motion</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" viewBox="0 0 24 24" fill="none">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-gray-300">Shadcn/ui</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <span className="text-gray-300">Next Images</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <span className="text-gray-300">TanStack Query</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Container f��r Backend & Cloud - nur mobil nebeneinander */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-4 col-span-1">
                  {/* Backend & APIs */}
                  <motion.div className="col-span-1 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold text-[#87CEEB] mb-4">Backend & APIs</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        <span className="text-gray-300">PostgreSQL</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-300">REST APIs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        <span className="text-gray-300">Microservices</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cloud & Deployment */}
                  <motion.div className="col-span-1 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold text-[#87CEEB] mb-4">Cloud & Deployment</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-gray-300">Vercel</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        <span className="text-gray-300">AWS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <span className="text-gray-300">Docker</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Logo Card */}
                <motion.div className="col-span-1 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                  <div className="absolute inset-0">
                    <Image
                      src="/tools.jpg"
                      alt="Development Tools"
                      fill
                      className="object-cover opacity-20"
                      priority
                    />
                  </div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <Image
                      src="/logo.png"
                      alt="WebDevian Logo"
                      width={200}
                      height={200}
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Tools Showcase */}
                <motion.div className="col-span-1 lg:col-span-1 p-6 rounded-xl bg-[#171717]/95 backdrop-blur-md border border-[#87CEEB]/20 hover:border-[#87CEEB]/60 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                  <div className="absolute inset-0">
                    <Image
                      src="/tools.jpg"
                      alt="Development Tools"
                      fill
                      className="object-cover opacity-20"
                      priority
                    />
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
                    <h3 className="text-2xl font-bold text-[#87CEEB] text-center">
                      Haben wir Ihr Interesse geweckt?
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#kontakt')?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }}
                      className="px-6 py-3 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white rounded-lg transition-colors duration-200"
                    >
                      Kontaktieren Sie uns →
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            id="faq"
            initial="hidden"
            animate={activeSection === 3 ? "visible" : "hidden"}
            variants={sectionVariants}
            className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 bg-[#171717]"
          >
            <div className="absolute inset-0">
              <Image
                src="/noise.png"
                alt="Background Noise"
                fill
                className="object-cover opacity-20"
                priority
                sizes="100vw"
                quality={100}
              />
            </div>
            
            <motion.div className="w-full max-w-5xl mx-auto space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 mb-16 py-8 sm:py-12">
              <span className="text-[#FF7F50] font-medium">WIR HABEN DIE ANTWORTEN!</span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text pb-2 tracking-normal">
                Häufig gestellte Fragen
              </h2>
              <p className="text-gray-300 max-w-2xl">
                Oftmals bekommen wir Fragen von Kunden gestellt, bezüglich der Erstellung einer Website oder anderen Themen rund um den Onlineauftritt. Wir haben diese Fragen hier gesammelt und beantwortet.
              </p>
            </motion.div>

            <motion.div className="w-full max-w-5xl mx-auto space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
              {[
                {
                  question: "Ich habe keine Domain und kein Hosting für meine Website?",
                  answer: "Kein Problem! Wir kümmern uns um die Domain-Registrierung und das Hosting für Sie. Dabei beraten wir Sie bei der Wahl der passenden Domain und richten alles professionell ein."
                },
                {
                  question: "Was muss ich vorbereiten?",
                  answer: "Grundsätzlich benötigen wir von Ihnen Ihre Vorstellungen, Texte und Bilder. Je besser Sie vorbereitet sind, desto schneller können wir Ihr Projekt umsetzen. Wenn Sie keine Texte haben, können wir diese auch für Sie erstellen."
                },
                {
                  question: "Mit welchem CMS arbeitet ihr?",
                  answer: "Wir haben kein Standardmässiges CMS, Wir erstellen alle unsere Arbeiten von Grund auf mit Next, React und TypeScript. Falls ein Backend Bereich benötig wird, verwenden wir das Payload CMS. Im Bereich eCommerce verwenden wir Shopify, was perfekt mit Next JS und TypeScript harmonisiert. Bei der Erstellung unserer Websites legen wir großen Wert auf Individualität!"
                },
                {
                  question: "Was kostet eine Website bei Uns?",
                  answer: "Die Kosten variieren je nach Umfang und Anforderungen. Wir erstellen Ihnen gerne ein individuelles Angebot nach einem persönlichen Gespräch."
                },
                {
                  question: "Vermarktet ihr die Website auch?",
                  answer: "Durch unsere langjährige Erfahrung im Bereich Online Marketing und IT-Consulting helfen wir dir gerne bei deinen zukünftigen Aktivitäten. Sei es eine Social Media Strategie, bezahlte Werbung auf Google, Linkedin oder Instagram. Auf Wunsch erstellen wir dir dein individuelles Konzept."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1d1d1d] p-4 sm:p-6 rounded-xl border border-[#87CEEB]/20"
                  whileHover={{ y: -5 }}
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer gap-4"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-[#87CEEB]">
                      {faq.question}
                    </h3>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-[#87CEEB]"
                      animate={{ rotate: openFaqs.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 001.414 0l4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </div>
                  <AnimatePresence>
                    {openFaqs.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 mt-3 text-sm">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
