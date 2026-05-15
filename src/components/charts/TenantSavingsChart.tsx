import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface TenantSavingsChartProps {
  consumptionPerApartmentKwh: number;
  gridElectricityRate: number;
  tenantElectricityRate: number;
}

export const TenantSavingsChart: React.FC<TenantSavingsChartProps> = ({
  consumptionPerApartmentKwh,
  gridElectricityRate,
  tenantElectricityRate,
}) => {
  const savingsPerKwh = (gridElectricityRate - tenantElectricityRate) / 100;

  const scenarios = [
    {
      label: '-50%',
      consumptionKwh: consumptionPerApartmentKwh * 0.5,
      savings: savingsPerKwh * consumptionPerApartmentKwh * 0.5,
    },
    {
      label: 'Basis',
      consumptionKwh: consumptionPerApartmentKwh,
      savings: savingsPerKwh * consumptionPerApartmentKwh,
    },
    {
      label: '+50%',
      consumptionKwh: consumptionPerApartmentKwh * 1.5,
      savings: savingsPerKwh * consumptionPerApartmentKwh * 1.5,
    },
  ];

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={scenarios}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="40%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(val) => `${val.toFixed(0)} €`} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(
              value: number,
              _name: string,
              props: { payload?: { consumptionKwh?: number } }
            ) => {
              const kwh = props.payload?.consumptionKwh ?? 0;
              return [`${value.toFixed(2)} € (${kwh.toFixed(0)} kWh/WE)`, 'Ersparnis p.a.'];
            }}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <ReferenceLine y={0} stroke="#475569" strokeWidth={1.5} />
          <Bar dataKey="savings" name="Ersparnis p.a." radius={[4, 4, 0, 0]}>
            {scenarios.map((entry, idx) => (
              <Cell key={idx} fill={entry.savings >= 0 ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
