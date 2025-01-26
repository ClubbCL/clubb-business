import { Card } from '@/components/ui/card';
import { useCompany } from '@/hooks';
import { PercentageInput } from '@components';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import currency from 'currency.js';
import { Coins } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type PointsFormValues = {
  percentage: number;
};

export interface PointsFormProps {
  onSubmit: (values: PointsFormValues) => void;
  disabled?: boolean;
  loading?: boolean;
  initialPercentage?: number;
}

export const Points: React.FC<PointsFormProps> = ({ initialPercentage = 1, disabled, loading, onSubmit }) => {
  const [percentage, setPercentage] = useState(initialPercentage);
  const company = useCompany();
  const { t } = useTranslation();

  const isDisabled = disabled || loading;

  return (
    <div>
      <div>
        <div className="flex flex-col gap-y-6">
          <Card className="flex flex-1 flex-col p-4">
            <p className="flex items-center text-sm font-semibold">
              <Coins size={16} className="text-amber-400 mr-1" />
              {t('pages.points.box1.title')}
            </p>
            <div className="mt-6 mb-4">
              <PercentageInput initialValue={percentage} onValueChange={setPercentage} />
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
                {t('pages.points.box2.example2', {
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
        <Button
          type="submit"
          disabled={isDisabled}
          className="mt-8 bg-indigo-400 hover:bg-indigo-500 w-full"
          onClick={() => onSubmit({ percentage })}
        >
          {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.clubbSetup.points.submit')}
        </Button>
      </div>
    </div>
  );
};
