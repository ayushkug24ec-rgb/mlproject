import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Home,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Academic Scores",
    description:
      "Reading and writing performance indicators that strongly correlate with mathematics outcomes.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: GraduationCap,
    title: "Parent Education",
    description:
      "Parental education level reflects the learning environment and academic support at home.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: Layers,
    title: "Test Preparation",
    description:
      "Completion of test preparation courses signals readiness and familiarity with exam formats.",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    icon: Home,
    title: "Learning Environment",
    description:
      "Demographic and socioeconomic factors such as lunch type and ethnicity are modeled as contextual signals.",
    gradient: "from-fuchsia-500 to-violet-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeatureCards() {
  return (
    <section id="factors" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Factors Considered
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-400">
            The model analyzes multiple academic and background indicators to
            produce reliable performance estimates
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-blue-900/10 backdrop-blur-xl transition-shadow hover:shadow-blue-500/10"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
