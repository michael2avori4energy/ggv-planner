import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // If too close to top of viewport, show below
      setPosition(rect.top < 80 ? 'bottom' : 'top');
    }
    setVisible(true);
  };

  useEffect(() => {
    const hide = () => setVisible(false);
    if (visible) document.addEventListener('click', hide, { once: true });
    return () => document.removeEventListener('click', hide);
  }, [visible]);

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center ml-1.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      <Info
        size={13}
        className="text-slate-400 cursor-help hover:text-blue-400 transition-colors flex-shrink-0"
      />
      {visible && (
        <div
          className={`absolute z-50 w-64 bg-slate-800 text-white text-xs rounded-lg px-3 py-2.5 shadow-xl leading-relaxed pointer-events-none ${
            position === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              : 'top-full left-1/2 -translate-x-1/2 mt-2'
          }`}
        >
          {text}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 ${
              position === 'top' ? 'top-full -translate-y-1' : 'bottom-full translate-y-1'
            }`}
          />
        </div>
      )}
    </div>
  );
};
