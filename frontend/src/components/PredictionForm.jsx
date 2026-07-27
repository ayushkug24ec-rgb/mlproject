import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Send,
  User,
  Users,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FORM_FIELDS, FORM_OPTIONS, getPredictEndpoint } from "../config";
import ResultCard from "./ResultCard";

function FormSelect({ id, name, label, value, onChange, options, error, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
        {Icon && <Icon className="h-4 w-4 text-blue-400" />}
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border bg-[#12183a]/80 px-4 py-3.5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
            error ? "border-red-400/80 ring-2 ring-red-400/20" : "border-white/15 hover:border-white/25"
          } ${!value ? "text-slate-400" : ""}`}
        >
          <option value="" disabled className="bg-[#12183a] text-slate-400">
            Select an option...
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#12183a] text-white py-1"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
          ▼
        </div>
      </div>
      {error && <p className="text-xs font-medium text-red-400">{error}</p>}
    </div>
  );
}

function FormInput({ id, name, label, value, onChange, error, placeholder, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
        {Icon && <Icon className="h-4 w-4 text-blue-400" />}
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "0 - 100"}
          className={`w-full rounded-xl border bg-[#12183a]/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
            error ? "border-red-400/80 ring-2 ring-red-400/20" : "border-white/15 hover:border-white/25"
          }`}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-400">{error}</p>}
    </div>
  );
}

const initialFormState = {
  gender: "",
  ethnicity: "",
  parental_level_of_education: "",
  lunch: "",
  test_preparation_course: "",
  reading_score: "",
  writing_score: "",
};

function validateScore(value, fieldName) {
  if (value === "" || value === null || value === undefined) {
    return `${fieldName} is required`;
  }
  const num = Number(value);
  if (Number.isNaN(num) || !Number.isInteger(num)) {
    return `${fieldName} must be a whole number`;
  }
  if (num < 0 || num > 100) {
    return `${fieldName} must be between 0 and 100`;
  }
  return "";
}

export default function PredictionForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const isFormValid = useMemo(() => {
    return (
      Boolean(formData.gender) &&
      Boolean(formData.ethnicity) &&
      Boolean(formData.parental_level_of_education) &&
      Boolean(formData.lunch) &&
      Boolean(formData.test_preparation_course) &&
      formData.reading_score !== "" &&
      formData.writing_score !== "" &&
      !validateScore(formData.reading_score, "Reading score") &&
      !validateScore(formData.writing_score, "Writing score")
    );
  }, [formData]);

  const updateField = (field) => (event) => {
    const val = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: val }));
    setSubmitError("");

    if (touched[field]) {
      if (field === "reading_score") {
        setErrors((prev) => ({ ...prev, reading_score: validateScore(val, "Reading score") }));
      } else if (field === "writing_score") {
        setErrors((prev) => ({ ...prev, writing_score: validateScore(val, "Writing score") }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: val ? "" : "This field is required" }));
      }
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "reading_score") {
      setErrors((prev) => ({ ...prev, reading_score: validateScore(formData.reading_score, "Reading score") }));
    } else if (field === "writing_score") {
      setErrors((prev) => ({ ...prev, writing_score: validateScore(formData.writing_score, "Writing score") }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: formData[field] ? "" : "This field is required" }));
    }
  };

  const validateAll = () => {
    const nextErrors = {
      gender: formData.gender ? "" : "Gender is required",
      ethnicity: formData.ethnicity ? "" : "Race / Ethnicity is required",
      parental_level_of_education: formData.parental_level_of_education ? "" : "Parent education is required",
      lunch: formData.lunch ? "" : "Lunch type is required",
      test_preparation_course: formData.test_preparation_course ? "" : "Test preparation course is required",
      reading_score: validateScore(formData.reading_score, "Reading score"),
      writing_score: validateScore(formData.writing_score, "Writing score"),
    };
    setErrors(nextErrors);
    setTouched({
      gender: true,
      ethnicity: true,
      parental_level_of_education: true,
      lunch: true,
      test_preparation_course: true,
      reading_score: true,
      writing_score: true,
    });
    return Object.values(nextErrors).every((err) => !err);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    setSubmitError("");
    setResult(null);

    const payload = new URLSearchParams({
      [FORM_FIELDS.gender]: formData.gender,
      [FORM_FIELDS.ethnicity]: formData.ethnicity,
      [FORM_FIELDS.parentalEducation]: formData.parental_level_of_education,
      [FORM_FIELDS.lunch]: formData.lunch,
      [FORM_FIELDS.testPreparation]: formData.test_preparation_course,
      [FORM_FIELDS.readingScore]: formData.reading_score,
      [FORM_FIELDS.writingScore]: formData.writing_score,
    });

    try {
      const response = await fetch(getPredictEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: payload.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Prediction failed with server status ${response.status}`,
        );
      }

      const data = await response.json();
      const predictedScore = Number(data.prediction ?? data.results);

      if (Number.isNaN(predictedScore)) {
        throw new Error("Invalid score response received from Flask server.");
      }

      setResult(predictedScore);
      setTimeout(() => {
        document.querySelector("#result")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } catch (err) {
      setSubmitError(
        err.message || "Failed to communicate with Flask backend. Check app.py.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setResult(null);
    setSubmitError("");
    document.querySelector("#predict")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="predict" className="relative scroll-mt-24 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Prediction Pipeline
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Enter Student Details
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-slate-400 sm:text-base">
            Provide the student's information to generate an estimated mathematics score.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:p-10"
        >
          <div className="space-y-8">
            {/* SECTION A: Student Information */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">
                  A
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    SECTION A: Student Information
                  </h3>
                  <p className="text-xs text-slate-400">Gender and demographic background</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormSelect
                  id="gender"
                  name="gender"
                  label="Gender"
                  value={formData.gender}
                  onChange={updateField("gender")}
                  options={FORM_OPTIONS.gender}
                  error={touched.gender ? errors.gender : ""}
                  icon={User}
                />
                <FormSelect
                  id="ethnicity"
                  name="ethnicity"
                  label="Race / Ethnicity"
                  value={formData.ethnicity}
                  onChange={updateField("ethnicity")}
                  options={FORM_OPTIONS.ethnicity}
                  error={touched.ethnicity ? errors.ethnicity : ""}
                  icon={Users}
                />
              </div>
            </div>

            {/* SECTION B: Family & Education */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 font-bold text-xs">
                  B
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    SECTION B: Family & Education
                  </h3>
                  <p className="text-xs text-slate-400">Parental level of education indicator</p>
                </div>
              </div>
              <div>
                <FormSelect
                  id="parental_level_of_education"
                  name="parental_level_of_education"
                  label="Parental Level of Education"
                  value={formData.parental_level_of_education}
                  onChange={updateField("parental_level_of_education")}
                  options={FORM_OPTIONS.parentalEducation}
                  error={touched.parental_level_of_education ? errors.parental_level_of_education : ""}
                  icon={GraduationCap}
                />
              </div>
            </div>

            {/* SECTION C: Learning Environment */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs">
                  C
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    SECTION C: Learning Environment
                  </h3>
                  <p className="text-xs text-slate-400">Lunch type and test preparation status</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormSelect
                  id="lunch"
                  name="lunch"
                  label="Lunch Type"
                  value={formData.lunch}
                  onChange={updateField("lunch")}
                  options={FORM_OPTIONS.lunch}
                  error={touched.lunch ? errors.lunch : ""}
                  icon={BookOpen}
                />
                <FormSelect
                  id="test_preparation_course"
                  name="test_preparation_course"
                  label="Test Preparation Course"
                  value={formData.test_preparation_course}
                  onChange={updateField("test_preparation_course")}
                  options={FORM_OPTIONS.testPreparation}
                  error={touched.test_preparation_course ? errors.test_preparation_course : ""}
                  icon={CheckCircle2}
                />
              </div>
            </div>

            {/* SECTION D: Academic Scores */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs">
                  D
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    SECTION D: Academic Scores
                  </h3>
                  <p className="text-xs text-slate-400">Scores out of 100 (0 to 100)</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormInput
                  id="reading_score"
                  name="reading_score"
                  label="Reading Score (0 - 100)"
                  value={formData.reading_score}
                  onChange={updateField("reading_score")}
                  error={touched.reading_score ? errors.reading_score : ""}
                  placeholder="e.g. 78"
                  icon={BookOpen}
                />
                <FormInput
                  id="writing_score"
                  name="writing_score"
                  label="Writing Score (0 - 100)"
                  value={formData.writing_score}
                  onChange={updateField("writing_score")}
                  error={touched.writing_score ? errors.writing_score : ""}
                  placeholder="e.g. 75"
                  icon={BookOpen}
                />
              </div>
            </div>
          </div>

          {submitError && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-md">
              <p className="font-semibold">Backend Error</p>
              <p className="mt-1 text-xs text-red-200">{submitError}</p>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600 py-4.5 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.01] hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing student data...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Predict Mathematics Score</span>
                </>
              )}
            </button>
          </div>
        </motion.form>

        <ResultCard score={result} onReset={handleReset} />
      </div>
    </section>
  );
}
