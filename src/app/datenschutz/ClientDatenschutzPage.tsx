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

const ClientDatenschutzPage = () => {
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
              Datenschutzerklärung
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
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="text-xl font-semibold mb-2">Allgemeine Hinweise</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              2. Datenerfassung auf unserer Website
            </h2>
            <h3 className="text-xl font-semibold mb-2">Cookies</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              3. Analyse-Tools und Tools von Drittanbietern
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              4. Kontaktformular
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              5. Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              6. Ihre Rechte
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              7. Kontakt
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
            </p>
            <div className="text-gray-600 dark:text-gray-300">
              <p>WebDevian GmbH</p>
              <p>Schaffhauserstrasse 6</p>
              <p>8180 Bülach</p>
              <p>E-Mail: info@webdevian.ch</p>
            </div>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientDatenschutzPage; 