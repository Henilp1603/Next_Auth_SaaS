"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../form";
import { NewPasswordSchema } from "@/schema";
import CardWrapper from "./card-wrapper";
import { Input } from "../input";
import { Button } from "../button";
import FormError from "../form-error";
import { useState, useTransition } from "react";
import FormSucces from "../form-succes";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
        newPassword(values,token).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
    })
  };

  return (
    <CardWrapper
      headerLabel="Enter Your New Password."
      backBtnLabel="Back to Login"
      backBtnHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSucces message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
