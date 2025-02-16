import React from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const LoaderButton = () => {
  return (
    <Button disabled className="w-full">
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
};

export default LoaderButton;
