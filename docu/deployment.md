# Deployment Guide

[Deutsch](#deutsch) | [English](#english)

---

<a name="deutsch"></a>
## 🇩🇪 Deutsch

### Umgebungsvariablen

Lege eine `.env`-Datei im Projektstammverzeichnis an (Vorlage: `.env.example`, falls vorhanden):

| Variable | Pflicht | Beschreibung |
|---|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Ja | Google Maps API Key für die Adress-Autovervollständigung (Places API muss aktiviert sein) |
| `VITE_PVGIS_BASE_URL` | Nein | Basis-URL für die PVGIS-API. Standard: `/pvgis-api/api/v5_2` (geht durch den konfigurierten Proxy) |

#### Hinweis zur PVGIS-API

Die [PVGIS-API der EU-Kommission](https://re.jrc.ec.europa.eu/pvg_tools/en/) unterstützt **keine direkten Browser-Anfragen** (kein CORS). Anfragen müssen über einen serverseitigen Proxy geleitet werden. Für lokale Entwicklung und Netlify-Deployments ist dies bereits vorkonfiguriert (siehe unten).

---

### Lokale Entwicklung

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. .env anlegen
cp .env.example .env   # oder manuell anlegen
# VITE_GOOGLE_MAPS_API_KEY=<dein-key> eintragen

# 3. Entwicklungsserver starten
npm run dev
```

Der Vite-Dev-Server proxied automatisch alle Anfragen an `/pvgis-api/*` an `https://re.jrc.ec.europa.eu`. Keine weitere Konfiguration nötig.

---

### Deployment auf Netlify

Die Datei [`netlify.toml`](../netlify.toml) im Projektstammverzeichnis enthält bereits eine Proxy-Regel für die PVGIS-API:

```toml
[[redirects]]
  from = "/pvgis-api/*"
  to   = "https://re.jrc.ec.europa.eu/:splat"
  status = 200
  force  = true
```

**Schritte:**

1. Repository mit Netlify verbinden (GitHub → Netlify → "New site from Git")
2. Build-Einstellungen:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Umgebungsvariablen in Netlify setzen:
   - `VITE_GOOGLE_MAPS_API_KEY` → deinen Google API Key
   - `VITE_PVGIS_BASE_URL` → `/pvgis-api/api/v5_2` (entspricht dem Proxy-Pfad aus `netlify.toml`)
4. Deploy auslösen

Die PVGIS-Proxy-Regel greift automatisch, sobald `netlify.toml` im Repository vorhanden ist.

---

### Deployment auf anderen Plattformen

Für andere Hosting-Plattformen muss der PVGIS-Proxy separat konfiguriert werden.

#### Vercel

Erstelle eine `vercel.json` im Projektstammverzeichnis:

```json
{
  "rewrites": [
    {
      "source": "/pvgis-api/:path*",
      "destination": "https://re.jrc.ec.europa.eu/:path*"
    }
  ]
}
```

Setze anschließend `VITE_PVGIS_BASE_URL=/pvgis-api/api/v5_2` als Umgebungsvariable in den Vercel-Projekteinstellungen.

#### Nginx

```nginx
location /pvgis-api/ {
    proxy_pass https://re.jrc.ec.europa.eu/;
    proxy_set_header Host re.jrc.ec.europa.eu;
}
```

Setze `VITE_PVGIS_BASE_URL` beim Build auf die öffentliche URL deines Proxys, z. B.:

```bash
VITE_PVGIS_BASE_URL=https://deine-domain.de/pvgis-api/api/v5_2 npm run build
```

---

<a name="english"></a>
## 🇺🇸 English

### Environment Variables

Create a `.env` file in the project root:

| Variable | Required | Description |
|---|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Yes | Google Maps API key for address autocomplete (Places API must be enabled) |
| `VITE_PVGIS_BASE_URL` | No | Base URL for the PVGIS API. Default: `/pvgis-api/api/v5_2` (routed through the configured proxy) |

#### Note on the PVGIS API

The [EU Commission PVGIS API](https://re.jrc.ec.europa.eu/pvg_tools/en/) does **not support direct browser requests** (no CORS). Requests must be routed through a server-side proxy. This is already pre-configured for local development and Netlify deployments (see below).

---

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env
cp .env.example .env   # or create manually
# Add VITE_GOOGLE_MAPS_API_KEY=<your-key>

# 3. Start development server
npm run dev
```

The Vite dev server automatically proxies all requests to `/pvgis-api/*` to `https://re.jrc.ec.europa.eu`. No additional configuration required.

---

### Deploying to Netlify

The [`netlify.toml`](../netlify.toml) file already includes a proxy rule for the PVGIS API:

```toml
[[redirects]]
  from = "/pvgis-api/*"
  to   = "https://re.jrc.ec.europa.eu/:splat"
  status = 200
  force  = true
```

**Steps:**

1. Connect your repository to Netlify (GitHub → Netlify → "New site from Git")
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Set environment variables in Netlify:
   - `VITE_GOOGLE_MAPS_API_KEY` → your Google API key
   - `VITE_PVGIS_BASE_URL` → `/pvgis-api/api/v5_2` (matches the proxy path from `netlify.toml`)
4. Trigger a deploy

The PVGIS proxy rule is picked up automatically as long as `netlify.toml` is present in the repository.

---

### Deploying to Other Platforms

For other hosting platforms, the PVGIS proxy needs to be configured separately.

#### Vercel

Create a `vercel.json` in the project root:

```json
{
  "rewrites": [
    {
      "source": "/pvgis-api/:path*",
      "destination": "https://re.jrc.ec.europa.eu/:path*"
    }
  ]
}
```

Then set `VITE_PVGIS_BASE_URL=/pvgis-api/api/v5_2` as an environment variable in your Vercel project settings.

#### Nginx

```nginx
location /pvgis-api/ {
    proxy_pass https://re.jrc.ec.europa.eu/;
    proxy_set_header Host re.jrc.ec.europa.eu;
}
```

Set `VITE_PVGIS_BASE_URL` at build time to your public proxy URL, e.g.:

```bash
VITE_PVGIS_BASE_URL=https://your-domain.com/pvgis-api/api/v5_2 npm run build
```
