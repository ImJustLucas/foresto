"use client";

import { useState, useEffect } from "react";
import { TreeDeciduous } from "lucide-react";
import { TypographyH4 } from "../typography";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "../ui/button";
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
import { createSupabaseClientSide } from "@/lib/supabase/supabase-client-side";

export const AppHeader: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isUserNotAuthenticated, setIsUserNotAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createSupabaseClientSide();
      const { data, error } = await supabase.auth.getUser();

      setIsUserNotAuthenticated(Boolean(error || !data?.user));
    };

    fetchData();

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`p-4 top-2 left-0 right-0 fixed flex w-full mx-auto max-w-[1280px] justify-between items-center transition-all duration-300 z-10 ${
        hasScrolled ? "bg-white/50 backdrop-blur-md shadow-md rounded-lg" : ""
      }`}
    >
      <Link href={ROUTES.HOMEPAGE} className="flex items-center gap-2 flex-1">
        <div className="flex items-center aspect-square size-8 space-x-2 text-white bg-green-500 rounded-full p-2">
          <TreeDeciduous className="size-4" />
        </div>
        <TypographyH4>FORESTO</TypographyH4>
      </Link>

      <div className="flex-2">
        <Button asChild variant={"ghost"} className="font-semibold">
          <Link href={ROUTES.ACTIVITIES}>Book a moment 🌳</Link>
        </Button>
        {Boolean(!isUserNotAuthenticated) && (
          <Button asChild variant={"ghost"} className="font-semibold">
            <Link href={ROUTES.BOOKING}>My bookings 🪨</Link>
          </Button>
        )}
      </div>

      <div className="flex gap-1 justify-end flex-1">
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
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ACCOUNT}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.BOOKING}>My bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutAction}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
