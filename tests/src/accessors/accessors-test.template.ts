import type { z, ZodSchema } from "zod";

type Schema = ZodSchema;

export type SchemaDemos<S extends Schema> = {
  fromJson: (schema: Schema) => z.ZodEffects<z.ZodString, any, string>;
  user: S;
};

export abstract class AccessorsTestTemplate<S extends Schema> {
  protected constructor(
    protected readonly schemaLibName: string,
    private readonly schemaDemos: SchemaDemos<S>
  ) {}

  public getSchemaDemos = () => this.schemaDemos;
}
