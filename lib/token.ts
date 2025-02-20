import { db } from "./db";
import {v4 as uuidv4} from "uuid"
import { getPasswordResetTokenByEmail } from "@/data/passwordResetToekn";
import { getVerificationTokenByEmail } from "@/data/verificationToken";

export const generatePasswordResetToken=async(email:string)=>{
    const token =uuidv4()
    const expires=new Date(new Date().getTime() + 3600 * 1000);

    const existingPasswordResetToken=await getPasswordResetTokenByEmail(email);

    if (existingPasswordResetToken) {
        await db.passwordResetToken.delete({
            where:{
                id:existingPasswordResetToken.id
            }
        });
    }

    const PasswordResetToken=await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return PasswordResetToken;
}

export const generateVarificationToken=async (email:string)=>{
    const token =uuidv4()
    const expires=new Date(new Date().getTime() + 3600 * 1000);

    const existingToken=await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where:{
                id:existingToken.id
            }
        });
    }

    const verificationToken=await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return verificationToken;
}