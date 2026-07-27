import { motion } from "framer-motion";
import { Brain, FlaskConical, LineChart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060817] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="flex items-center gap-6 text-slate-500">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
              <Brain className="h-5 w-5" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-400">
              <FlaskConical className="h-5 w-5" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-400">
              <LineChart className="h-5 w-5" />
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Student Exam Performance Predictor
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Built with Machine Learning and Flask
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Student Exam Performance Predictor. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
