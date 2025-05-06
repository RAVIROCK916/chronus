import { Bell, SettingsIcon } from "lucide-react";
import Searchbar from "./search-bar";
import PaddingContainer from "@/components/shared/padding-container";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between gap-x-4">
      <div className="flex items-center gap-x-8">
        <Searchbar className="w-80" />
        <div className="flex gap-x-6 *:cursor-pointer *:rounded">
          <div>
            <Bell
              size={18}
              className="text-text-muted transition-colors hover:text-foreground"
            />
          </div>
          <div>
            <SettingsIcon
              size={18}
              className="text-text-muted transition-colors hover:text-foreground"
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default Header;
