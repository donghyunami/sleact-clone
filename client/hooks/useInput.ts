import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  ChangeEvent,
} from 'react';

type Handler = (e: ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
