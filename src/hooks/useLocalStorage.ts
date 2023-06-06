import { SetStateAction, useCallback, useState } from "react"

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    // Initialize the state
    try {
      const value = typeof window !== "undefined" && window.localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = useCallback((value: SetStateAction<T>) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value;
      window?.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error)
    }
  }, []);

  return [state, setValue] as const;
}