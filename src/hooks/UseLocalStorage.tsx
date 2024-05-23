import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {

  /*
    Este es el hook de localStorage que iba a usar por tiempo no lo implente pero esta listo
    para usarse, el guarda valores con el type generico de TypeScript, tocaria tener un type de quota
    para poder usarlo comodamente. 
  */

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;