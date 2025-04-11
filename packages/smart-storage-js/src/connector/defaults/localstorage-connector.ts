import type { IConnector } from "../connector.interface";

export class LocalStorageConnector implements IConnector {
  get(key: string): any {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
