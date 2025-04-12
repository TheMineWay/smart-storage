import type { IConnector } from "../connector.interface";

export class SessionStorageConnector implements IConnector {
  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
