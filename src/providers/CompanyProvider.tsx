import { createContext, useState } from 'react';

export const CompanyConext = createContext<{
  id: null | string;
  name: null | string;
  setCompany: (company: { id: string; name: string }) => void;
}>({
  id: null,
  name: null,
  setCompany: () => {},
});

export interface CompanyProviderProps {
  children: React.ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [company, setCompany] = useState<{ id: string | null; name: string | null }>({
    id: null,
    name: null,
  });

  const contextValue = {
    id: company.id,
    name: company.name,
    setCompany,
  };

  return <CompanyConext.Provider value={contextValue}>{children}</CompanyConext.Provider>;
};
