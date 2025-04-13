import type { ZodSchema } from "zod";
import type { Schema as YupSchema } from "yup";

export type SmartStorageSchema<V> = ZodSchema<V> | YupSchema<V>;
