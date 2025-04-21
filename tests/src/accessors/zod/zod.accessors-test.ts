import {
  AccessorsTestTemplate,
  type SchemaDemos,
} from "../accessors-test.template";
import { z, type ZodSchema } from "zod";

type Schema = ZodSchema;

const SCHEMA_DEMOS: SchemaDemos<Schema> = {
  user: z.object({
    name: z.string(),
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? Number(val) : val))
      .refine((val) => !isNaN(val))
      .refine((val) => val >= 0 && val <= 120),
  }),
};

export class ZodAccessorsTest extends AccessorsTestTemplate<Schema> {
  public constructor() {
    super("zod", SCHEMA_DEMOS);
  }
}
