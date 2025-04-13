export class UnsupportedSchemaTypeException extends Error {
  public constructor() {
    super(`Unsupported schema type`);
    this.name = "UnsupportedSchemaTypeException";
  }
}
