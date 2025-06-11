import { useEffect, useState } from "react";
import axios from "axios";

import ProgressStep from "./components/ProgressStep";
import SkipCard from "./components/SkipCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error/indes";
import { API_URL, CURRENCY } from "./constants";

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL);

      if (!response || !Array.isArray(response?.data)) {
        throw new Error("Invalid data format received");
      }

      setSkips(response?.data);
    } catch (err) {
      console.error("Error fetching skips ", err);
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, []);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleCancel = () => {
    setSelectedSkip(null);
  };

  const handleContinue = () => {
    console.log("Continue button clicked with selected skip:", selectedSkip);
  };

  const progressSteps = [
    { icon: "📍", label: "Postcode", isCompleted: true },
    { icon: "🗑️", label: "Waste Type", isCompleted: true },
    { icon: "📦", label: "Select Skip", isActive: true },
    { icon: "✅", label: "Permit Check" },
    { icon: "📅", label: "Choose Date" },
    { icon: "💳", label: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Progress Bar */}
      <div className="bg-gray-50 p-5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Horizontal scroll */}
          <div className="flex overflow-x-auto gap-4 pb-2 md:hidden scrollbar-hide">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex-shrink-0">
                <ProgressStep
                  icon={step.icon}
                  label={step.label}
                  isActive={step.isActive}
                  isCompleted={step.isCompleted}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Normal flex layout */}
          <div className="hidden md:flex gap-0">
            {progressSteps.map((step, index) => (
              <ProgressStep
                key={index}
                icon={step.icon}
                label={step.label}
                isActive={step.isActive}
                isCompleted={step.isCompleted}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-10 max-w-6xl mx-auto mb-[100px] md:mb-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Choose Your Perfect Skip Size
          </h1>
          <p className="text-lg text-gray-600">
            Select the skip size that matches your needs
          </p>
        </div>

        {loading && <Loader />}

        {error && <ErrorMessage message={error} onRetry={fetchSkips} />}

        {!loading && !error && skips.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No skips available for this location.
            </p>
          </div>
        )}

        {!loading && !error && skips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {skips?.map((skip) => (
              <SkipCard
                key={skip?.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      {selectedSkip && (
        <div className="bg-gray-50 border-t border-gray-200 fixed bottom-0 left-0 right-0 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="selected-info flex items-center gap-4 text-center md:text-left">
              <span className="font-semibold text-gray-800">
                {selectedSkip?.size} Yard Skip
              </span>
              <span className="text-2xl font-extrabold text-blue-500">
                {CURRENCY}
                {selectedSkip?.price_before_vat}
              </span>
              <span className="text-gray-600 text-sm">
                {selectedSkip?.hire_period_days} day hire
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
