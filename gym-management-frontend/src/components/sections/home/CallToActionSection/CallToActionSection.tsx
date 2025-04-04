import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToActionSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <motion.h2
          className="mb-6 text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Transform Your Life?
        </motion.h2>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join our fitness community and take the first step towards a healthier
          and stronger you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to="/membership"
            className="bg-primary-500 hover:bg-primary-600 transform rounded-full px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
