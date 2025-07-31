import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
  broken?: boolean; // Intentional bug prop
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  broken = false,
  className = '',
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Intentional bug: broken buttons sometimes don't respond to clicks
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (broken && Math.random() > 0.7) {
      console.log('Button click ignored due to bug');
      return;
    }
    
    // Another bug: sometimes logs wrong values
    if (Math.random() > 0.8) {
      console.log('Wrong button clicked:', 'undefined');
    } else {
      console.log('Button clicked:', children);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2"></div>
      )}
      {children}
    </button>
  );
};

export default Button;