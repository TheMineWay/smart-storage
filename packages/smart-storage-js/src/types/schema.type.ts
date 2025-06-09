import type { z } from "zod";

export type SmartStorageSchema<V extends z.ZodRawShape> = z.ZodObject<V>;
export type EmptySmartStorageSchema = z.ZodObject<z.ZodRawShape>;
