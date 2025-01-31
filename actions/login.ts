"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";

export const login=(values:z.infer<typeof LoginSchema>)=>{

}