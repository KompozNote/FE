type ButtonProps = {
  variant?: "primary" | "ghost" | "icon" | "join" | "plus";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "rounded-xl font-medium transition flex items-center justify-center gap-2";
  const sizeStyle = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    icon: "p-2 bg-gray-200 hover:bg-gray-300 rounded-full",
    join: "bg-green-600 text-white hover:bg-green-700",
    plus: "bg-neutral-800 text-white hover:bg-neutral-700",
  }[variant];

  return (
    <button className={`${baseStyle} ${sizeStyle} ${variantStyle}`} {...props}>
      {icon}
      {children}
    </button>
  );
}
