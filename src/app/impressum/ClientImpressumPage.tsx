"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Footer from "../components/Footer";
import Header from "@/components/Header";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    once: true
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`mb-24 p-6 rounded-lg backdrop-blur-sm bg-white/5 shadow-lg ${className}`}
    >
      {children}
    </motion.section>
  );
};

const ClientImpressumPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-[#0D1717]">
      <Header />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] origin-left z-50"
        style={{ scaleX }}
      />
      
      <main className="flex-grow container mx-auto px-4 pt-32 pb-24">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#87CEEB] via-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text leading-normal md:leading-normal pb-2">
              Impressum
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 w-32 bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] mx-auto mt-4"
            />
          </motion.div>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              Angaben gemäss § 5 TMG
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>WebDevian GmbH</p>
              <p>Schaffhauserstrasse 6</p>
              <p>8180 Bülach</p>
            </div>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              Kontakt
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>E-Mail: info@webdevian.ch</p>
            </div>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              Vertreten durch
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>Alexander Sulschani</p>
              <p>Lorenzo Pérez Jiménez</p>
            </div>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              Handelsregister
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>HRB CH-020.4.074.519-1</p>
              <p>Amtsgericht Zürich</p>
            </div>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              Mehrwertsteuer
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>MWST-Nr.: CHE-425.676.931</p>
            </div>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientImpressumPage; 