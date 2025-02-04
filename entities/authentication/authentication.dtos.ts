import { z } from "zod";

const loginContract = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .min(5, { message: "Must be 5 or more characters long" }),
});

export const AuthenticationContracts = {
  loginContract,
};
