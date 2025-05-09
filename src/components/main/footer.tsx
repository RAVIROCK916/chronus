import { socials } from "@/constants";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center border-t">
      <div className="flex w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Ravi Teja Pedapudi
            </a>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={20} />
          </Link>
          <Link href={socials.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
