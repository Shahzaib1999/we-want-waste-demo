import { CURRENCY, IMAGE_BASE_URL } from "../../constants";

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const imageUrl = `${IMAGE_BASE_URL}/${skip?.size}-yarder-skip.jpg`;

  return (
    <div
      className={`skip-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 relative ${
        isSelected
          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500"
          : "bg-white border-transparent hover:border-blue-200"
      }`}
      onClick={() => onSelect(skip)}
    >
      <div className="h-48 flex items-center justify-center relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`${skip?.size} yard skip`}
          className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // if image fails dummy image will be shown
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        {/* dummy img */}
        <div
          className="w-36 h-20 bg-orange-500 rounded-lg relative shadow-lg"
          style={{
            transform: "perspective(100px) rotateX(15deg)",
            display: "none",
          }}
        >
          <div className="absolute -top-2 left-2 right-2 h-5 bg-orange-600 rounded"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
            {skip?.size}YD
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3
          className={`text-xl font-bold mb-2 ${
            isSelected ? "text-white" : "text-gray-800"
          }`}
        >
          {skip?.size} Yard Skip
        </h3>
        <p
          className={`text-sm mb-4 ${
            isSelected ? "opacity-90" : "text-gray-600"
          }`}
        >
          {skip?.hire_period_days} day hire period
        </p>
        <div className="flex items-center justify-between">
          <div
            className={`text-3xl font-extrabold ${
              isSelected ? "text-white" : "text-blue-500"
            }`}
          >
            {CURRENCY}
            {skip?.price_before_vat}
          </div>
          <button
            className={`py-2 px-5 rounded-lg font-semibold cursor-pointer sm:px-10 ${
              isSelected
                ? "bg-white/20 border-2 border-transparent text-white hover:bg-white/30"
                : "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {isSelected ? "Selected ✓" : "Select Skip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
