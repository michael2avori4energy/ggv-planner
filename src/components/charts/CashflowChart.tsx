import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { YearlyCashflow } from '../../types';

interface CashflowChartProps {
  data: YearlyCashflow[];
  onBarClick?: (index: number) => void;
}

export const CashflowChart: React.FC<CashflowChartProps> = ({ data, onBarClick }) => {
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={(e) => {
            if (e && e.activeTooltipIndex !== undefined && onBarClick) {
              onBarClick(e.activeTooltipIndex);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="year" axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(0)} €`, '']}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend />
          <ReferenceLine y={0} stroke="#94a3b8" />

          <Bar dataKey="totalRevenue" name="Einnahmen p.a." fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="opex" name="Betriebskosten (OPEX)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="loanInstallment" name="Annuität" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
