import type { ZodSchema } from "zod";

type Schema = ZodSchema;

export type SchemaDemos<S extends Schema> = {
  user: S;
};

export abstract class AccessorsTestTemplate<S extends Schema> {
  protected constructor(
    protected readonly schemaLibName: string,
    private readonly schemaDemos: SchemaDemos<S>
  ) {}

  public getSchemaDemos = () => this.schemaDemos;
}
