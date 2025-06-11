const ProgressStep = ({ icon, label, isActive, isCompleted }) => (
  <div className="flex items-center flex-1 min-w-max">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mr-3 z-10 ${
        isCompleted
          ? "bg-green-500 text-white"
          : isActive
          ? "bg-blue-500 text-white animate-pulse"
          : "bg-gray-400 text-white"
      }`}
    >
      {icon}
    </div>
    <div
      className={`font-medium ${
        isActive
          ? "text-blue-500 font-semibold"
          : isCompleted
          ? "text-gray-700"
          : "text-gray-500"
      }`}
    >
      {label}
    </div>
  </div>
);

export default ProgressStep;
