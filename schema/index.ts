import * as z from "zod";

export const LoginSchema= z.object({
    email:z.string().email(),
    password:z.string()
})

export const RegisterSchema= z.object({
    email:z.string().email({
        message:"Email is Required."
    }),
    password:z.string().min(6,{
        message:"Password must have at least 6 character "
    }),
    name:z.string().min(1,{
        message:"Name is Required."
    })
})

