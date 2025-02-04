"use client";

import { ROUTES } from "@/shared/constants/routes";
import { Button } from "../ui/button";
import Link from "next/link";

export const HomepageScreen: React.FC = () => {
  return (
    <div className="mx-auto relative max-w-[1300px]">
      {/* <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(209,250,229,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      /> */}

      <div className="flex flex-col gap-6 items-center mt-40">
        <p className="uppercase bg-gradient-to-r from-green-800 to-green-300 font-bold text-8xl text-center inline-block text-transparent bg-clip-text">
          book a moment in the forest
        </p>
        <p className="text-center text-muted-foreground mt-4 w-1/2">
          Discover the tranquility and beauty of nature. Escape the hustle and
          bustle of everyday life and immerse yourself in the serene
          surroundings of the forest.
        </p>

        <div className="flex items-center justify-center gap-4 w-full">
          <Button asChild className="font-medium">
            <Link href={ROUTES.ACTIVITIES}>Book a moment</Link>
          </Button>
          <Button asChild variant={"outline"} className="font-medium">
            <Link href={ROUTES.AUTH.REGISTER}>Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
