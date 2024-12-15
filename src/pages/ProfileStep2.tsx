import { ProfileMetaForm } from '@/components/Auth/ProfileMetaForm';
import { ROUTES } from '@/router';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ParentOutletContext } from './CompleteProfile';

export const ProfileStep2 = () => {
  const { formState, onSubmitStep2 } = useOutletContext<ParentOutletContext>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!formState.username) {
      // redirect to completeProfileStep1
      navigate(ROUTES.completeProfileStep1);
    }
  }, []);

  return <ProfileMetaForm onSubmit={onSubmitStep2} />;
};
