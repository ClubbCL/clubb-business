import { Card } from '@/components/ui/card';
import { useCompany } from '@/hooks';
import { ROUTES } from '@/router';
import { Banner, PercentageInput } from '@components';
import currency from 'currency.js';
import { ChevronRight, Coins } from 'lucide-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Points = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [percentage, setPercentage] = useState(1);
  const company = useCompany();
  const { t } = useTranslation();

  return (
    <div>
      <div>
        {showBanner && (
          <Banner
            type="info"
            message="Aquí puedes configurar cuántos pesos sumarán los miembros según lo que consuman o compren. Desde la App móvil podrás agregar sus gastos."
            closeHandler={() => setShowBanner(false)}
            className="w-full mb-5"
          />
        )}
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-5">{t('pages.points.rulesTitle', { companyName: company.name })}</h1>
        <div className="flex gap-x-6">
          <Card className="flex flex-1 flex-col p-4">
            <p className="flex items-center text-sm font-semibold">
              <Coins size={16} className="text-amber-400 mr-1" />
              {t('pages.points.box1.title')}
            </p>
            <div className="mt-6 mb-4">
              <PercentageInput initialValue="1.0" onValueChange={setPercentage} />
            </div>
            <p className="text-gray-600 text-sm">{t('pages.points.box1.detail', { percentage })}</p>
          </Card>
          <Card className="flex flex-1 flex-col p-4">
            <p className="flex items-center text-sm font-semibold">
              <Coins size={16} className="text-amber-400 mr-1" />
              {t('pages.points.box2.title')}
            </p>
            <div className="mt-6 mb-4">
              <p className="text-2xl bg-violet-50 border rounded-lg inline-flex h-[65px] px-3 items-center">
                <Coins size={30} className="text-amber-400 mr-2" />
                {t('pages.points.box2.example', {
                  base: '$100',
                  earn: currency(100 * (percentage / 100), { precision: 2 }).format({
                    symbol: '$',
                  }),
                  companyName: company.name,
                  currency: 'Pesos',
                })}
              </p>
            </div>
            <p className="text-gray-600 text-sm">{t('pages.points.box2.detail', { base: '$100', earn: '$1' })}</p>
          </Card>
        </div>
      </div>
      <div className="mt-7">
        <h2 className="font-semibold text-xl">{t('pages.points.howToEarn.title', { companyName: company.name })}</h2>
      </div>
      <div className="mt-5">
        <div className="text-gray-900 text-sm">
          <p>
            <Trans
              i18nKey="pages.points.howToEarn.p1"
              components={{
                a: <Link to={ROUTES.myTeam} className="text-indigo-600 underline" />,
              }}
            />
          </p>
          <p className="mt-10">{t('pages.points.howToEarn.p2')}</p>
        </div>
        <div className="font-semibold text-indigo-600 text-sm flex flex-col mt-2 gap-y-2">
          <a href="https://www.google.com" target="_blank" className="inline-flex items-center">
            {t('pages.points.howToEarn.goToDocs')}
            <ChevronRight size={16} />
          </a>
          <a href="https://www.google.com" target="_blank" className="inline-flex items-center">
            {t('pages.points.howToEarn.goToSupport')}
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
