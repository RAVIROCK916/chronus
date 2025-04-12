import { LoaderCircle } from "lucide-react";

const loader = () => {
  return (
    <LoaderCircle
      className="animate-spin"
      size={16}
      strokeWidth={2}
      aria-hidden="true"
    />
  );
};

export default loader;
