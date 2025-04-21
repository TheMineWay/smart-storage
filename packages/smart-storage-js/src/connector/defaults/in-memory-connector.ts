import { AConnector } from "../connector.abstract";

export class InMemoryConnector extends AConnector {
  constructor(private readonly storage: Map<string, unknown> = new Map()) {
    super("inMemory", true);
  }

  rawGet<V>(key: string): V | null {
    if (this.storage.has(key) === false) return null;
    const value = this.storage.get(key) as V;
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
