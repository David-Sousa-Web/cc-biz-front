import React from 'react';

interface InputNameProps {
  id: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

export function InputName({
  id,
  value,
  setValue,
  placeholder = 'Nome',
  minLength = 3,
  maxLength = 150,
  required = true
}: InputNameProps) {

  function nameIsValid(value: string): boolean {
    // Validação principal: permite apenas letras, espaços e caracteres acentuados
    if (/[^a-zA-ZÀ-ÿ\s]/gi.test(value)) return false;

    // Impede espaço no início
    if (value.startsWith(' ')) return false;

    // Impede múltiplos espaços consecutivos
    if (/(\s{2,})/.test(value)) return false;

    return true;
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    if (!nameIsValid(newValue)) {
      return;
    }

    setValue(e);
  }

  return (
    <input
      type="text"
      id={id}
      className="input"
      value={value}
      onChange={handleChangeName}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
}
