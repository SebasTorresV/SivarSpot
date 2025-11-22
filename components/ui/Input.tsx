import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, icon, type, ...props }, ref) => {
    return (
        <div className="relative">
            {icon && <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>}
            <input
                type={type}
                className={`w-full p-3 ${icon ? 'pl-10' : 'pl-4'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm ${className}`}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
