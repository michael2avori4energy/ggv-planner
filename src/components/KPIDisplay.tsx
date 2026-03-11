import React from 'react';
import { EnergyResults, EconomicResults } from '../types';

interface KPIDisplayProps {
  energy: EnergyResults;
  economics: EconomicResults;
}

export const KPIDisplay: React.FC<KPIDisplayProps> = ({ energy, economics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-slate-500 mb-1">Stromerzeugung (PVGIS)</span>
        <span className="text-3xl font-bold text-blue-800">
          {(energy.totalYieldKwh / 1000).toFixed(1)} <span className="text-lg font-normal text-slate-500">MWh/a</span>
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-slate-500 mb-1">Autarkiegrad</span>
        <span className="text-3xl font-bold text-blue-500">
          {energy.autarkyRate.toFixed(1)} <span className="text-lg font-normal">{"%"}</span>
        </span>
        <span className="text-xs text-slate-400 mt-1">Eigenverb. {energy.selfConsumptionRate.toFixed(1)}%</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-slate-500 mb-1">LCOE (Stromgestehungskosten)</span>
        <span className="text-3xl font-bold text-emerald-800">
          {economics.lcoe.toFixed(2)} <span className="text-lg font-normal">ct/kWh</span>
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-slate-500 mb-1">Amortisationszeit</span>
        <span className="text-3xl font-bold text-emerald-500">
          {economics.amortizationYears ? economics.amortizationYears : '>20'} <span className="text-lg font-normal">Jahre</span>
        </span>
        {economics.roi !== Infinity && (
          <span className="text-xs text-slate-400 mt-1">ROI: {economics.roi.toFixed(1)}%</span>
        )}
      </div>
    </div>
  );
};
