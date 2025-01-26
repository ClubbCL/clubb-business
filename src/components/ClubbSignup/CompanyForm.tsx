import { Information, InformationFormValues } from '@components/Forms/ClubbSignup/Information';
import { Location, LocationFormValues } from '@components/Forms/ClubbSignup/Location';
import { VerticalStepper, VerticalStepType } from '@components/VerticalStepper';
import { Button } from '@ui/button';
import { ChevronLeft } from 'lucide-react';

import { useState } from 'react';

export type CompanyFormValues = {
  location: LocationFormValues;
  information: InformationFormValues;
};

export type CompanyFormStep = 'step-1' | 'step-2';

export interface CompanyFormProps {
  initialStep?: CompanyFormStep;
  initialValues?: Partial<CompanyFormValues>;
  onSubmit?: (values: CompanyFormValues) => void;
}

const initialStepsState: VerticalStepType[] = [
  { index: 1, id: 'step-1', label: 'Ubicación', status: 'pending' },
  { index: 2, id: 'step-2', label: 'Información', status: 'pending' },
];

const getSteps = (currentStep: string, steps: VerticalStepType[]): VerticalStepType[] =>
  steps.map((step) => {
    if (step.id === currentStep) {
      return { ...step, status: 'active' };
    }
    return step;
  });

export const CompanyForm: React.FC<CompanyFormProps> = (props) => {
  const { initialStep = 'step-1', initialValues = {} } = props;

  const [currentStep, setCurrentStep] = useState<CompanyFormStep>(initialStep);
  const [steps, setSteps] = useState(getSteps(currentStep, initialStepsState));
  const [companyValues, setCompanyValues] = useState<Partial<CompanyFormValues>>(initialValues);

  const onSubmitLocation = (values: LocationFormValues) => {
    setCompanyValues({ ...companyValues, location: values });
    setCurrentStep('step-2');

    setSteps((prevState) => {
      const newSteps = prevState.map<VerticalStepType>((step) => {
        if (step.id === 'step-1') {
          return { ...step, status: 'completed' };
        }
        return step;
      });

      return getSteps('step-2', newSteps);
    });
  };

  const onSubmitInformation = (values: InformationFormValues) => {
    const val = { ...companyValues, information: values };

    if (props.onSubmit) {
      props.onSubmit(val as CompanyFormValues);
    }
  };

  const onClickBack = () => {
    setCurrentStep('step-1');
    setSteps((prevState) => getSteps('step-1', prevState));
  };

  const stepContent: Record<CompanyFormStep, JSX.Element> = {
    'step-1': <Location onSubmit={onSubmitLocation} initialValues={companyValues.location} />,
    'step-2': (
      <div>
        <Information onSubmit={onSubmitInformation} initialValues={companyValues.information} />
        <Button className="mt-4 text-xs px-0 pr-1" variant="ghost" onClick={onClickBack}>
          <ChevronLeft size={14} className="mr-1" />
          Anterior
        </Button>
      </div>
    ),
  };

  return (
    <div>
      <div className="mb-8">
        <VerticalStepper steps={steps} />
      </div>
      {stepContent[currentStep]}
    </div>
  );
};
