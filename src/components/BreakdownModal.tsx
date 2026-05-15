import { X } from 'lucide-react';
import { Tooltip } from './Tooltip';

export interface BreakdownItem {
  key: string;
  label: string;
  tooltip: string;
}

interface BreakdownModalProps {
  isOpen: boolean;
  title: string;
  hint: string;
  unit: string;
  step: number;
  items: BreakdownItem[];
  values: Record<string, number>;
  totalLabel: string;
  applyLabel: string;
  cancelLabel: string;
  onChangeValue: (key: string, value: number) => void;
  onApply: (total: number) => void;
  onClose: () => void;
}

export const BreakdownModal: React.FC<BreakdownModalProps> = ({
  isOpen,
  title,
  hint,
  unit,
  step,
  items,
  values,
  totalLabel,
  applyLabel,
  cancelLabel,
  onChangeValue,
  onApply,
  onClose,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (values[item.key] ?? 0), 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-5">{hint}</p>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="flex-1 flex items-center text-sm text-slate-700 min-w-0">
                <span className="truncate">{item.label}</span>
                <Tooltip text={item.tooltip} />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  step={step}
                  min="0"
                  value={values[item.key] ?? 0}
                  onChange={(e) => onChangeValue(item.key, Number(e.target.value))}
                  className="w-28 px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                />
                <span className="text-xs text-slate-400 w-8">{unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            {totalLabel}:{' '}
            <span className="text-blue-600">
              {total.toLocaleString('de-DE')} {unit}
            </span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => onApply(total)}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {applyLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
