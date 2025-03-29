import { ComponentType, ReactNode, useState } from "react";

export const useMultiStepForm = <T>(steps: ComponentType<T>[]) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const next = () => !isLastStep && setCurrentStep((prev) => prev + 1);
  const back = () => !isFirstStep && setCurrentStep((prev) => prev - 1);

  return {
    currentStep,
    step: steps[currentStep],
    next,
    back,
    isFirstStep,
    isLastStep,
  };
};
