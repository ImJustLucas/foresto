"use client";

import { ROUTES } from "@/shared/constants/routes";
import { Button } from "../ui/button";
import Link from "next/link";

export const HomepageScreen: React.FC = () => {
  return (
    <div className="">
      {/* <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(209,250,229,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      /> */}

      <div className="mx-auto relative max-w-[1300px] h-screen flex flex-col justify-center gap-6 items-center">
        <p className="uppercase bg-gradient-to-r from-green-800 to-green-300 font-bold text-8xl text-center inline-block text-transparent bg-clip-text">
          book a moment in the forest
        </p>
        <p className="text-center text-muted-foreground mt-4 w-1/2">
          Discover the tranquility and beauty of nature. Escape the hustle and
          bustle of everyday life and immerse yourself in the serene
          surroundings of the forest. 🌳
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

      <div className="relative h-[700px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
        >
          <source src={"/forest-video.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            Experience the magic of the forest
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in-up">
            Reconnect with nature and find peace within yourself.
          </p>
          <Button size="lg" className="animate-fade-in">
            Create a account
          </Button>
        </div>
      </div>
    </div>
  );
};
