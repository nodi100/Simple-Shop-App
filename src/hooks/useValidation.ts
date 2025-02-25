"use client";

import { useState } from "react";
import { z } from "zod";

export function useValidation<T>(schema: z.ZodSchema<T>) {
  const [error, setError] = useState<string | null>(null);

  const validate = (input: unknown) => {
    try {
      const validatedInput = schema.parse(input);
      setError(null);
      return validatedInput;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Validation failed");
      }
      return null;
    }
  };

  return { error, validate };
}
