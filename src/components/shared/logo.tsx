import Image from "next/image";

const Logo = () => {
  return (
    <figure>
      <Image
        src="/favicon.ico"
        width={24}
        height={24}
        className="h-6 w-6"
        alt="logo"
      />
    </figure>
  );
};
export default Logo;
