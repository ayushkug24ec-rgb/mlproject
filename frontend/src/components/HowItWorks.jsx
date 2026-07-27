import { motion } from "framer-motion";
import { UserCheck, Cpu, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Student Information",
    description:
      "Provide student demographic details, parental education background, lunch type, preparation course, and current reading & writing test scores.",
    icon: UserCheck,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    number: "02",
    title: "Machine Learning Model Analyzes Data",
    description:
      "Our preprocessor scales and transforms inputs before feeding them into a trained Linear Regression model to calculate score relationships.",
    icon: Cpu,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    number: "03",
    title: "Receive Predicted Mathematics Score",
    description:
      "Get an instant estimated score out of 100 alongside structured academic performance classification and actionable insights.",
    icon: Award,
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-20 bg-[#080b1f]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-blue-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-slate-400 sm:text-base">
            Understand how our ML pipeline processes student background data to deliver accurate score predictions.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-[1.02]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg shadow-blue-500/20`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-4xl font-extrabold text-white/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
