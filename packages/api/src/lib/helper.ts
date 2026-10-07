export const isUniqueViolation = (error: unknown) =>
  (error as { cause?: { code?: string } })?.cause?.code === '23505';
