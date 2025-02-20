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
import { LoginSchema } from "@/schema";

import CardWrapper from "./card-wrapper";
import { Input } from "../input";
import { Button } from "../button";
import FormError from "../form-error";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import FormSucces from "../form-succes";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const searchParams=useSearchParams()
  const urlError=searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" :""; 
  
  const [error,setError]=useState<string | undefined>("");
  const [success,setSuccess]=useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
        login(values).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
    })
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backBtnLabel="Don't have an account!?"
      backBtnHref="/auth/register"
      showSocial
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
                  <Button size="sm" variant="link" asChild className="px-0 font-normal">
                    <Link href="/auth/reset">Forgot Password!?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error || urlError} />
          <FormSucces message={success}/>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
