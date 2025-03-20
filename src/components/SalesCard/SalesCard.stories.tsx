import type { Meta, StoryObj } from '@storybook/react';
import { SalesCard } from './SalesCard';

const meta: Meta<typeof SalesCard> = {
  title: 'Components/SalesCard',
  component: SalesCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SalesCard>;

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      label: `${i}:00`,
      value: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

const generateDailyData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      label: date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }),
      value: Math.floor(Math.random() * 5000000) + 1000000,
    });
  }
  return data;
};

const generateWeeklyData = (weeks: number) => {
  const data = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 7);
    data.push({
      label: `Sem ${weeks - i}`,
      value: Math.floor(Math.random() * 10000000) + 5000000,
    });
  }
  return data;
};

export const Daily: Story = {
  args: {
    totalSales: 39445665,
    averageSale: 38778,
    period: '1d',
    chartData: generateHourlyData(),
    analyticsUrl: '/analytics',
    onPeriodChange: () => {},
  },
};

export const Weekly: Story = {
  args: {
    totalSales: 89445665,
    averageSale: 42778,
    period: '7d',
    chartData: generateDailyData(7),
    analyticsUrl: '/analytics',
    onPeriodChange: () => {},
  },
};

export const Monthly: Story = {
  args: {
    totalSales: 189445665,
    averageSale: 45778,
    period: '1m',
    chartData: generateDailyData(30),
    analyticsUrl: '/analytics',
    onPeriodChange: () => {},
  },
};

export const ThreeMonths: Story = {
  args: {
    totalSales: 589445665,
    averageSale: 48778,
    period: '3m',
    chartData: generateWeeklyData(12),
    analyticsUrl: '/analytics',
    onPeriodChange: () => {},
  },
};
