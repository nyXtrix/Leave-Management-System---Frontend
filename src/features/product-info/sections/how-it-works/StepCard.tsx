interface StepCardProps {
  number: string;
  title: string;
  description: string;
  detail: string;
  isLast: boolean;
}

const StepCard = ({ number, title, description, detail, isLast }: StepCardProps) => (
  <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left h-full">
    {/* Step number */}
    <div className="relative mb-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white font-extrabold text-lg shadow-lg relative z-10">
        {number}
      </div>
      {!isLast && (
        <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-8 mt-2 bg-linear-to-b from-neutral-300 to-transparent" />
      )}
    </div>

    <h3 className="text-lg font-bold text-secondary-900 mb-3">{title}</h3>
    <p className="text-secondary-500 text-sm leading-relaxed mb-4">{description}</p>

    <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
      {detail.split(" · ").map((tag) => (
        <span key={tag} className="text-[11px] font-semibold text-primary-600 bg-secondary-50 border border-secondary-100 rounded-full px-2.5 py-0.5">
          {tag}
        </span>
      ))}
    </div>

    {!isLast && (
      <div className="hidden lg:block absolute top-7 left-full w-20 -translate-x-16 z-0">
        <svg viewBox="0 0 100 20" className="w-full" fill="none" preserveAspectRatio="none">
          <path 
            d="M0 10 Q25 0 50 10 Q75 20 100 10" 
            stroke="#E2E8F0" 
            strokeWidth="2" 
            strokeDasharray="6 4" 
          />
          <circle r="4" fill="#ef4444" className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
            <animateMotion 
              dur="2.5s" 
              repeatCount="indefinite" 
              path="M0 10 Q25 0 50 10 Q75 20 100 10" 
            />
          </circle>
        </svg>
      </div>
    )}
  </div>
);

export default StepCard;
