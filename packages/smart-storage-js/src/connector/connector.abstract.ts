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
    if ("parse" in schema) return schema.parse(value);
    if ("cast" in schema) return schema.cast(value);
    //throw new UnsupportedSchemaTypeException(); // TODO
    throw new Error();
  }

  /* Accessors */
  get<V extends object>(key: string, schema?: SmartStorageSchema<V>): V | null {
    const value = this.rawGet(key);
    if (value === null) return null;
    return schema ? this.parse(schema, value) : (value as V);
  }

  set<V extends object>(key: string, value: V, schema?: SmartStorageSchema<V>) {
    const parsed = schema ? this.parse(schema, value) : (value as V);
    this.rawSet(key, parsed);
    this.triggerOnChange();
  }

  /* Events */
  private onChangeEvents = new Map<number, CallableFunction>();

  public addOnChangeListener(callback: CallableFunction): number {
    const newKey = new Date().getTime();
    this.onChangeEvents.set(newKey, callback);
    return newKey;
  }

  public removeOnChangeListener(key: number) {
    this.onChangeEvents.delete(key);
  }

  public triggerOnChange() {
    for (const [, callback] of this.onChangeEvents.entries()) {
      callback();
    }
  }
}
