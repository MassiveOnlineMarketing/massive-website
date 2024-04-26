'use client'

import React from 'react'
import { useSession } from 'next-auth/react';
import { useState, useTransition } from "react";

// Form 
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralUserSettingsSchema } from '@/auth/schema';
import { FormError } from '@/auth/forms/form-error';
import { FormSuccess } from '@/auth/forms/form-success';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Comp
import { Button } from '@/components/ui/button';

// Auth
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { updateUserDetails } from '@/auth/actions/settings';

const GeneralUserSettingsForm = () => {
  const currentUser = useCurrentUser();
  const provider = currentUser?.loginProvider;
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof GeneralUserSettingsSchema>>({
    resolver: zodResolver(GeneralUserSettingsSchema),
    defaultValues: {
      name: currentUser?.name || undefined,
      email: currentUser?.email || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof GeneralUserSettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await updateUserDetails(values);
      setError(data?.error);
      setSuccess(data?.success);
      if (data?.success) {
        if (data.data) {
          // Set the new user details in the form
          form.reset({
            name: data.data.name || undefined,
            email: data.data.email || undefined,
          })
          // Update the session --> Auth.ts
          update({ name: data.data.name, email: data.data.email })
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-10 space-y-[16px]">
          <p className='text-base leading-6 font-semibold text-gray-800'>Personal</p>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="******"
                    type="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="******"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        {provider && provider !== 'google' && (
          <div className="mb-10 space-y-[16px]">
            <p className='text-base leading-6 font-semibold text-gray-800'>Change Password</p>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      // placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      // placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      // placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          disabled={isPending}
          type="submit"
          className="w-fit px-6 py-3 bg-primary-500 text-sm leading-5 font-semibold text-white"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  )
}

export default GeneralUserSettingsForm