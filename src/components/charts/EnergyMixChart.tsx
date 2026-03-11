import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyResults } from '../../types';

interface EnergyMixChartProps {
  energy: EnergyResults;
}

const COLORS = ['#2563eb', '#60a5fa', '#94a3b8']; // Blau (PV), Hellblau (Batterie), Grau (Netz)

export const EnergyMixChart: React.FC<EnergyMixChartProps> = ({ energy }) => {
  const data = [
    { name: 'PV-Erzeugung', value: energy.pvDirectConsumptionKwh },
    ...(energy.batteryDischargeKwh > 0 ? [{ name: 'Batteriebezug', value: energy.batteryDischargeKwh }] : []),
    { name: 'Netzbezug', value: energy.gridSupplyKwh },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(0)} kWh`, 'Energie']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
