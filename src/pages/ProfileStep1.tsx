import { ProfileForm } from '@/components/Auth/ProfileForm';
import { useOutletContext } from 'react-router-dom';
import { ParentOutletContext } from './CompleteProfile';

export const ProfileStep1 = () => {
  const { onSubmitStep1 } = useOutletContext<ParentOutletContext>();

  return <ProfileForm onSubmit={onSubmitStep1} />;
};
