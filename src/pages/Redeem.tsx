import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useCompany } from '@/hooks';
import { ROUTES } from '@/router';
import { ChevronRight, Coins } from 'lucide-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Redeem = () => {
  const [checked, setChecked] = useState(true);
  const company = useCompany();
  const { t } = useTranslation();

  return (
    <div>
      <Card className="flex items-center justify-between p-4">
        <div className="flex flex-col text-sm">
          <p className="font-semibold text-gray-900">
            {t('pages.redeem.enableRedeem.title', { companyName: company.name })}
          </p>
          <p className="text-gray-600">{t('pages.redeem.enableRedeem.subTitle')}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2">{t('pages.redeem.enableRedeem.enable')}</span>
          <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
      </Card>
      <div className="mt-5">
        <div className="flex gap-x-6">
          <Card className="flex flex-1 flex-col p-4">
            <p className="flex items-center text-sm font-semibold">
              <Coins size={16} className="text-amber-400 mr-1" />
              {t('pages.redeem.box1.title')}
            </p>
            <div className="mt-6 mb-4">
              <p className="text-2xl bg-violet-50 border rounded-lg inline-flex h-[65px] px-3 items-center">
                <Coins size={30} className="text-amber-400 mr-2" />
                {t('pages.redeem.box1.example', {
                  amount: '$1',
                  companyName: company.name,
                  equal: '$1',
                  currency: 'CL Pesos',
                })}
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              {t('pages.redeem.box1.detail', {
                companyPoints: '$100',
                companyName: company.name,
                currency: '$100 pesos chilenos',
              })}
            </p>
          </Card>
          <div className="flex flex-1" />
        </div>
      </div>
      <div className="mt-7">
        <h2 className="font-semibold text-xl">{t('pages.redeem.howToRedeem.title', { companyName: company.name })}</h2>
      </div>
      <div className="mt-5">
        <div className="text-gray-900 text-sm">
          <p>
            <Trans
              i18nKey="pages.redeem.howToRedeem.p1"
              components={{
                a: <Link to={ROUTES.myTeam} className="text-indigo-600 underline" />,
              }}
            />
          </p>
          <p className="mt-10">{t('pages.redeem.howToRedeem.p2')}</p>
        </div>
        <div className="font-semibold text-indigo-600 text-sm flex flex-col mt-2 gap-y-2">
          <a href="https://www.google.com" target="_blank" className="inline-flex items-center">
            {t('pages.redeem.howToRedeem.goToDocs')}
            <ChevronRight size={16} />
          </a>
          <a href="https://www.google.com" target="_blank" className="inline-flex items-center">
            {t('pages.redeem.howToRedeem.goToSupport')}
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
