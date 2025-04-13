import {
  AccessorsTestTemplate,
  type SchemaDemos,
} from "../accessors-test.template";
import { z, type ZodSchema } from "zod";

type Schema = ZodSchema;

const SCHEMA_DEMOS: SchemaDemos<Schema> = {
  fromJson: z.string().transform((value) => JSON.parse(value)),
  user: z.object({
    name: z.string(),
    age: z.number().min(0).max(120),
  }),
};

export class ZodAccessorsTest extends AccessorsTestTemplate<Schema> {
  public constructor() {
    super("zod", SCHEMA_DEMOS);
  }
}
