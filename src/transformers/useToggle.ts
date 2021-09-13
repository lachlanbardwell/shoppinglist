import { useState } from 'react';

export const useToggle = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);
  const toggle = (currentValue: string) => {
    setValue((prev) => (typeof prev === 'string' ? prev : currentValue));
  };
  return [value, toggle];
};
