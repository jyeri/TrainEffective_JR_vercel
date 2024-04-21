import { useState, useEffect } from 'react';

// useDebounce is a custom hook that delays the update of a value by a specified amount of time.
// This is useful for reducing the number of API calls when a value changes frequently, such as a search input.
function useDebounce(value, delay) {
  // State to store the debounced value. The useState hook is used to create
  // this state variable and the function to update it.
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Use the useEffect hook to update the debounced value after the specified delay
  // whenever the input value or delay changes.
  useEffect(() => {
    // Create a timeout to update the debounced value after the delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that clears the timeout. This function will be called
    // when the component unmounts or before the next time the effect runs.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  // Return the debounced value.
  return debouncedValue;
}

export default useDebounce;
