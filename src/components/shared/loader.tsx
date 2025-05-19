import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <LoaderCircle
      className="animate-spin"
      size={16}
      strokeWidth={2}
      aria-hidden="true"
    />
  );
};

export default Loader;
