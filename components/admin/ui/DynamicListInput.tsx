"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface DynamicListInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function DynamicListInput({
  value,
  onChange,
  placeholder = "Add item...",
  label,
}: DynamicListInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" onClick={addItem} size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {value.length > 0 && (
        <ul className="space-y-2 mt-2">
          {value.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
            >
              <span className="flex-1 text-sm">{item}</span>
              <Button
                type="button"
                onClick={() => removeItem(index)}
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-slate-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
