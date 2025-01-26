import { Points, PointsFormProps, PointsFormValues } from '@components/Forms/ClubbSignup/Points';
import { Profile, ProfileFormProps, ProfileFormValues } from '@components/Forms/ClubbSignup/Profile';
import {
  Verification,
  VerificationFormProps,
  VerificationFormValues,
} from '@components/Forms/ClubbSignup/Verification';
import { Stepper, StepType } from '@components/Stepper';
import { Button } from '@ui/button';
import { useState } from 'react';

import Logo from '@/assets/clubb-signup-logo.svg';
import ClubbLogo from '@/assets/icons/clubb_simple.svg';

import { CompanyForm, CompanyFormProps, CompanyFormValues } from './CompanyForm';
import { TitledForm } from './TitledForm';

type ClubbSignupStep = 'step-1' | 'step-2' | 'step-3' | 'step-4';

type ClubbSignupValues = {
  company: CompanyFormValues;
  points: PointsFormValues;
  profile: ProfileFormValues;
  verification: VerificationFormValues;
};

const initialStepsState: StepType[] = [
  { index: 1, id: 'step-1', label: 'Datos de la empresa' },
  { index: 2, id: 'step-2', label: 'Acumulación de pesos' },
  { index: 3, id: 'step-3', label: 'Perfil' },
  { index: 4, id: 'step-4', label: 'Verificaión' },
];

export interface ClubbSignupProps {
  initialStep?: ClubbSignupStep;
  onSubmit?: (values: ClubbSignupValues) => void;
}

export const ClubbSignup: React.FC<ClubbSignupProps> = (props) => {
  const { initialStep = 'step-1' } = props;

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [clubbSteps, setClubbSteps] = useState(initialStepsState);
  const [clubbValues, setClubbValues] = useState<Partial<ClubbSignupValues>>({});

  const onChangeCurrentStep = (step: StepType) => {
    setCurrentStep(step.id as ClubbSignupStep);
  };

  const onSubmitCompanyForm: CompanyFormProps['onSubmit'] = (values) => {
    setClubbValues({ ...clubbValues, company: values });

    setClubbSteps((prevState) => {
      return prevState.map((step) => {
        if (step.id === 'step-1') {
          return { ...step, status: 'completed' };
        }
        return step;
      });
    });

    setCurrentStep('step-2');
  };

  const onSubmitPointsForm: PointsFormProps['onSubmit'] = (values) => {
    setClubbValues({ ...clubbValues, points: values });

    setClubbSteps((prevState) => {
      return prevState.map((step) => {
        if (step.id === 'step-2') {
          return { ...step, status: 'completed' };
        }
        return step;
      });
    });

    setCurrentStep('step-3');
  };

  const onSubmitProfileForm: ProfileFormProps['onSubmit'] = (values) => {
    setClubbValues({ ...clubbValues, profile: values });

    setClubbSteps((prevState) => {
      return prevState.map((step) => {
        if (step.id === 'step-3') {
          return { ...step, status: 'completed' };
        }
        return step;
      });
    });

    setCurrentStep('step-4');
  };

  const onSubmitVerificationForm: VerificationFormProps['onSubmit'] = (values) => {
    setClubbValues({ ...clubbValues, verification: values });

    if (props.onSubmit) {
      props.onSubmit(clubbValues as ClubbSignupValues);
    }
  };

  const stepContent: Record<ClubbSignupStep, React.ReactNode> = {
    'step-1': (
      <TitledForm title="Datos de la empresa" titleContainerClassName="mb-2">
        <CompanyForm onSubmit={onSubmitCompanyForm} initialValues={clubbValues.company} />
      </TitledForm>
    ),
    'step-2': (
      <TitledForm
        title="Pesos clubb"
        subTitle="Define cómo se acumularán los pesos clubb"
        titleContainerClassName="mb-8"
        onClickBack={() => setCurrentStep('step-1')}
      >
        <Points onSubmit={onSubmitPointsForm} initialPercentage={clubbValues.points?.percentage} />
      </TitledForm>
    ),
    'step-3': (
      <TitledForm title="Perfil público" titleContainerClassName="mb-8" onClickBack={() => setCurrentStep('step-2')}>
        <Profile onSubmit={onSubmitProfileForm} initialValues={clubbValues.profile} />
      </TitledForm>
    ),
    'step-4': (
      <TitledForm title="Verificación" titleContainerClassName="mb-8" onClickBack={() => setCurrentStep('step-3')}>
        <Verification onSubmit={onSubmitVerificationForm} initialValues={clubbValues.verification} />
      </TitledForm>
    ),
  };

  console.log('clubbValues', clubbValues);

  return (
    <div>
      <div className="flex justify-between items-center px-10 py-9">
        <div className="flex text-slate-500 text-2xl font-semibold gap-x-1 items-start">
          <ClubbLogo />
          <span>Builder</span>
        </div>
        <div>
          <Stepper steps={clubbSteps} activeStepId={currentStep} onChange={onChangeCurrentStep} />
        </div>
        <div className="flex gap-x-2">
          <Button variant="outline">Guardar</Button>
          <Button variant="outline">Ir al Dashboard</Button>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="flex flex-1 justify-center mt-20">
          <div className="w-full max-w-[320px]">{stepContent[currentStep]}</div>
        </div>
        <div className="flex flex-1 justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};
