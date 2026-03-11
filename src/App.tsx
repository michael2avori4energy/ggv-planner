import { Configurator } from './components/Configurator';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Mieterstrom <span className="text-blue-600">&</span> GGV Planner
        </h1>
        <p className="text-slate-500 text-sm mt-1">Interaktives Simulationsmodell für Immobilien</p>
      </div>
      
      <Configurator />
    </div>
  );
}

export default App;
