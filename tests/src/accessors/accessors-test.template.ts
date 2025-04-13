import type { ZodEffects, ZodSchema, ZodString } from "zod";

type Schema = ZodSchema;

export type SchemaDemos<S extends Schema> = {
  fromJson: ZodEffects<ZodString>;
  user: S;
};

export abstract class AccessorsTestTemplate<S extends Schema> {
  protected constructor(
    protected readonly schemaLibName: string,
    private readonly schemaDemos: SchemaDemos<S>
  ) {}

  public getSchemaDemos = () => this.schemaDemos;
}
