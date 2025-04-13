import { AConnector } from "../connector.abstract";

export class InMemoryConnector extends AConnector {
  private readonly storage: Map<string, unknown> = new Map();

  rawGet(key: string): unknown | null {
    const value = this.storage.get(key);
    if (value === undefined) {
      return null;
    }
    return value;
  }

  rawSet<V>(key: string, value: V): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
