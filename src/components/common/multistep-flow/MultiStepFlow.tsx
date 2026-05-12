import React from "react";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface StepItem {
  title: string;
  content: ReactNode;
}

interface MultiStepFlowProps {
  currentStep: number;
  onBack?: () => void;
  steps: StepItem[];
  showBackButton?: boolean;
}

const MultiStepFlow = ({
  currentStep,
  onBack,
  steps,
  showBackButton = true,
}: MultiStepFlowProps) => {
  const currentStepData = steps[currentStep];

  return (
    <div className="w-full relative space-y-8 px-4">
      <div className="space-y-3 relative z-10 min-h-[60px] flex flex-col justify-end">  
        {currentStepData?.title && (
          <h1 key={`title-${currentStep}`} className="text-4xl font-black text-primary-500 tracking-tight animate-reveal">
            {currentStepData.title}
          </h1>
        )}
      </div>

      <div className="relative min-h-[300px] w-full overflow-hidden">
        {steps.map((stepItem, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          
          return (
            <div
              key={index}
              className={`w-full transition-all duration-500 ease-in-out transform ${
                isActive 
                  ? "opacity-100 translate-x-0 relative z-20" 
                  : isPast 
                    ? "opacity-0 -translate-x-full absolute z-0 invisible" 
                    : "opacity-0 translate-x-full absolute z-0 invisible"
              }`}
            >
              {stepItem.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepFlow;
