const FlowBar = () => (
  <div className="mt-16 bg-secondary-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
    {["Submitted", "In Review", "Decision Made", "Balance Updated"].map((label, i) => (
      <div key={label} className="flex items-center gap-0 flex-1 w-full sm:w-auto">
        <div className="flex flex-col items-center w-full sm:w-auto text-center">
          <div
            className="h-2.5 w-2.5 rounded-full mb-2 flow-dot"
            style={{
              background: i === 0 ? "#FF1919" : i < 3 ? "#667085" : "#10b981",
              animationDelay: `${i * 0.5}s`,
            }}
          />
          <span className="text-xs font-semibold text-secondary-400">{label}</span>
        </div>
        {i < 3 && (
          <div className="hidden sm:block flex-1 h-px mx-3 bg-secondary-700 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-secondary-400 to-transparent flow-line"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default FlowBar;
