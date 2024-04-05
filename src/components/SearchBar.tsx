import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
      <Search className="size-4 text-emerald-300" />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Buscar participante..."
        className="h-auto flex-1 border-0 bg-transparent p-0 text-sm"
      />
    </div>
  );
};

export default SearchBar;
