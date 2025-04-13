import type { SmartStorageSchema } from "@types";

export abstract class AConnector {
  constructor(
    public readonly name: string,
    public readonly allowsObjectStorage: boolean = true
  ) {}

  /* IO */
  abstract rawGet(key: string): unknown | null;
  abstract rawSet(key: string, value: unknown): void;
  abstract remove(key: string): void;
  abstract clear(): void;

  /* Schema */
  parse<V>(schema: SmartStorageSchema<V>, value: unknown): V {
    if ("parse" in schema) return schema.parse(value);
    if ("cast" in schema) return schema.cast(value);
    //throw new UnsupportedSchemaTypeException(); // TODO
    throw new Error();
  }

  /* Accessors */
  get<V extends object>(key: string, schema: SmartStorageSchema<V>): V {
    return this.parse(schema, this.rawGet(key));
  }

  set<V extends object>(key: string, value: V, schema: SmartStorageSchema<V>) {
    const parsed = this.parse(schema, value);
    this.rawSet(key, parsed);
  }
}
