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

const ClientAGBPage = () => {
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
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] origin-left z-50"
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
              Allgemeine Geschäftsbedingungen
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
              1. Geltungsbereich
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen Geschäftsbeziehungen zwischen der WebDevian GmbH und ihren Kunden. Abweichende, entgegenstehende oder ergänzende AGB werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              2. Vertragsschluss
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Unsere Angebote sind freibleibend. Mit der Bestellung erklärt der Kunde verbindlich sein Vertragsangebot. Wir sind berechtigt, das in der Bestellung liegende Vertragsangebot innerhalb von zwei Wochen anzunehmen. Die Annahme kann entweder schriftlich oder durch Ausführung der Leistung erklärt werden.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              3. Leistungsumfang
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Der Umfang der zu erbringenden Leistungen ergibt sich aus der schriftlichen Auftragsbestätigung. Nachträgliche Änderungen des Leistungsinhalts bedürfen der schriftlichen Bestätigung. Wir sind berechtigt, die Leistungen durch Dritte erbringen zu lassen.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              4. Preise und Zahlungsbedingungen
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Alle Preise verstehen sich in Schweizer Franken (CHF) zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von 30 Tagen nach Rechnungsstellung ohne Abzug zahlbar, sofern nicht anders vereinbart.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              5. Mitwirkungspflichten des Kunden
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Der Kunde stellt uns alle für die Durchführung des Projekts benötigten Unterlagen, Informationen und Materialien zur Verfügung. Bis zur vollständigen Bezahlung behalten wir uns das Eigentum an allen überlassenen Unterlagen und Materialien vor.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              6. Gewährleistung und Haftung
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Wir gewährleisten, dass die von uns erbrachten Leistungen frei von Mängeln sind. Bei auftretenden Mängeln sind wir zur Nachbesserung berechtigt. Für Schäden haften wir nur bei Vorsatz oder grober Fahrlässigkeit.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#87CEEB] to-[#FF7F50] text-transparent bg-clip-text mb-4">
              7. Schlussbestimmungen
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Es gilt das Recht der Schweizerischen Eidgenossenschaft. Gerichtsstand ist Bülach. Sollten einzelne Bestimmungen des Vertrages mit dem Kunden einschließlich dieser AGB ganz oder teilweise unwirksam sein, so wird hierdurch die Gültigkeit der übrigen Bestimmungen nicht berührt.
            </p>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientAGBPage; 