import { ZodTypeAny } from 'zod';

export const buildToolSchemas = <
  InputSchema extends ZodTypeAny,
  OutputSchema extends ZodTypeAny,
>(schemas: {
  input: InputSchema;
  output: OutputSchema;
}) => schemas;
