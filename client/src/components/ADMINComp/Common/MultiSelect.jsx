import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function MultiSelect({ options, selected, onChange, placeholder = "Select..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue) => {
    if (selected.includes(optionValue)) {
      onChange(selected.filter(val => val !== optionValue));
    } else {
      onChange([...selected, optionValue]);
    }
  };

  const removeOption = (e, optionValue) => {
    e.stopPropagation();
    onChange(selected.filter(val => val !== optionValue));
  };

  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const val = inputValue.trim();
      if (!selected.includes(val)) {
        onChange([...selected, val]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && selected.length > 0) {
      // Optional: remove last item on backspace if input is empty
      onChange(selected.slice(0, -1));
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className="min-h-[42px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white cursor-text flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1">
          {selected.map(val => {
            const opt = options.find(o => o.value === val);
            return (
              <span key={val} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm">
                {opt ? opt.label : val}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-blue-900" 
                  onClick={(e) => removeOption(e, val)}
                />
              </span>
            );
          })}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            placeholder={selected.length === 0 ? placeholder : "Type and press Enter..."}
            className="flex-1 bg-transparent min-w-[120px] text-sm text-gray-700 focus:outline-none placeholder-gray-400"
          />
        </div>
        <ChevronDown size={16} className="text-gray-400 ml-2 shrink-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} />
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((opt) => (
            <div 
              key={opt.value}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-50 flex items-center gap-2 ${
                selected.includes(opt.value) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
              onClick={() => toggleOption(opt.value)}
            >
              <input 
                type="checkbox" 
                checked={selected.includes(opt.value)}
                readOnly
                className="rounded border-gray-300 text-[#162b4a] focus:ring-[#162b4a]"
              />
              {opt.label}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-400 text-center">No options available</div>
          )}
        </div>
      )}
    </div>
  );
}
