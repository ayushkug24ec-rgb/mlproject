import { motion } from "framer-motion";
import {
  ArrowDown,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Award,
  BarChart2,
} from "lucide-react";

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0e27] pt-28 pb-16"
    >
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.07),transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left Column: Title & CTAs */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-blue-300 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-violet-400" />
            AI-Powered Academic Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Predict Student Mathematics{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Performance with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0 mx-auto"
          >
            Analyze student academic and background information to estimate
            mathematics performance using machine learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center"
          >
            <button
              type="button"
              onClick={() => scrollTo("#predict")}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50 sm:w-auto"
            >
              Predict Score
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#how-it-works")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto"
            >
              How It Works
            </button>
          </motion.div>
        </div>

        {/* Right Column: AI / Education Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
            <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/40">
              <BrainCircuit className="h-7 w-7 text-white" />
            </div>

            <div className="mb-8 flex items-center justify-center">
              <div className="relative">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-violet-600/20 ring-1 ring-white/15">
                  <GraduationCap className="h-18 w-18 text-blue-300" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-1 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-[#12183a] shadow-xl"
                >
                  <BookOpen className="h-6 w-6 text-violet-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -left-6 bottom-1 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-[#12183a] shadow-xl"
                >
                  <Award className="h-6 w-6 text-blue-400" />
                </motion.div>
              </div>
            </div>

            {/* Feature Indicators */}
            <div className="space-y-4">
              {[
                { label: "Reading Score Input", value: 85, color: "from-blue-500 to-cyan-400" },
                { label: "Writing Score Input", value: 82, color: "from-violet-500 to-purple-400" },
                { label: "Math Performance Estimate", value: 88, color: "from-indigo-500 to-blue-400" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                >
                  <div className="mb-1.5 flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-blue-300">{item.value}/100</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.2, delay: 0.8 + index * 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="h-4 w-4 text-emerald-400" />
                High Accuracy Pipeline
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-300 border border-emerald-500/20">
                Ready for Analysis
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
