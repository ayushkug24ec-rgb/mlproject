import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PredictionForm from "./components/PredictionForm";
import HowItWorks from "./components/HowItWorks";
import ModelInfo from "./components/ModelInfo";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white antialiased selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PredictionForm />
        <HowItWorks />
        <ModelInfo />
      </main>
      <Footer />
    </div>
  );
}
