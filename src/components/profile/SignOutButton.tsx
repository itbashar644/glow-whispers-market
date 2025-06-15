
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  return (
    <div className="mt-8 flex justify-center">
      <Button variant="outline" onClick={onSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Выйти
      </Button>
    </div>
  );
};
