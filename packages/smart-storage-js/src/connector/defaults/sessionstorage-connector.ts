import { AConnector } from "../connector.abstract";

export class SessionStorageConnector extends AConnector {
  constructor() {
    super("sessionStorage", false);
  }

  rawGet(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  rawSet(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
