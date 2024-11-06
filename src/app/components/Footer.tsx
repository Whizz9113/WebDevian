"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#171717] text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Logo Section - Always on top in mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <Link href="/" className="block">
              <motion.img
                src="/img/logo.png"
                alt="WebDevian Logo"
                className="h-36 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>

          {/* Contact and Links Grid - Side by side in mobile */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#87CEEB]">Kontakt</h2>
              <p className="text-gray-300">WebDevian GmbH</p>
              <p className="text-gray-300">Schaffhauserstrasse 6</p>
              <p className="text-gray-300">8180 Bülach</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <div className="space-y-2">
                <Link 
                  href="mailto:info@webdevian.ch"
                  className="text-[#87CEEB] hover:text-[#FF7F50] transition-colors duration-300 block"
                >
                  info@webdevian.ch
                </Link>
                
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/impressum"
                    className="text-gray-300 hover:text-[#87CEEB] transition-colors duration-300"
                  >
                    Impressum
                  </Link>
                  <Link 
                    href="/datenschutz"
                    className="text-gray-300 hover:text-[#87CEEB] transition-colors duration-300"
                  >
                    Datenschutz
                  </Link>
                  <Link 
                    href="/agb"
                    className="text-gray-300 hover:text-[#87CEEB] transition-colors duration-300"
                  >
                    AGB
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400">© WebDevian GmbH 2024</p>
          <div className="flex items-center gap-4">
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
