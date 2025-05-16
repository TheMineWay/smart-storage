import { SmartStorageSchema } from "@types";
import { AConnector } from "./connector.abstract";
import { StoredMetadata } from "src/types/metadata/stored-metadata.type";

/**
 * Abstract class for string-based connectors.
 * Acts as a mapper from string-based storage to object-based storage.
 */
export abstract class AStringConnector extends AConnector {
  constructor(
    public readonly name: string,
    public readonly allowsObjectStorage: boolean = true
  ) {
    super(name, allowsObjectStorage);
  }

  /* Accessors */
  get<V extends object>(key: string, schema: SmartStorageSchema<V>): V | null {
    const raw = this.rawGet(key) as string | null;

    if (raw === null) return null;
    const parsed = JSON.parse(raw) as StoredMetadata<V>;

    try {
      return this.parse(schema, parsed.d);
    } catch {
      this.remove(key);
      return null;
    }
  }

  set<V extends object>(key: string, value: V, schema: SmartStorageSchema<V>) {
    const parsed = this.parse(schema, value);
    const data: StoredMetadata<V> = { d: parsed };

    this.rawSet(key, JSON.stringify(data));
  }
}
