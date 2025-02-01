"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register=async(values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields=RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error : "Invalid fields!"}
    }

    const {name,email,password}=validatedFields.data; 
    const hashedPassword=await bcrypt.hash(password,10);

    const existingUser=await getUserByEmail(email);

    if (existingUser) {
        return{error:"User with this email already exist."}
    }

    await db.user.create({
        data:{
            email,
            name,
            password:hashedPassword
        }
    })

    return {success:"Email Sent!."}
}