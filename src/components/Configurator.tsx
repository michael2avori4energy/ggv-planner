import React, { useState, useEffect } from 'react';
import {
  SystemParams, ConsumptionParams, EconomicParams, FinancingParams,
  EnergyResults, EconomicResults
} from '../types';
import { fetchPvgisYield, calculateEnergyYield, calculateEconomics } from '../lib/calculations';
import { KPIDisplay } from './KPIDisplay';
import { EnergyMixChart } from './charts/EnergyMixChart';
import { CashflowChart } from './charts/CashflowChart';
import { Calculator, Battery, Home, Zap, Euro, LineChart, MapPin } from 'lucide-react';
import Autocomplete from 'react-google-autocomplete';

export const Configurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  // State: Inputs
  const [system, setSystem] = useState<SystemParams>({
    address: 'Berlin, Germany',
    locationLat: 52.5200,
    locationLon: 13.4050,
    inclination: 30,
    azimuth: 0,
    systemLoss: 14,
    pvCapacityKwp: 50,
    hasBattery: true,
    batteryCapacityKwh: 20
  });

  const [consumption, setConsumption] = useState<ConsumptionParams>({
    apartments: 10,
    consumptionPerApartmentKwh: 2500,
    heatPumpConsumptionKwh: 10000,
    evChargingConsumptionKwh: 5000,
    generalConsumptionKwh: 2000
  });

  const [economics, setEconomics] = useState<EconomicParams>({
    model: 'Mieterstrom',
    tenantElectricityRate: 28,
    gridElectricityRate: 35,
    feedInTariff: 7.1,
    tenantElectricitySubsidy: 2.1,
    baseFeePerMonth: 9.90,
    capex: 75000,
    opexPerYear: 1500,
    calculationPeriodYears: 20
  });

  const [financing, setFinancing] = useState<FinancingParams>({
    loanAmount: 50000,
    loanTermYears: 10,
    interestRate: 4.5
  });

  // State: Results (with dummy defaults before first load)
  const [energy, setEnergy] = useState<EnergyResults>({
    totalYieldKwh: 0, selfConsumptionKwh: 0, gridSupplyKwh: 0, gridExportKwh: 0,
    autarkyRate: 0, selfConsumptionRate: 0, totalConsumptionKwh: 0, pvDirectConsumptionKwh: 0, batteryDischargeKwh: 0
  });

  const [ecoResults, setEcoResults] = useState<EconomicResults>({
    lcoe: 0, amortizationYears: null, roi: 0, cashflowPlan: []
  });

  // Effect: Recalculate everything when inputs change
  useEffect(() => {
    const runSimulation = async () => {
      setIsLoading(true);
      // 1. Ertrag von PVGIS holen
      const pvYield = await fetchPvgisYield(system);

      // 2. Energiebilanz berechnen
      const newEnergy = calculateEnergyYield(pvYield, system, consumption);
      setEnergy(newEnergy);

      // 3. Wirtschaftlichkeit berechnen
      const newEco = calculateEconomics(newEnergy, economics, financing, consumption);
      setEcoResults(newEco);

      setIsLoading(false);
    };

    // Debounce to avoid spamming the API on slider drags
    const timeout = setTimeout(() => {
      runSimulation();
    }, 500);

    return () => clearTimeout(timeout);
  }, [system, consumption, economics, financing]);

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* Header / KPIs */}
      <KPIDisplay energy={energy} economics={ecoResults} />

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Sidebar Tabs */}
        <div className="md:w-64 bg-slate-50 border-r border-slate-200 flex flex-row md:flex-col">
          <button onClick={() => setActiveTab(1)} className={`flex-1 md:flex-none flex items-center gap-3 p-4 md:px-6 md:py-5 text-left transition-colors font-medium text-sm ${activeTab === 1 ? 'bg-blue-50 text-blue-700 border-b-2 md:border-b-0 md:border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Zap size={20} className={activeTab === 1 ? 'text-blue-600' : 'text-slate-400'} />
            <span className="hidden md:block">1. Technische Daten</span>
          </button>

          <button onClick={() => setActiveTab(2)} className={`flex-1 md:flex-none flex items-center gap-3 p-4 md:px-6 md:py-5 text-left transition-colors font-medium text-sm ${activeTab === 2 ? 'bg-blue-50 text-blue-700 border-b-2 md:border-b-0 md:border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Euro size={20} className={activeTab === 2 ? 'text-blue-600' : 'text-slate-400'} />
            <span className="hidden md:block">2. Wirtschaftlichkeit</span>
          </button>

          <button onClick={() => setActiveTab(3)} className={`flex-1 md:flex-none flex items-center gap-3 p-4 md:px-6 md:py-5 text-left transition-colors font-medium text-sm ${activeTab === 3 ? 'bg-blue-50 text-blue-700 border-b-2 md:border-b-0 md:border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>
            <LineChart size={20} className={activeTab === 3 ? 'text-blue-600' : 'text-slate-400'} />
            <span className="hidden md:block">3. Resultate & Charts</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 md:p-8 relative">

          {isLoading && (
            <div className="absolute top-4 right-6 items-center gap-2 text-blue-500 font-medium text-sm hidden md:flex">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              Berechne...
            </div>
          )}

          {/* TAB 1: Technik */}
          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calculator className="text-blue-500" />
                Technische Konfiguration
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Anlage */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Photovoltaik-Anlage</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Standort / Adresse</label>
                    <div className="relative flex items-center">
                      <MapPin className="absolute left-3 text-slate-400 pointer-events-none" size={18} />
                      <Autocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                          if (place && place.geometry && place.geometry.location) {
                            const lat = typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat;
                            const lon = typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng;

                            setSystem({
                              ...system,
                              address: place.formatted_address || system.address,
                              locationLat: Number(lat),
                              locationLon: Number(lon)
                            });
                          }
                        }}
                        defaultValue={system.address}
                        options={{ types: ['address'] }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        placeholder="z.B. Berlin, Deutschland"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Breite: {system.locationLat.toFixed(4)}, Länge: {system.locationLon.toFixed(4)}
                    </p>
                  </div>

                  <div>
                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                      <span>PV-Leistung (kWp)</span>
                      <span className="text-blue-600 font-semibold">{system.pvCapacityKwp} kWp</span>
                    </label>
                    <input
                      type="range" min="0" max="500" step="5"
                      value={system.pvCapacityKwp}
                      onChange={(e) => setSystem({ ...system, pvCapacityKwp: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2 w-full">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={system.hasBattery} onChange={(e) => setSystem({ ...system, hasBattery: e.target.checked })} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${system.hasBattery ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${system.hasBattery ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-1"><Battery size={16} /> Batteriespeicher</span>
                    </label>

                    {system.hasBattery && (
                      <div className="flex-1 flex items-center gap-2">
                        <input type="number" value={system.batteryCapacityKwh} onChange={(e) => setSystem({ ...system, batteryCapacityKwh: Number(e.target.value) })} className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                        <span className="text-sm text-slate-600">kWh</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verbrauch */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Verbraucher im Gebäude</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block flex items-center gap-1 text-sm font-medium text-slate-700 mb-1"><Home size={14} /> Wohneinheiten</label>
                      <input type="number" value={consumption.apartments} onChange={(e) => setConsumption({ ...consumption, apartments: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white transition-colors outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Verbrauch/WE (kWh)</label>
                      <input type="number" value={consumption.consumptionPerApartmentKwh} onChange={(e) => setConsumption({ ...consumption, consumptionPerApartmentKwh: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white transition-colors outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Wärmepumpe Gesamtverbrauch (kWh/a)</label>
                    <input type="number" value={consumption.heatPumpConsumptionKwh} onChange={(e) => setConsumption({ ...consumption, heatPumpConsumptionKwh: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white transition-colors outline-none focus:border-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-Mobilität (Wallboxen) (kWh/a)</label>
                    <input type="number" value={consumption.evChargingConsumptionKwh} onChange={(e) => setConsumption({ ...consumption, evChargingConsumptionKwh: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white transition-colors outline-none focus:border-blue-500" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Wirtschaftlichkeit */}
          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Euro className="text-slate-500" />
                Wirtschaftliche Parameter
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Modellauswahl */}
                <div className="col-span-1 lg:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Betriebsmodell wählen</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${economics.model === 'Mieterstrom' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                      <input type="radio" name="model" className="sr-only" checked={economics.model === 'Mieterstrom'} onChange={() => setEconomics({ ...economics, model: 'Mieterstrom' })} />
                      Klassischer Mieterstrom
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${economics.model === 'GGV' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                      <input type="radio" name="model" className="sr-only" checked={economics.model === 'GGV'} onChange={() => setEconomics({ ...economics, model: 'GGV' })} />
                      GGV (Gemeinschaftl. Gebäudeversorgung)
                    </label>
                  </div>
                </div>

                {/* Tarife & Preise */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Tarife & Fördersätze</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Verkaufspreis Mieter (ct)</label>
                      <input type="number" step="0.1" value={economics.tenantElectricityRate} onChange={(e) => setEconomics({ ...economics, tenantElectricityRate: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Einspeisevergütung (ct)</label>
                      <input type="number" step="0.1" value={economics.feedInTariff} onChange={(e) => setEconomics({ ...economics, feedInTariff: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                    </div>
                  </div>

                  {economics.model === 'Mieterstrom' && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Messentgelt/Grundgebühr (€/Mo)</label>
                        <input type="number" step="0.1" value={economics.baseFeePerMonth} onChange={(e) => setEconomics({ ...economics, baseFeePerMonth: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mieterstromzuschlag (ct)</label>
                        <input type="number" step="0.1" value={economics.tenantElectricitySubsidy} onChange={(e) => setEconomics({ ...economics, tenantElectricitySubsidy: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Referenzpreis Netz (ct/kWh) <span className="text-slate-400 font-normal">(zur Einsparungsberechnung)</span></label>
                    <input type="number" step="0.1" value={economics.gridElectricityRate} onChange={(e) => setEconomics({ ...economics, gridElectricityRate: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
                  </div>
                </div>

                {/* Kosten & Finanzierung */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Investition & Finanzierung</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CAPEX (€ netto)</label>
                      <input type="number" step="500" value={economics.capex} onChange={(e) => setEconomics({ ...economics, capex: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">OPEX (€ pro Jahr)</label>
                      <input type="number" step="50" value={economics.opexPerYear} onChange={(e) => setEconomics({ ...economics, opexPerYear: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-purple-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Kreditbetrag (€)</label>
                      <input type="number" step="1000" value={financing.loanAmount} onChange={(e) => setFinancing({ ...financing, loanAmount: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-purple-500" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Zins (% p.a.)</label>
                      <input type="number" step="0.1" value={financing.interestRate} onChange={(e) => setFinancing({ ...financing, interestRate: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-purple-500" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Laufzeit (J)</label>
                      <input type="number" step="1" value={financing.loanTermYears} onChange={(e) => setFinancing({ ...financing, loanTermYears: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Resultate */}
          {activeTab === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <LineChart className="text-blue-500" />
                Ergebnisse & Analyse
              </h2>

              {ecoResults.cashflowPlan.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 mb-4 text-center">Jahres-Energiebilanz</h3>
                    <EnergyMixChart energy={energy} />
                    <div className="mt-4 text-sm text-slate-600 space-y-2 w-full px-4">
                      <div className="flex justify-between border-b border-slate-200 pb-1"><span>PV-Erzeugung:</span> <span className="font-medium">{energy.totalYieldKwh.toFixed(0)} kWh</span></div>
                      <div className="flex justify-between border-b border-slate-200 pb-1"><span>Gesamtbedarf:</span> <span className="font-medium">{energy.totalConsumptionKwh.toFixed(0)} kWh</span></div>
                      <div className="flex justify-between pb-1"><span>Netzeinspeisung:</span> <span className="font-medium text-slate-500">{energy.gridExportKwh.toFixed(0)} kWh</span></div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-slate-700 mb-4 ml-12">Cashflow-Entwicklung über {economics.calculationPeriodYears} Jahre</h3>
                    <CashflowChart data={ecoResults.cashflowPlan} onBarClick={(idx: number) => setSelectedYearIndex(idx)} />
                    
                    {ecoResults.cashflowPlan.length > 0 && (
                      <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm lg:mx-12">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                          <h4 className="font-semibold text-slate-700">Details für Jahr {ecoResults.cashflowPlan[selectedYearIndex]?.year ?? (selectedYearIndex + 1)}</h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-2 font-medium">Position</th>
                                <th className="px-4 py-2 font-medium text-right">Betrag (€)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100">
                                <td className="px-4 py-2 font-medium text-slate-700">Einnahmen (Gesamt)</td>
                                <td className="px-4 py-2 text-right text-blue-600 font-medium">{ecoResults.cashflowPlan[selectedYearIndex]?.totalRevenue.toFixed(2)}</td>
                              </tr>
                              {economics.model === 'Mieterstrom' && (
                                <>
                                  <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <td className="px-4 py-1.5 pl-8 text-slate-500 text-xs">- Mieterstrom</td>
                                    <td className="px-4 py-1.5 text-right text-slate-500 text-xs">{ecoResults.cashflowPlan[selectedYearIndex]?.revenueTenantElectricity.toFixed(2)}</td>
                                  </tr>
                                  <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <td className="px-4 py-1.5 pl-8 text-slate-500 text-xs">- Grundgebühr</td>
                                    <td className="px-4 py-1.5 text-right text-slate-500 text-xs">{ecoResults.cashflowPlan[selectedYearIndex]?.revenueBaseFee.toFixed(2)}</td>
                                  </tr>
                                  <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <td className="px-4 py-1.5 pl-8 text-slate-500 text-xs">- Mieterstromzuschlag</td>
                                    <td className="px-4 py-1.5 text-right text-slate-500 text-xs">{ecoResults.cashflowPlan[selectedYearIndex]?.revenueSubsidy.toFixed(2)}</td>
                                  </tr>
                                </>
                              )}
                              <tr className="border-b border-slate-100 bg-slate-50/50">
                                <td className="px-4 py-1.5 pl-8 text-slate-500 text-xs">- Einspeisung</td>
                                <td className="px-4 py-1.5 text-right text-slate-500 text-xs">{ecoResults.cashflowPlan[selectedYearIndex]?.revenueFeedIn.toFixed(2)}</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="px-4 py-2 font-medium text-slate-700">Betriebskosten (OPEX)</td>
                                <td className="px-4 py-2 text-right text-slate-600">-{ecoResults.cashflowPlan[selectedYearIndex]?.opex.toFixed(2)}</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="px-4 py-2 font-medium text-slate-700">Annuität</td>
                                <td className="px-4 py-2 text-right text-slate-600">-{ecoResults.cashflowPlan[selectedYearIndex]?.loanInstallment.toFixed(2)}</td>
                              </tr>
                              <tr className="bg-blue-50">
                                <td className="px-4 py-3 font-semibold text-slate-800">Cashflow vor Steuern</td>
                                <td className="px-4 py-3 text-right font-bold text-slate-800">{ecoResults.cashflowPlan[selectedYearIndex]?.cashflow.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                  Keine Daten zur Visualisierung vorhanden.
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
