"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { onboardingFormSchema } from "@/lib/definitions";

import { useMultiStepForm } from "@/hooks/useMultiStepForm";

type OnboardingFormProps = {
  form: UseFormReturn<z.infer<typeof onboardingFormSchema>>;
};

const OnboardingFormOne = ({ form }: OnboardingFormProps) => {
  const id = useId();

  return (
    <div>
      <Label htmlFor={id}></Label>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <h1 className="text-4xl">What should we call you?</h1>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  id={id}
                  className="peer pe-9"
                  placeholder="eg. John Doe"
                  {...field}
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                >
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

const steps = [OnboardingFormOne];

const OnboardingPage = () => {
  const id = useId();

  const {
    currentStep,
    step: StepComponent,
    next,
    back,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm<OnboardingFormProps>(steps);

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data } = useQuery(gql`
    query user {
      users {
        id
        name
        email
      }
    }
  `);

  // Handle Form Submission
  const onSubmit: SubmitHandler<z.infer<typeof onboardingFormSchema>> = (
    values,
  ) => {
    if (isLastStep) {
      console.log("Onboarding Complete", values);
      alert("Onboarding Complete!");
    } else {
      next();
    }
  };

  return (
    <div className="flex h-screen justify-center pt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-10">
          <StepComponent form={form} />
          {/* Navigation Buttons */}
          {/* <div className="mt-6 flex flex-row-reverse">
            <Button type="submit">
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ArrowRight className="ml-2" size={16} />}
            </Button>
            {!isFirstStep && (
              <Button type="button" variant="secondary" onClick={back}>
                <ArrowLeft className="mr-2" size={16} /> Back
              </Button>
            )}
          </div> */}
        </form>
      </Form>
    </div>
  );
};
export default OnboardingPage;
