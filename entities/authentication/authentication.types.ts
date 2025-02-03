import { z } from "zod";
import { AuthenticationContracts } from "./authentication.dtos";

export type loginDto = z.infer<typeof AuthenticationContracts.loginContract>;
