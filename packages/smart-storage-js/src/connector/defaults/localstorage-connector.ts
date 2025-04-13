import { AStringBasedConnector } from "../string-based-connector.abstract";

export class LocalStorageConnector extends AStringBasedConnector {
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
