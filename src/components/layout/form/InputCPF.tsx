import React from 'react';
import type { ValidationErrors } from '../../form';

interface InputCPFProps {
  id: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}


export function InputCPF({
  id,
  value,
  setValue,
  placeholder = '',
  maxLength = 14,
  required = true,
  validationErrors,
  setValidationErrors
}: InputCPFProps) {

  const formatCPF = (value: string): string => {
    value = value.replace(/\D/g, '');
    
    if (value.length <= 3) {
      // Não faz nada
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
    } else if (value.length <= 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    return value;
  };

  const validateCPF = (cpf: string): boolean => {
    setValidationErrors(prev => ({ ...prev, cpf: [] }));
    const numericCPF = cpf.replace(/\D/g, '');

    if (numericCPF.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(numericCPF)) {
      setValidationErrors(prev => ({ ...prev, cpf: ['CPF inválido'] }));
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numericCPF.charAt(i)) * (10 - i);
    }

    let rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(numericCPF.charAt(9))) {
      setValidationErrors(prev => ({ ...prev, cpf: ['CPF inválido'] }));
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numericCPF.charAt(i)) * (11 - i);
    }

    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(numericCPF.charAt(10))) {
      setValidationErrors(prev => ({ ...prev, cpf: ['CPF inválido'] }));
      return false;
    }

    return true;
  };

  const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    validateCPF(newValue);
    setValue(e); // setValue deve lidar com o valor formatado se necessário
  };

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        id={id}
        className={`input ${validationErrors.cpf.length > 0 ? 'error' : ''}`}
        value={formatCPF(value)}
        onChange={handleChangeCPF}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
}
