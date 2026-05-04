import { z } from 'zod';

export const departmentValidation = z.object({
  name: z.string().min(1, 'Department name is required').max(50, 'Name is too long'),
  description: z.string().max(200, 'Description is too long').optional(),
});

export type DepartmentValidationData = z.infer<typeof departmentValidation>;
