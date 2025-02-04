import { GalleryVerticalEnd } from "lucide-react";
import { TypographyH4 } from "../typography";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/supabase-server-side";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutAction } from "@/entities/authentication/actions/logout.actions";

export const AppHeader: React.FC = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const isUserNotAuthenticated = error || !data?.user;

  return (
    <header className="p-4 flex w-100 justify-between">
      <Link href={ROUTES.HOMEPAGE} className="flex items-center gap-2">
        <div className="flex items-center aspect-square size-8 space-x-2 text-white bg-green-500 rounded-full p-2">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <TypographyH4>BANKO</TypographyH4>
      </Link>

      <div></div>

      <div className="flex gap-1">
        {isUserNotAuthenticated ? (
          <>
            <Button asChild>
              <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
            </Button>
            <Button asChild variant={"ghost"}>
              <Link href={ROUTES.AUTH.REGISTER}>Register</Link>
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>LB</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={ROUTES.ACCOUNT}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Mes bancs</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem onClick={logoutAction}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
