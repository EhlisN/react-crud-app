import { useMemo } from 'react';

export const useSearch = (array: any[], value: string, field: string) => {
  const searched = useMemo(() => {
    if (value) {
      return array.filter((user) =>
        user[field].toLowerCase().includes(value.toLowerCase())
      );
    }
    return array;
  }, [array, value, field]);
  return searched;
};
