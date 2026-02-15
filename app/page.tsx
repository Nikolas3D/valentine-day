"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Heart,
  MapPin,
  MessageCircleHeart,
  Music,
  Star,
} from "lucide-react";

/**
 * =========================
 *  QUICK SETUP GUIDE
 * =========================
 * 1) Generate your images using the TODO prompts below (copy/paste into your image generator).
 * 2) Put the exported PNGs in: /public/apology/
 * 3) Update the IMAGE_* constants paths if you name them differently.
 *
 * NOTE: No real photos required — this is built for your cute cartoon style.
 */

// ====== Image placeholders (put your generated files in /public/apology/...) ======
const IMAGE_BADGER_SAD = "/badger_sad.png";
const IMAGE_GOOSE_SAD_FLOWERS = "/goose_sad_flowers.png";
const IMAGE_BADGER_SOFT_SAD = "/badger_soft_sad.png";
// TODO: Replace with your actual photo of "Us"
const IMAGE_US_TOGETHER = "/us_together.png";

type Step = "intro" | "apology" | "reunion" | "voucher";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function FancyCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "bg-white shadow-xl border-2 border-rose-100 rounded-[3rem] p-6 sm:p-8 md:p-12",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CharacterImage({
  src,
  label,
  sizeClass = "w-56 h-56 md:w-120 md:h-120",
}: {
  src: string;
  label: string;
  sizeClass?: string;
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className={`${sizeClass} object-contain select-none`}
        draggable={false}
      />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<Step>("intro");
  const [isForgiven, setIsForgiven] = useState(false);

  // playful "No" button movement
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const moveNoButton = () => {
    const x = (Math.random() * 2 - 1) * 140;
    const y = (Math.random() * 2 - 1) * 90;
    setNoButtonPos({ x, y });
  };

  // tiny personalization placeholders
  const IMPORTANT_DATE = "14 Februarie";
  const REPAIR_DATE = "24 Februarie";
  const COUPON_CODE = "TE-IUBESC-DENISA";

  return (
    <div className="min-h-screen bg-[#fffafa] text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* =========================
            STEP 1: INTRO (SHE FIRST)
           ========================= */}
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            className="max-w-3xl w-full"
          >
            <FancyCard className="text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 opacity-10 rotate-12">
                <Heart size={180} className="text-rose-500" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <CharacterImage src={IMAGE_BADGER_SAD} label="Bursuc 🦡" />

                <h1 className="mt-6 text-3xl md:text-4xl font-serif font-black text-rose-600">
                  Bursucica mea…
                </h1>

                <p className="mt-4 text-lg md:text-xl text-slate-500 leading-relaxed italic max-w-2xl">
                  Știu că te-a durut. Pe{" "}
                  <span className="text-rose-400 font-bold">{IMPORTANT_DATE}</span>{" "}
                  meritai să te simți iubită și aleasă.
                  <br />
                  Și faptul că nu am fost acolo te-a ranit...
                </p>

                <div className="mt-8 w-full max-w-md">
                  <button
                    onClick={() => setStep("apology")}
                    className="group w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 text-base sm:text-lg text-center leading-snug"
                  >
                    <span className="block sm:hidden">Vrei să auzi ce-ți spune Gus?</span>
                    <span className="hidden sm:block">Vrei să auzi ce are Gus să-ți spună?</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </FancyCard>
          </motion.div>
        )}

        {/* =========================
            STEP 2: APOLOGY + FORGIVENESS INTERACTION
           ========================= */}
        {step === "apology" && (
          <motion.div
            key="apology"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center">
              <div className="flex flex-row justify-center items-center gap-8 sm:gap-12 md:gap-16 mb-12 md:mb-10">
                <motion.div
                  animate={{ x: isForgiven ? 40 : 0, rotate: isForgiven ? 0 : -2 }}
                  transition={{ type: "spring", stiffness: 140, damping: 14 }}
                >
                  <CharacterImage
                    src={IMAGE_GOOSE_SAD_FLOWERS}
                    label="Gus 🦢"
                    sizeClass="w-50 h-50 sm:w-64 sm:h-64 md:w-80 md:h-80"
                  />
                </motion.div>

                <motion.div
                  animate={{ scale: isForgiven ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12 }}
                >
                  <CharacterImage
                    src={IMAGE_BADGER_SOFT_SAD}
                    label="Bursuc 🦡"
                    sizeClass="w-50 h-50 sm:w-64 sm:h-64 md:w-80 md:h-80"
                  />
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-slate-800">
                Îmi pare rău, te rog…
              </h2>

              <p className="text-lg md:text-2xl text-slate-500 italic max-w-3xl mx-auto leading-relaxed">
                Pe <span className="font-black text-rose-500">{IMPORTANT_DATE}</span>{" "}
                am fost răcit și m-am simțit foarte rău.
                <br />
                Dar asta <span className="font-bold">nu schimbă</span> cum te-ai simțit tu.
                <br />
                Nu vreau doar să explic — vreau să{" "}
                <span className="text-rose-500 font-black">repar</span>.
              </p>

              <div className="mt-10 flex flex-col md:flex-row gap-7 md:gap-6 justify-center items-center md:h-32">
                <button
                  onClick={() => {
                    setIsForgiven(true);
                    setStep("reunion");
                  }}
                  className="bg-rose-500 text-white px-10 py-5 rounded-3xl font-black text-lg md:text-xl shadow-xl hover:scale-[1.03] transition-all z-10 flex items-center gap-3"
                >
                  Haide sa reparam <MessageCircleHeart />
                </button>

                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  className="bg-slate-100 text-slate-400 px-10 py-5 rounded-3xl font-bold text-lg md:text-xl cursor-default select-none"
                >
                  Nu vreau sa vorbesc cu tine.
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================
            STEP 3: REUNION (US TOGETHER + PLAN)
            Combined step for simplicity
           ========================= */}
        {step === "reunion" && (
          <motion.div
            key="reunion"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl w-full"
          >
            <div className="bg-white p-8 md:p-14 rounded-[4rem] shadow-xl border-b-[12px] border-rose-300 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
                <Calendar size={170} className="text-rose-500" />
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-7 py-2 rounded-full font-black uppercase tracking-widest shadow-lg mb-8">
                  Noi doi 🤍
                </div>

                {/* PHOTO OF US */}
                <div className="flex justify-center mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGE_US_TOGETHER}
                    alt="Us Together"
                    className="max-w-full md:max-w-64 h-auto object-contain rounded-2xl"
                  />
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
                  Noi Doi, din nou
                </h2>

                <p className="mt-4 text-lg md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  <span className="font-black text-rose-500">{REPAIR_DATE}</span>{" "}
                  vreau să fie ziua noastră.
                  <br />
                  O zi în care doar noi contăm.
                </p>

                <div className="mt-10">
                  <button
                    onClick={() => setStep("voucher")}
                    className="group bg-slate-900 hover:bg-slate-950 text-white font-black text-lg sm:text-xl px-8 sm:px-12 py-5 rounded-3xl shadow-2xl inline-flex items-center gap-3 transition-all text-center leading-snug"
                  >
                    <span className="block sm:hidden">Da, vreau 🤍</span>
                    <span className="hidden sm:block">Da, vreau să fim noi 🤍</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================
            STEP 4: VOUCHER / FINAL
           ========================= */}
        {step === "voucher" && (
          <motion.div
            key="voucher"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-xl w-full"
          >
            <div className="bg-slate-900 text-white p-8 sm:p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden border-2 border-rose-400">
              <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                <Heart size={120} fill="currentColor" className="text-rose-500" />
              </div>

              <div className="relative z-10">
                <header className="mb-12">
                  <h3 className="text-rose-400 font-black uppercase tracking-tighter text-xl mb-2">
                    Voucher pentru Fericire
                  </h3>
                  <p className="text-3xl md:text-4xl font-serif font-bold italic">
                    Ediția noastră 🦡🦢
                  </p>
                </header>

                <div className="space-y-7 mb-12 text-lg">
                  <div className="flex justify-between border-b border-slate-800 pb-4">
                    <span className="text-slate-500">Beneficiar:</span>
                    <span className="font-black text-rose-300">
                      Bursucica Mea 🦡
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-4">
                    <span className="text-slate-500">De la:</span>
                    <span className="font-black">Gus 🦢</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-4">
                    <span className="text-slate-500">Include:</span>
                    <span className="font-black">Tot ce te face fericită</span>
                  </div>
                </div>

                <div className="bg-white/5 p-7 rounded-3xl border border-white/10 text-center italic text-slate-200">
                  „Promit să fiu aici, prezent și atent. Te iubesc.”
                </div>

                <div className="mt-10 flex flex-col items-center">
                  <div className="bg-rose-500 text-white px-10 py-4 rounded-2xl font-mono text-lg md:text-xl font-black shadow-lg mb-3 tracking-widest">
                    {COUPON_CODE}
                  </div>
                  <p className="text-slate-500 text-sm font-bold uppercase">
                    Valabil pe viață ❤️
                  </p>
                </div>

                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => {
                      setIsForgiven(false);
                      setStep("intro");
                    }}
                    className="text-rose-300 hover:text-rose-200 font-black underline underline-offset-4"
                  >
                    Vezi din nou
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center mt-10 text-slate-400 text-base md:text-lg">
              Cu dragoste, Gus.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND FLOATING EMOJIS (subtle) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {Array.from({ length: 14 }).map((_, i) => {
          const left = Math.random() * 100;
          const duration = clamp(Math.random() * 10 + 10, 12, 22);
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: [null, 1200], opacity: [0, 0.25, 0] }}
              transition={{ duration, repeat: Infinity, delay }}
              className="absolute"
              style={{ left: `${left}%`, top: "-5%" }}
            >
              <span className="text-4xl opacity-10 select-none">
                {i % 3 === 0 ? "🦢" : i % 3 === 1 ? "🦡" : "💗"}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
