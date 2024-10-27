import { CompanyConext } from '@providers/CompanyProvider';
import { useContext } from 'react';

export const useCompany = () => {
  const context = useContext(CompanyConext);

  if (!context) {
    throw new Error('useCompany must be used within an CompanyProvider');
  }

  return context;
};
