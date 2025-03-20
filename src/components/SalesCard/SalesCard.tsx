import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface DataPoint {
  value: number;
  label: string;
}

export type Period = '1d' | '7d' | '1m' | '3m';

interface SalesCardProps {
  /** Title for the card */
  title?: string;
  /** Total sales for the selected period */
  totalSales: number;
  /** Average sale per member */
  averageSale: number;
  /** Data points for the chart */
  chartData: DataPoint[];
  /** Currently selected period */
  period: Period;
  /** Called when period changes */
  onPeriodChange: (period: Period) => void;
  /** URL for the analytics page */
  analyticsUrl: string;
  /** Optional class name for styling */
  className?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
};

export const SalesCard = ({
  title = 'Ventas a miembros',
  totalSales,
  averageSale,
  chartData,
  period,
  onPeriodChange,
  analyticsUrl,
  className,
}: SalesCardProps) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
        <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
        <Select value={period} onValueChange={(value) => onPeriodChange(value as Period)}>
          <SelectTrigger className="h-11 w-[180px] rounded-xl px-5 transition-colors">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Últimas 24 horas</SelectItem>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
            <SelectItem value="1m">Último mes</SelectItem>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-4">
        <div className="grid grid-cols-[minmax(200px,1fr),2fr] gap-6">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <div className="text-2xl font-medium text-gray-900">{formatCurrency(totalSales)}</div>
              <CardDescription className="text-sm text-gray-600 leading-[1.375rem]">
                Total ventas a miembros
              </CardDescription>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="text-lg font-medium text-gray-900">{formatCurrency(averageSale)}</div>
              <CardDescription className="text-sm text-gray-600 leading-[1.375rem]">
                Venta promedio por miembro
              </CardDescription>
            </div>
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={70}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Ventas']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6">
          <Link href={analyticsUrl} className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Ir a Analytics
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
