interface OptionCardProps {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left
        border-2 transition-all duration-200 active:scale-[0.97]
        ${
          selected
            ? 'border-brand-blue bg-brand-gradient-soft shadow-md shadow-brand-blue/10'
            : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/60'
        }
      `}
    >
      {icon && (
        <span className="text-xl flex-shrink-0 w-8 text-center leading-none">{icon}</span>
      )}
      <span
        className={`text-base font-medium leading-snug ${
          selected ? 'text-brand-blue' : 'text-gray-800'
        }`}
      >
        {label}
      </span>
      <span className="ml-auto flex-shrink-0">
        <span
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
            ${selected ? 'border-brand-blue bg-brand-blue' : 'border-gray-300 bg-white'}
          `}
        >
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}
