/* eslint-disable */
export function throttle(fn: (...rest: any[]) => void, wait: number) {
  let ready = true;

  return (...args: any[]) => {
    if (!ready) {
      return;
    }
    ready = false;
    fn(...args);
    setTimeout(() => {
      ready = true;
    }, wait);
  };
}

export function debounce(fn: (...rest: any[]) => void, timeout: number) {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
