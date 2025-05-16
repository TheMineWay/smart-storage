import type { SmartStorageSchema } from "@types";

export abstract class AConnector {
  constructor(
    public readonly name: string,
    public readonly allowsObjectStorage: boolean = true
  ) {}

  /* IO */
  protected abstract rawGet(key: string): unknown | null;
  protected abstract rawSet(key: string, value: unknown): void;
  abstract remove(key: string): void;
  abstract clear(): void;

  /* Schema */
  parse<V>(schema: SmartStorageSchema<V>, value: unknown): V {
    if (!schema) return value as V;
    if ("parse" in schema) return schema.parse(value);
    if ("cast" in schema) return schema.cast(value);
    //throw new UnsupportedSchemaTypeException(); // TODO
    throw new Error();
  }

  /* Accessors */
  get<V extends object>(key: string, schema?: SmartStorageSchema<V>): V | null {
    const value = this.rawGet(key);
    if (value === null) return null;
    try {
      return schema ? this.parse(schema, value) : (value as V);
    } catch {
      this.remove(key);
      return null;
    }
  }

  set<V extends object>(key: string, value: V, schema?: SmartStorageSchema<V>) {
    const parsed = schema ? this.parse(schema, value) : (value as V);
    this.rawSet(key, parsed);
    this.triggerOnChange(key);
  }

  /* Events */
  private onChangeEvents = new Map<number, CallableFunction>();

  public addOnChangeListener(
    callback: (key: string) => void
  ): CallableFunction {
    const newKey = new Date().getTime();
    this.onChangeEvents.set(newKey, callback);
    return () => {
      this.removeOnChangeListener(newKey);
    };
  }

  private removeOnChangeListener(key: number) {
    this.onChangeEvents.delete(key);
  }

  public triggerOnChange(key: string) {
    for (const [, callback] of this.onChangeEvents.entries()) {
      callback(key);
    }
  }
}
