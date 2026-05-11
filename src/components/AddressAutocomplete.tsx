import React, { useState, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';

interface Suggestion {
  label: string;
  lat: number;
  lon: number;
}

interface Props {
  defaultValue: string;
  placeholder: string;
  onSelect: (address: string, lat: number, lon: number) => void;
}

export const AddressAutocomplete: React.FC<Props> = ({ defaultValue, placeholder, onSelect }) => {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef(false);

  const toSuggestion = (feature: {
    geometry: { coordinates: [number, number] };
    properties: Record<string, string | undefined>;
  }): Suggestion => {
    const p = feature.properties;
    const label = [p.name, p.street, p.housenumber, p.postcode, p.city, p.country]
      .filter(Boolean)
      .join(', ');
    return { label, lat: feature.geometry.coordinates[1], lon: feature.geometry.coordinates[0] };
  };

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5&lang=de`
      );
      const data = await res.json();
      const items: Suggestion[] = (data.features ?? []).map(toSuggestion);
      setSuggestions(items);
      setOpen(items.length > 0);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedRef.current = false;
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (s: Suggestion) => {
    selectedRef.current = true;
    setQuery(s.label);
    setSuggestions([]);
    setOpen(false);
    onSelect(s.label, s.lat, s.lon);
  };

  const geocodeFallback = useCallback(
    async (text: string) => {
      if (!text || text.length < 3 || selectedRef.current) return;
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=1&lang=de`
        );
        const data = await res.json();
        if (data.features?.length > 0) {
          const s = toSuggestion(data.features[0]);
          setQuery(s.label);
          onSelect(s.label, s.lat, s.lon);
        }
      } catch {
        /* silent */
      }
    },
    [onSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else {
        geocodeFallback(query);
      }
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleBlur = () => {
    // Delay so mousedown on a suggestion fires before blur closes the list
    setTimeout(() => {
      setOpen(false);
      geocodeFallback(query);
    }, 150);
  };

  return (
    <div className="relative w-full">
      <MapPin
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10"
        size={18}
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(s)}
              className="px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-0"
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
