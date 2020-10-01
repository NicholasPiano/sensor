import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, timeout: number): T => {
  const [state, setState] = useState<typeof value>(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
};

export default useDebounce;
