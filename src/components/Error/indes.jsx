const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-20">
    <div className="text-red-500 mb-4">
      <svg
        className="w-16 h-16 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold">{message}</p>
    </div>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Try Again
    </button>
  </div>
);

export default ErrorMessage;
