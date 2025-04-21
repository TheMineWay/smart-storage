import { AStringConnector } from "../string-connector.abstract";

export class LocalStorageConnector extends AStringConnector {
  constructor() {
    super("localStorage", false);
  }

  rawGet(key: string): string | null {
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
