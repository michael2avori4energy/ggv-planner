export type Lang = 'de' | 'en';

export const translations = {
  de: {
    // App header
    appTitle: 'Mieterstrom & GGV Planner',
    appSubtitle: 'Interaktives Simulationsmodell für Immobilien',

    // KPI Labels
    kpiYield: 'PV Energieerzeugung',
    kpiAutarky: 'Autarkiegrad',
    kpiSelfConsumption: 'Eigenverbrauchsquote',
    kpiLcoe: 'Stromgestehungskosten',
    kpiAmortization: 'Amortisationszeit',
    kpiRoi: 'Return on Investment',
    kpiYears: 'Jahre',
    tooltipKpiYield:
      'Geschätze jährlicher PV-Bruttoertrag laut EU-Satellitendaten (PVGIS-Simulation). Abhängig von Standort, Anlagenleistung, Neigungswinkel und Systemverlusten.',
    tooltipKpiAutarky:
      'Ungefährerer Anteil des Gesamtstrombedarfs, der durch PV-Direktverbrauch inkl. Batteriezwischenspeicherung gedeckt wird. Je höher, desto weniger Energie wird aus dem Netz bezugen.',
    tooltipKpiSelfConsumption:
      'Anteil des erzeugten PV-Stroms, der direkt im Gebäude verbraucht wird (inkl. Batteriespeicher). Je höher, desto weniger Überschuss wird ins Netz eingespeist.',
    tooltipKpiLcoe:
      'Ermittelte Stromgestehungskosten: Gesamtkosten der Anlage über die Laufzeit (CAPEX + OPEX + Zinsen) dividiert durch die erzeugte Energiemenge.',
    tooltipKpiAmortization:
      'Jahr, in dem die Anlage abbezahlt ist (Break-Even-Punkt). Danach müssen nur noch die Betriebskosten (Software, Wartung) bezahlt werden, der Rest bleibt als Überschuss.',
    tooltipKpiRoi:
      'Zeigt die Rendite des eingesetzten Eigenkapitals. Gesamte Nettoeinnahmen über den Betrachtungszeitraum im Verhältnis zur Eigenkapitalinvestition (CAPEX − Kreditbetrag). ',

    // Tabs
    tab1: '1. Technische Daten',
    tab2: '2. Wirtschaftliche Daten',
    tab3: '3. Ergebnisse',

    btnNext: 'Weiter',

    // Loading
    loading: 'Berechne...',

    // Tab 1: Technical
    tab1Title: 'Technische Konfiguration',
    sectionPV: 'Photovoltaik-Anlage',
    sectionConsumption: 'Verbraucher im Gebäude',

    labelAddress: 'Standort / Adresse',
    placeholderAddress: 'z.B. Berlin, Deutschland',
    addressCoords: 'Breite: {lat}, Länge: {lon}',
    tooltipAddress:
      'Die Adresse wird in GPS-Koordinaten umgerechnet und dient der Abschätzung des jährlichen PV-Ertrags. Er wird nicht gespeichert.',

    labelPvCapacity: 'PV-Leistung (kWp)',
    tooltipPvCapacity:
      'Die installierte Peakleistung der PV-Anlage in Kilowatt-Peak. Ein typisches Mehrfamilienhaus hat 30–150 kWp.',

    labelBattery: 'Batteriespeicher',
    labelBatteryCapacity: 'kWh',
    tooltipBattery:
      'Ein Batteriespeicher erhöht die Eigenverbrauchsquote erheblich, da überschüssiger PV-Strom gespeichert und nachts genutzt werden kann.',

    labelApartments: 'Wohneinheiten',
    tooltipApartments:
      'Anzahl der angeschlossenen Mietparteien. Je mehr Wohneinheiten, desto größer der Gesamtstromverbrauch.',

    labelConsumptionPerApartment: 'Verbrauch/WE (kWh)',
    tooltipConsumptionPerApartment:
      'Durchschnittlicher Jahresstromverbrauch pro Wohneinheit. Typisch: 2.000–3.500 kWh/a für Haushalte ohne Wärmenutzung.',

    labelHeatPump: 'Wärmepumpe Gesamtverbrauch (kWh/a)',
    tooltipHeatPump:
      'Gesamter Jahresstromverbrauch aller Wärmepumpen im Gebäude. Eine Luft-Wasser-WP benötigt ca. 3.000–8.000 kWh/a.',

    labelEV: 'E-Mobilität (Wallboxen) (kWh/a)',
    labelEVCount: 'Anzahl Wallboxen',
    labelEVConsumptionPerPointKwh: 'jährl. kWh pro Ladepunkt',

    tooltipEV:
      'Gesamter Jahresstromverbrauch für das Laden von Elektrofahrzeugen. Ca. 2.000–4.000 kWh/a pro Fahrzeug.',

    // Tab 2: Economic
    tab2Title: 'Wirtschaftliche Parameter',
    sectionModel: 'Betriebsmodell wählen',
    modelMieterstrom: 'Klassischer Mieterstrom',
    modelGGV: 'GGV (Gemeinschaftl. Gebäudeversorgung)',
    sectionTariffs: 'Tarife & Fördersätze',
    sectionFinancing: 'Investition & Finanzierung',

    labelTenantRate: 'Verkaufspreis Mieter (ct)',
    tooltipTenantRate:
      'Der ct/kWh-Preis, den der Betreiber an die Mieter für den Mieterstrom berechnet. Muss mindestens 10% unter dem lokalen Grundversorger-Tarif liegen.',

    labelFeedIn: 'Einspeisevergütung (ct)',
    tooltipFeedIn:
      'EEG-Einspeisevergütung für ins Netz eingespeisten Überschussstrom. Dieser Wert wird regelmäßig von der Bundesnetzagentur angepasst.',

    labelBaseFee: 'Messentgelt/Grundgebühr (€/Mo)',
    tooltipBaseFee:
      'Monatliche Grundgebühr pro Wohneinheit für die Bereitstellung des Messdienstleistungs- und Abrechnungsservice. Nur im Mieterstrom-Modell.',

    labelSubsidy: 'Mieterstromzuschlag (ct)',
    tooltipSubsidy:
      'Staatliche Förderung pro kWh an Mieter geliefertem Strom (gemäß § 21 EEG). Wird regelmäßig angepasst und variiert je nach Anlagengröße.',

    labelGridRate: 'Referenzpreis Netz (ct/kWh)',
    tooltipGridRate:
      'Lokaler Grundversorger-Tarif als Referenz. Wird u.a. zur Berechnung der Mietereinsparungen verwendet.',

    labelCapex: 'CAPEX (€ netto)',
    tooltipCapex:
      'Gesamte Investitionskosten der Anlage (Netto, ohne MwSt.). Inkl. Module, Wechselrichter, Montage, Elektrik und ggf. Speicher.',

    labelOpex: 'OPEX (€ pro Jahr)',
    tooltipOpex:
      'Jährliche Betriebskosten: Wartung, Versicherung, Zählerabrechnung, Softwaregebühren, etc. Typisch: 1–2% des CAPEX p.a.',

    labelLoanAmount: 'Kreditbetrag (€)',
    tooltipLoanAmount:
      'Der fremdfinanzierte Anteil der Investitionskosten. Der Rest ist das aufzubringende Eigenkapital.',

    labelInterestRate: 'Zins (% p.a.)',
    tooltipInterestRate:
      'Jährlicher Zinssatz des Investitionsdarlehens. Für Projekte dieser Art gibt es häufig günstige KfW-Förderprogramme.',

    labelLoanTerm: 'Laufzeit (J)',
    tooltipLoanTerm: 'Tilgungsdauer des Darlehens in Jahren. Typisch 10–20 Jahre für Solaranlagen.',

    // Tab 3: Results
    tab3Title: 'Ergebnisse & Analyse',
    chartEnergyTitle: 'Jahres-Energiebilanz',
    chartCashflowTitle: 'Cashflow-Entwicklung über {years} Jahre',
    labelPvYield: 'PV-Erzeugung:',
    labelTotalConsumption: 'Gesamtbedarf:',
    labelGridExport: 'Netzeinspeisung:',
    noData: 'Keine Daten zur Visualisierung vorhanden.',

    // Detail table
    tableTitle: 'Details für Jahr {year}',
    tablePosition: 'Position',
    tableAmount: 'Betrag (€)',
    tableRevenue: 'Einnahmen (Gesamt)',
    tableMieterstrom: '- Mieterstrom',
    tableBaseFee: '- Grundgebühr',
    tableSubsidy: '- Mieterstromzuschlag',
    tableFeedIn: '- Einspeisung',
    tableOpex: 'Betriebskosten (OPEX)',
    tableAnnuity: 'Annuität',
    tableCashflow: 'Cashflow vor Steuern',

    // Tooltip model hint
    tooltipModelMieterstrom:
      'Im klassischen Mieterstrom erhält der Vermieter/Betreiber den Mieterstromzuschlag und der Mieter bekommt einen günstigeren Tarif als vom Grundversorger. Es gilt ein gesetzlicher Deckel.',
    tooltipModelGGV:
      'Bei GGV (Gemeinschaftliche Gebäudeversorgung) nach §42b EnWG können Mieter direkt Strom aus der PV-Anlage beziehen, ohne dass der Betreiber ein Versorgungsunternehmen sein muss.',

    // Tab 3 Optimization
    sectionOptimize: 'Optimierungsregler',
    optimizeDescription:
      'Die zwei wichtigsten Stellschrauben für den Business Case – Änderungen wirken sofort auf alle Kennzahlen.',
    labelOptTenantRate: 'Verkaufspreis an Mieter',
    labelOptBattery: 'Batteriespeicher',
    noBattery: 'Kein Speicher',
    tooltipOptTenantRate:
      'Der Verkaufspreis ist der stärkste Hebel für die Einnahmen: jeder Cent mehr multipliziert sich mit der gesamten verkauften Strommenge. Er muss jedoch mindestens 10 % unter dem lokalen Grundversorger-Tarif liegen.',
    tooltipOptBattery:
      'Ein größerer Speicher erhöht den Eigenverbrauchsanteil und damit die verkaufte Menge an Mieterstrom – hat aber auch Einfluss auf den CAPEX. Prüfen Sie, ob die Mehrinvestition durch die Mehrerträge gedeckt wird.',
  },

  en: {
    // App header
    appTitle: 'Tenant Electricity & GGV Planner',
    appSubtitle: 'Interactive simulation model for real estate',

    // KPI Labels
    kpiYield: 'PV Energy Generation',
    kpiAutarky: 'Autarky Rate',
    kpiSelfConsumption: 'Self-consumption Rate',
    kpiLcoe: 'LCOE (Levelized Cost of Electricity)',
    kpiAmortization: 'Payback Period',
    kpiRoi: 'ROI',
    kpiYears: 'Years',
    tooltipKpiYield:
      'Estimated annual gross PV yield based on EU satellite data (PVGIS simulation). Depends on location, system capacity, tilt angle, and system losses.',
    tooltipKpiAutarky:
      'Approximate share of total electricity demand covered by direct PV consumption incl. battery storage. The higher the autarky rate, the less energy is drawn from the grid.',
    tooltipKpiSelfConsumption:
      'Share of generated PV electricity consumed directly in the building (incl. battery storage). Higher means less surplus is fed into the grid.',
    tooltipKpiLcoe:
      'Calculated Levelized Cost of Electricity: total system costs over its lifetime (CAPEX + OPEX + interest) divided by the total energy generated.',
    tooltipKpiAmortization:
      'The year in which the system is fully paid off (break-even point). After that, only operating costs (software, maintenance) need to be covered – the rest remains as surplus.',
    tooltipKpiRoi:
      'Return on Investment: total net revenue over the calculation period relative to the equity invested (CAPEX − loan amount). Indicates the return on equity.',

    // Tabs
    tab1: '1. Technical Data',
    tab2: '2. Economic Data',
    tab3: '3. Results',

    btnNext: 'Next',

    // Loading
    loading: 'Calculating...',

    // Tab 1: Technical
    tab1Title: 'Technical Configuration',
    sectionPV: 'Photovoltaic System',
    sectionConsumption: 'Building Consumers',

    labelAddress: 'Location / Address',
    placeholderAddress: 'e.g. Berlin, Germany',
    addressCoords: 'Lat: {lat}, Lon: {lon}',
    tooltipAddress:
      'Enter an address and select a suggestion. The system will read the exact GPS coordinates for the PVGIS yield calculation.',

    labelPvCapacity: 'PV Capacity (kWp)',
    tooltipPvCapacity:
      'Installed peak power of the PV system in kilowatt-peak. A typical multi-family building has 30–150 kWp.',

    labelBattery: 'Battery Storage',
    labelBatteryCapacity: 'kWh',
    tooltipBattery:
      'A battery storage significantly increases the self-consumption rate, as surplus PV energy can be stored and used at night.',

    labelApartments: 'Apartments',
    tooltipApartments:
      'Number of connected tenant units. More apartments means greater total electricity consumption.',

    labelConsumptionPerApartment: 'Consumption/unit (kWh)',
    tooltipConsumptionPerApartment:
      'Average annual electricity consumption per apartment. Typical: 2,000–3,500 kWh/year for households without heat use.',

    labelHeatPump: 'Heat Pump Total Consumption (kWh/a)',
    tooltipHeatPump:
      'Total annual electricity consumption of all heat pumps in the building. An air-to-water heat pump requires approx. 3,000–8,000 kWh/year.',

    labelEV: 'E-Mobility (Wallboxes) (kWh/a)',
    labelEVCount: 'Number of wallboxes',
    labelEVConsumptionPerPointKwh: 'annual kWh per charging point',
    tooltipEV:
      'Total annual electricity consumption for electric vehicle charging. Approx. 2,000–4,000 kWh/year per vehicle.',

    // Tab 2: Economic
    tab2Title: 'Economic Parameters',
    sectionModel: 'Select Operating Model',
    modelMieterstrom: 'Classic Tenant Electricity',
    modelGGV: 'GGV (Communal Building Supply)',
    sectionTariffs: 'Tariffs & Subsidies',
    sectionFinancing: 'Investment & Financing',

    labelTenantRate: 'Tenant Sales Price (ct)',
    tooltipTenantRate:
      'The ct/kWh price the operator charges tenants for electricity. Must be at least 10% below the local utility tariff.',

    labelFeedIn: 'Feed-in Tariff (ct)',
    tooltipFeedIn:
      'EEG compensation for surplus power fed into the grid. This value is regularly adjusted by the Federal Network Agency.',

    labelBaseFee: 'Metering/Base Fee (€/mo)',
    tooltipBaseFee:
      'Monthly base fee per apartment for metering and billing services. Only applicable in the Tenant Electricity model.',

    labelSubsidy: 'Tenant Electricity Subsidy (ct)',
    tooltipSubsidy:
      'Government subsidy per kWh delivered to tenants (§21 EEG). Regularly adjusted and varies by system size.',

    labelGridRate: 'Grid Reference Price (ct/kWh)',
    tooltipGridRate:
      'Local utility tariff as a reference. Used to calculate tenant savings and benchmark against the system.',

    labelCapex: 'CAPEX (€ net)',
    tooltipCapex:
      'Total investment costs of the system (net, excl. VAT). Including modules, inverters, mounting, electrical work, and storage if applicable.',

    labelOpex: 'OPEX (€/year)',
    tooltipOpex:
      'Annual operating costs: maintenance, insurance, metering, billing, software fees, etc. Typically 1–2% of CAPEX per year.',

    labelLoanAmount: 'Loan Amount (€)',
    tooltipLoanAmount:
      'The debt-financed portion of investment costs. The remainder is equity capital to be provided.',

    labelInterestRate: 'Interest Rate (% p.a.)',
    tooltipInterestRate:
      'Annual interest rate of the investment loan. Favorable KfW funding programs are often available for projects like this.',

    labelLoanTerm: 'Term (years)',
    tooltipLoanTerm:
      'Loan repayment period in years. Typically 10–20 years for solar installations.',

    // Tab 3: Results
    tab3Title: 'Results & Analysis',
    chartEnergyTitle: 'Annual Energy Balance',
    chartCashflowTitle: 'Cashflow Development over {years} Years',
    labelPvYield: 'PV Generation:',
    labelTotalConsumption: 'Total Demand:',
    labelGridExport: 'Grid Export:',
    noData: 'No data available for visualization.',

    // Detail table
    tableTitle: 'Details for Year {year}',
    tablePosition: 'Position',
    tableAmount: 'Amount (€)',
    tableRevenue: 'Revenue (Total)',
    tableMieterstrom: '- Tenant Electricity',
    tableBaseFee: '- Base Fee',
    tableSubsidy: '- Tenant Elec. Subsidy',
    tableFeedIn: '- Feed-in Revenue',
    tableOpex: 'Operating Costs (OPEX)',
    tableAnnuity: 'Loan Installment',
    tableCashflow: 'Pre-tax Cashflow',

    // Tooltip model hint
    tooltipModelMieterstrom:
      'In classic tenant electricity, the landlord/operator receives the tenant electricity subsidy and the tenant gets a cheaper tariff than from the grid provider. A legal cap applies.',
    tooltipModelGGV:
      'With GGV (communal building supply) under §42b EnWG, tenants can direct consume electricity from the PV system without the operator needing to be a utility company.',

    // Tab 3 Optimization
    sectionOptimize: 'Optimization Controls',
    optimizeDescription:
      'The two key levers for the business case – changes take effect immediately on all metrics.',
    labelOptTenantRate: 'Tenant Sales Price',
    labelOptBattery: 'Battery Storage',
    noBattery: 'No storage',
    tooltipOptTenantRate:
      'The sales price is the strongest revenue lever: every extra cent multiplies across the total electricity sold. It must remain at least 10% below the local utility tariff.',
    tooltipOptBattery:
      'A larger battery increases self-consumption and therefore the volume of tenant electricity sold — but also affects CAPEX. Check whether the additional revenue justifies the extra investment.',
  },
} as const;

export type Translations = typeof translations.de;
