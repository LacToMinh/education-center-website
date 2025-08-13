import React from "react";
import { motion } from "framer-motion";
import text_dayhocvaluyenthi from "../../assets/text_dayhocvaluyenthi.png";

export default function IeltsToeic({
  leftImage = "/ielts.png",
  rightImage = "/toeic.png",
  logoImage = "/logo_but_chi.png",
  headlineTop = "HỆ THỐNG",
  headlineBottom = "Toàn Quốc",
  bullets = [
    "Nâng tầm tiếng Anh",
    "Chinh phục IELTS & TOEIC cùng dayhocvaluyenthi.com  ",
  ],
}) {
  const ease = [0.22, 1, 0.36, 1];

  const leftVariant = {
    hidden: { opacity: 0, x: -200, scale: 0.96 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.5, ease } },
  };
  const rightVariant = {
    hidden: { opacity: 0, x: 200, scale: 0.96 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.5, ease } },
  };

  const centerBlock = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  };

  const fromTop = {
    hidden: { opacity: 0, y: -80 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  };

  const dividerVar = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };

  const listVar = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };
  const fromBottom = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
  };

  return (
    <section className="container mx-auto" id="ielts-toeic">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 my-8">
        <motion.figure
          variants={leftVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden will-change-transform"
        >
          <img
            src={leftImage}
            alt="dayhocvaluyenthi - IELTS"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </motion.figure>

        <motion.div
          variants={centerBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.9 }}
          className="flex flex-col items-center justify-center text-center bg-white px-4 py-6"
        >
          <motion.img
            src={logoImage}
            alt="Logo dayhocvaluyenthi"
            variants={fromTop}
            className="mb-3 h-28 w-28 object-contain"
          />

          <motion.p
            variants={fromTop}
            className="tracking-[0.5em] text-xs font-extrabold text-black mb-1"
          >
            {headlineTop}
          </motion.p>

          <motion.h2
            variants={fromTop}
            className="text-3xl font-bold text-[#0a1b50]"
          >
            <img src={text_dayhocvaluyenthi} alt="dayhocvaluyenthi.com" />
          </motion.h2>

          <motion.div
            variants={dividerVar}
            className="my-10 h-[2px] w-[20%] bg-black"
          />

          <motion.ul variants={listVar} className="space-y-2">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                variants={fromBottom}
                className="text-[22px] sm:text-[24px] font-medium text-black"
              >
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.figure
          variants={rightVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden will-change-transform"
        >
          <img
            src={rightImage}
            alt="dayhocvaluyenthi - TOEIC"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </motion.figure>
      </div>
    </section>
  );
}
