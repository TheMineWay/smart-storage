import type { ZodSchema } from "zod";

export type SmartStorageSchema<V> = ZodSchema<V>;
export type EmptySmartStorageSchema = ZodSchema;
