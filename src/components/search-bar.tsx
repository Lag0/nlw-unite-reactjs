import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex h-9 w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
      <Search className="size-4 text-orange-400" />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder ? placeholder : "Buscar participante..."}
        className="h-auto flex-1 border-0 bg-transparent p-0 text-sm"
      />
    </div>
  );
};

export { SearchBar };
