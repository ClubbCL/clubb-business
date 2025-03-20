import BannerIcon from '@/assets/icons/banner-icon.png';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Stepper } from './Stepper';

interface HomeBannerProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  steps: Array<{
    id: string;
    title: string;
    status: 'completed' | 'in_progress' | 'pending';
  }>;
  onContinue: () => void;
  className?: string;
}

export const HomeBanner = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  steps,
  onContinue,
  className,
}: HomeBannerProps) => {
  return (
    <div className={cn('relative w-full rounded-2xl bg-purple-700 p-6 overflow-hidden', className)}>
      {/* Background Image */}
      <div className="absolute right-0 top-0 h-full">
        <img src={BannerIcon} alt="" className="h-full w-auto object-contain" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="max-w-[60%] mb-6">
          {/* Steps */}
          <Stepper steps={steps} />

          {/* Step Counter */}
          <div className="mt-6 text-sm text-white/70">
            {currentStep}/{totalSteps}
          </div>

          {/* Title */}
          <h1 className="mt-2 text-2xl font-medium text-white">{title}</h1>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-white/70 leading-[1.375rem]">{subtitle}</p>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={onContinue}
            className="h-11 px-5 rounded-xl font-medium transition-colors bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:border-blue-700"
          >
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
