interface AlertProps {
  variant?: "error" | "success" | "warning" | "info";
  children: React.ReactNode;
}

export const Alert = ({ variant = "error", children }: AlertProps) => {
  const variants = {
    error:
      "bg-red-100 dark:bg-red-900/20 border-red-500 text-red-500 dark:text-red-400",
    success:
      "bg-green-100 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500 text-yellow-700 dark:text-yellow-400",
    info: "bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400",
  };

  return (
    <div className={`border px-4 py-3 rounded-lg text-sm ${variants[variant]}`}>
      {children}
    </div>
  );
};

