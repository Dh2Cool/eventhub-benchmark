interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle = ({ checked, onChange, label, disabled = false, size = 'md' }: ToggleProps) => {
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      circle: 'w-3 h-3',
      translate: checked ? 'translate-x-4' : 'translate-x-0',
    },
    md: {
      switch: 'w-11 h-6',
      circle: 'w-5 h-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0',
    },
    lg: {
      switch: 'w-14 h-7',
      circle: 'w-6 h-6',
      translate: checked ? 'translate-x-7' : 'translate-x-0',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`${currentSize.switch} relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span
          aria-hidden="true"
          className={`${currentSize.circle} ${currentSize.translate} pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </button>
      {label && (
        <span className={`ml-3 text-sm ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;