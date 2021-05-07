/* Wrapper for LOGS */
/* eslint-disable */
export default class Logger {
  static error(...args: any[]) {
    console.error(args);
  }

  static warning(...args: any[]) {
    console.warn(...args);
  }

  static info(...args: any[]) {
    console.info(...args);
  }
}
