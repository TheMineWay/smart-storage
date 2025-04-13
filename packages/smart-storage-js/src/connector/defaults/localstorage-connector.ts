import { AConnector } from "../connector.abstract";

export class LocalStorageConnector extends AConnector {
  constructor() {
    super("localStorage", false);
  }

  rawGet(key: string): unknown | null {
    return localStorage.getItem(key);
  }
  rawSet(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
