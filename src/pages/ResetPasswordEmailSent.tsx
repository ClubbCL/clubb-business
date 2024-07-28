import { Typography } from '@ui/typography';
import { useTranslation } from 'react-i18next';

export const ResetPasswordEmailSent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <Typography variant="h3">{t('pages.resetPasswordEmailSent.title')}</Typography>
      <Typography variant="p" className="text-center">
        {t('pages.resetPasswordEmailSent.message')}
      </Typography>
    </div>
  );
};
