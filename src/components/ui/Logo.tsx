interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const accentColor = variant === 'light' ? 'text-white/80' : 'text-brand-blue';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Placeholder logo mark */}
      <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center flex-shrink-0">
        <RoofIcon />
      </div>
      <div className="leading-none">
        <div className={`text-sm font-800 tracking-wider uppercase ${textColor}`} style={{ fontWeight: 800 }}>
          FIN KROVLYA
        </div>
        <div className={`text-[10px] font-medium tracking-wide ${accentColor}`} style={{ opacity: 0.7 }}>
          Кровельный Доктор
        </div>
      </div>
    </div>
  );
}

function RoofIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roof shape */}
      <path d="M9 2L1.5 8H3V15.5H15V8H16.5L9 2Z" fill="white" fillOpacity="0.95" />
      {/* Wave/water line */}
      <path d="M4 11.5C5 10.5 6 12.5 7 11.5C8 10.5 9 12.5 10 11.5C11 10.5 12 12.5 13 11.5" stroke="rgba(202,97,201,0.9)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
