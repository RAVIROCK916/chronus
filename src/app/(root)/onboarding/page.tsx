"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";

const OnboardingPage = () => {
  const id = useId();
  const [name, setName] = useState<string>("");
  const { data } = useQuery(gql`
    query user {
      users {
        id
        name
        email
      }
    }
  `);
  const [updateNameOfUser] = useMutation(gql`
    mutation user($id: ID!, $name: String!) {
      updateNameOfUser(id: $id, name: $name) {
        id
        name
        email
      }
    }
  `);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = data.users[0].id;
    updateNameOfUser({
      variables: {
        id,
        name,
      },
    });
  };

  return (
    <div className="flex h-screen justify-center pt-20">
      <form onSubmit={handleSubmit} className="space-y-4 p-10">
        <Label htmlFor={id}>
          <h1 className="text-4xl">What should we call you?</h1>
        </Label>
        <div className="relative">
          <Input
            id={id}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer pe-9"
            placeholder="eg. John Doe"
            type="search"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default OnboardingPage;
