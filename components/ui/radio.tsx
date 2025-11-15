import { InputHTMLAttributes, forwardRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
          <input ref={ref} type="radio" className="peer sr-only" {...props} />
          <div className="w-6 h-6 rounded-full border-2 border-neutral-500 peer-checked:border-primary-500 transition-all dark:border-neutral-600 dark:peer-checked:border-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 absolute scale-0 peer-checked:scale-100 transition-transform duration-200 dark:bg-primary-500"></div>
        </div>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {label}
              </p>
            )}
            {description && (
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";
