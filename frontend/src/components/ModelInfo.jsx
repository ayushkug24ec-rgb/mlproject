import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Home,
  CheckCircle2,
  Cpu,
  BarChart3,
  Check,
} from "lucide-react";

const featureCards = [
  {
    icon: BookOpen,
    title: "Academic Performance",
    description:
      "Reading score and writing score serve as key academic indicators of cognitive and analytical readiness.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: GraduationCap,
    title: "Parent Education",
    description:
      "Parental level of education reflects home learning environment, guidance, and academic encouragement.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: CheckCircle2,
    title: "Test Preparation",
    description:
      "Completion of test preparation courses indicates exam familiarity, structured practice, and dedication.",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    icon: Home,
    title: "Learning Environment",
    description:
      "Demographic and socioeconomic attributes such as lunch type and ethnicity provide contextual background.",
    gradient: "from-fuchsia-500 to-violet-400",
  },
];

export default function ModelInfo() {
  return (
    <section id="about-model" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
            <Cpu className="h-3.5 w-3.5" />
            Supervised Regression Pipeline
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Powered by Machine Learning
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-slate-400 sm:text-base">
            The system uses student-related academic and demographic features to estimate mathematics performance.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Model Technical Specification Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <BarChart3 className="h-4 w-4" />
                Model Architecture
              </div>
              <h3 className="text-2xl font-bold text-white">
                Linear Regression Model
              </h3>
              <p className="max-w-2xl text-xs leading-relaxed text-slate-300">
                Identified and selected during cross-validation across multiple algorithms (Random Forest, Decision Tree, Gradient Boosting, XGBoost, CatBoost). Preprocessed with standard scaling and one-hot encoding for categorical variables.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl border border-white/10 bg-[#12183a]/80 p-4">
                <p className="text-slate-400">Preprocessor</p>
                <p className="mt-1 font-semibold text-white">StandardScaler + OneHotEncoder</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#12183a]/80 p-4">
                <p className="text-slate-400">Target Feature</p>
                <p className="mt-1 font-semibold text-white">math_score (0-100)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
