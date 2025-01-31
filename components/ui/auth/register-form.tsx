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
import { RegisterSchema } from "@/schema";

import CardWrapper from "./card-wrapper";
import { Input } from "../input";
import { Button } from "../button";
import FormError from "../form-error";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import FormSucces from "../form-succes";

const RegisterForm = () => {
  const [error,setError]=useState<string | undefined>("");
  const [success,setSuccess]=useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:" "
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
      register(values).then((data)=>{
          setError(data.error);
          setSuccess(data.success);
        })
    })
  };
  return (
    <CardWrapper
      headerLabel="Create an account"
      backBtnLabel="Already have an account!?"
      backBtnHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="User123"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Your Password"
                      type="password"
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
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
