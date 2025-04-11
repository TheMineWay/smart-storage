import type { IConnector } from "../connector.interface";

export class SessionStorageConnector implements IConnector {
  get(key: string): any {
    return sessionStorage.getItem(key);
  }

  set(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
