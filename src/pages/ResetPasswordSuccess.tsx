import { ROUTES } from '@/router';
import { Typography } from '@ui/typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps, Navigate } from 'react-router-dom';

export const ResetPasswordSuccess: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(5);

  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (secondsLeft <= 0) {
    return <Navigate to={ROUTES.signin} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <Typography variant="h3">{t('pages.resetPasswordSuccess.title')}</Typography>
      <Typography variant="p" className="text-center">
        {t('pages.resetPasswordSuccess.message', { secondsLeft })}
      </Typography>
      <Typography<LinkProps>
        variant="p"
        className="text-blue-800 underline"
        component={Link}
        componentProps={{ to: ROUTES.root }}
      >
        {t('pages.resetPasswordSuccess.continue')}
      </Typography>
    </div>
  );
};
