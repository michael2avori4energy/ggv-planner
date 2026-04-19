import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Configurator } from './components/Configurator';

const AppInner = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'de' ? 'Mieterstrom' : 'Tenant Electricity'}{' '}
            <span className="text-blue-600">&</span> GGV Planner
          </h1>
          <p className="text-slate-500 text-sm mt-1">{t.appSubtitle}</p>
        </div>

        {/* Language Switcher */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm flex-shrink-0">
          <button
            onClick={() => setLang('de')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              lang === 'de'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            DE
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              lang === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <Configurator />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
