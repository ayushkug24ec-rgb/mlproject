import { motion } from "framer-motion";
import { Award, RefreshCw, Target, TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function ScoreGauge({ score, size = 240 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Clamp score between 0 and 100 for gauge representation
  const boundedScore = Math.min(Math.max(score, 0), 100);
  const progress = (animatedScore / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(boundedScore);
    }, 150);
    return () => clearTimeout(timer);
  }, [boundedScore]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      {/* Prominent Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl"
        >
          {animatedScore.toFixed(1)}
        </motion.span>
        <span className="mt-1 text-xs uppercase tracking-widest text-slate-400 font-semibold">
          out of 100
        </span>
      </div>
    </div>
  );
}

export default function ResultCard({ score, onReset }) {
  if (score === null || score === undefined) return null;

  const numScore = Number(score);

  let category = "Needs Improvement";
  let badgeColor = "border-amber-500/30 bg-amber-500/10 text-amber-300";
  let message = "Needs Improvement. Targeted academic support and study plan recommended.";

  if (numScore >= 90) {
    category = "Excellent Performance";
    badgeColor = "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    message = "Excellent! The predicted score indicates outstanding mathematics mastery and strong academic performance.";
  } else if (numScore >= 75) {
    category = "Good Performance";
    badgeColor = "border-blue-500/30 bg-blue-500/10 text-blue-300";
    message = "Good Job! The predicted score reflects solid mathematical proficiency and background readiness.";
  } else if (numScore >= 50) {
    category = "Average Performance";
    badgeColor = "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    message = "Average Performance. The student demonstrates a moderate grasp of core mathematical concepts.";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
      id="result"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Section Header */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-white/10 shadow-inner">
              <Target className="h-6 w-6 text-blue-400" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Predicted Mathematics Score
              </h3>
              <p className="text-xs text-slate-400">
                Machine Learning estimation based on background features
              </p>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
            <TrendingUp className="h-4 w-4" />
            {category}
          </div>
        </div>

        {/* Main Score Display & Message */}
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
          <ScoreGauge score={numScore} />

          <div className="flex max-w-md flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Model Insights
            </div>
            
            <h4 className="text-3xl font-extrabold text-white">
              {numScore.toFixed(1)} <span className="text-lg text-slate-400 font-normal">/ 100</span>
            </h4>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {message}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                <span className="text-slate-400">Status:</span> Analyzed
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                <span className="text-slate-400">Model:</span> Linear Regression
              </div>
            </div>

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
              >
                <RefreshCw className="h-4 w-4" />
                Predict Again
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
