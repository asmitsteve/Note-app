import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search notes...",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={18} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search notes"
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}
