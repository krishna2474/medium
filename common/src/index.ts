import z, { string } from "zod";

export const signupInputs = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().email(),
  password: z.string().min(6),
});

export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInputs = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInputs = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type SignupInputs = z.infer<typeof signupInputs>;
export type SigninInputs = z.infer<typeof signinInput>;
export type CreateBlogInputs = z.infer<typeof createBlogInputs>;
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>;
