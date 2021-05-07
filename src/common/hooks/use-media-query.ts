import { useLayoutEffect, useState } from 'react';

const useMediaQuery = (mediaQuery: string): boolean => {
  const [matches, setMatches] = useState(() => window.matchMedia(mediaQuery).matches);

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQuery]);

  return matches;
};

export default useMediaQuery;
