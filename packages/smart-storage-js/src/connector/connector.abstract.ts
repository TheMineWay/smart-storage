import type { EmptySmartStorageSchema } from "@types";

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
  parse<V extends object>(schema: EmptySmartStorageSchema, value: unknown): V {
    if (!schema) return value as V;
    return schema.parse(value) as V;
  }

  /* Accessors */
  get<V extends object>(
    key: string,
    schema?: EmptySmartStorageSchema
  ): V | null {
    const value = this.rawGet(key);
    if (value === null) return null;
    try {
      return schema ? this.parse<V>(schema, value) : (value as V);
    } catch {
      this.remove(key);
      return null;
    }
  }

  set<V extends object>(
    key: string,
    value: V,
    schema?: EmptySmartStorageSchema
  ) {
    const parsed = schema ? this.parse(schema, value) : value;
    this.rawSet(key, parsed);
    this.triggerOnChange(key);
  }

  /* Events */
  private onChangeEvents = new Map<string, CallableFunction>();

  public addOnChangeListener(
    callback: (key: string) => void
  ): CallableFunction {
    const newKey =
      new Date().getTime() +
      "_" +
      Math.random() +
      "_" +
      this.onChangeEvents.size;
    this.onChangeEvents.set(newKey, callback);
    return () => {
      this.removeOnChangeListener(newKey);
    };
  }

  private removeOnChangeListener(key: string) {
    this.onChangeEvents.delete(key);
  }

  public triggerOnChange(key: string) {
    for (const [, callback] of this.onChangeEvents.entries()) {
      callback(key);
    }
  }
}
