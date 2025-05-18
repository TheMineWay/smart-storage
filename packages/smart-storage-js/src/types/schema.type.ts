import type { Schema as YupSchema } from "yup";
import { ZodObject, ZodRawShape } from "zod";

type ZodSchema = ZodObject<ZodRawShape>;

export type SmartStorageSchema<V> = ZodSchema | YupSchema<V>;
export type EmptySmartStorageSchema = ZodSchema | YupSchema;
