import type { SmartStorageSchema } from "@types";

export abstract class AConnector {
  /* IO */
  abstract rawGet(key: string): unknown | null;
  abstract rawSet(key: string, value: unknown): void;
  abstract remove(key: string): void;
  abstract clear(): void;

  /* Accessors */
  get<V>(key: string, schema: SmartStorageSchema<V>): V {
    const parsed = schema.parse(this.rawGet(key));
    return parsed;
  }
  set<V>(key: string, value: V, schema: SmartStorageSchema<V>) {
    const parsed = schema.parse(value);
    this.rawSet(key, parsed);
  }
}
