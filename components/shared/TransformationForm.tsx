"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CustomField } from "./CustomField";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"></form>
      <CustomField
        control={form.control}
        name="title"
        formLabel="Image Title"
        className="w-full"
        render={({ field }) => <Input {...field} className="input-field" />}
      />
      {type === "fill" && (
        <CustomField
          control={form.control}
          name="aspectRatio"
          formLabel="Aspect Ratio"
          className="w-full"
          render={({ field }) => (
            <Select
              onValueChange={(value) =>
                onSelectFieldHandler(value, field.onChange)
              }
              value={field.value}
            >
              <SelectTrigger className="select-field">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(aspectRatioOptions).map((key) => (
                  <SelectItem key={key} value={key} className="select-item">
                    {aspectRatioOptions[key as AspectRatioKey].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
    </Form>
  );
};

export default TransformationForm;
