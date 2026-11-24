import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormField({
  id,
  label,
  icon: Icon,
  error,
  type = "text",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={`input-wrap ${error ? "has-error" : ""}`}>
        {Icon && <Icon size={18} className="input-icon" />}
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="input-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
