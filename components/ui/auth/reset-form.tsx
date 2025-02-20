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
import { ResetSchema } from "@/schema";
import CardWrapper from "./card-wrapper";
import { Input } from "../input";
import { Button } from "../button";
import FormError from "../form-error";
import { useState, useTransition } from "react";
import FormSucces from "../form-succes";
import { reset } from "@/actions/reset";

const ResetForm = () => {
  
  const [error,setError]=useState<string | undefined>("");
  const [success,setSuccess]=useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
        reset(values).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
    })
  };

  return (
    <CardWrapper
      headerLabel="Forgot Your Password!?"
      backBtnLabel="Back to Login"
      backBtnHref="/auth/login"
    >
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="User123@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </div>

          <FormError message={error} />
          <FormSucces message={success}/>
          <Button type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
