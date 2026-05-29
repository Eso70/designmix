"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CUSTOM_ICONS_MAP } from "@/lib/config/icons";
import { Search, X } from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  customTrigger?: React.ReactNode;
}

export function IconPicker({ value, onChange, customTrigger }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const iconNames = Object.keys(CUSTOM_ICONS_MAP);

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return iconNames;
    const lowerQuery = searchQuery.toLowerCase();
    return iconNames.filter(name => name.toLowerCase().includes(lowerQuery));
  }, [searchQuery, iconNames]);

  // Mount check for portal - use setTimeout to avoid hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current && mounted) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, mounted]);

  const SelectedIcon = value && CUSTOM_ICONS_MAP[value] ? CUSTOM_ICONS_MAP[value] : CUSTOM_ICONS_MAP["Link"];

  const triggerContent = customTrigger ? (
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {customTrigger}
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex items-center justify-center shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:h-12 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-[#47C0B9]/30 transition-all cursor-pointer shadow-sm group bg-white"
      title="ئاڕاستەی ئایکۆن (Choose Icon)"
    >
      {value && CUSTOM_ICONS_MAP[value] ? (
        <SelectedIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      ) : (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-50 text-[10px] sm:text-xs text-gray-500 font-bold group-hover:bg-gray-100 transition-colors">ئایکۆن</div>
      )}
    </button>
  );

  if (!mounted) {
    return <div ref={popoverRef} className="relative">{triggerContent}</div>;
  }

  const modalContent = isOpen ? (
    <>
      <div
        className="fixed inset-0 z-100 bg-black/30 backdrop-blur-lg animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />
      
      <div 
        className="fixed z-101 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-125 md:w-150 max-w-150 max-h-[85vh] sm:max-h-150 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-100/50 shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col"
        dir="ltr"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-100/50 bg-linear-to-r from-white to-[#47C0B9]/10 shrink-0">
          <div className="flex items-center justify-between p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-700">
              ئایکۆن هەڵبژێرە (Choose Icon)
            </h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-xl p-2 bg-linear-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 text-slate-500 hover:text-slate-700 transition-all duration-300 border border-slate-100 shadow-sm hover:shadow"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 sm:p-4 border-b border-gray-100/50 bg-linear-to-br from-white to-slate-50/20 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#47C0B9] focus:ring-2 focus:ring-[#47C0B9]/30 transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors duration-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-linear-to-br from-white to-slate-50/20"
           style={{ 
             scrollbarWidth: "thin", 
             scrollbarColor: "rgba(156,163,175,0.5) transparent"
           }}>
           <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
             {filteredIcons.map((iconName) => {
               const Icon = CUSTOM_ICONS_MAP[iconName];
               const isSelected = value === iconName;
               return (
                 <button
                   key={iconName}
                   type="button"
                   onClick={() => {
                     onChange(iconName);
                     setIsOpen(false);
                   }}
                   className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                     isSelected 
                       ? "bg-linear-to-br from-[#47C0B9]/10 to-[#47C0B9]/20 text-[#47C0B9] ring-2 ring-[#47C0B9] shadow-sm" 
                       : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow"
                   }`}
                   title={iconName}
                 >
                   <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                   <span className="text-[9px] sm:text-[10px] w-full truncate text-center opacity-70">
                     {iconName.replace(/^(Fa|Si)/, '')}
                   </span>
                 </button>
               );
             })}
           </div>
           
           {filteredIcons.length === 0 && (
             <div className="text-center text-sm text-slate-500 py-12">
               No icons found.
             </div>
           )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-100/50 bg-white p-3 flex justify-between items-center shrink-0">
          <button
             type="button"
             onClick={() => {
               onChange("");
               setIsOpen(false);
             }}
             className="text-xs sm:text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Clear Icon
          </button>
          <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-lg">
            {filteredIcons.length} icons
          </span>
        </div>
      </div>
    </>
  ) : null;

  return (
    <div className="relative" ref={popoverRef} dir="ltr">
      {triggerContent}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </div>
  );
}
