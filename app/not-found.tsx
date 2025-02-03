import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-green-600">404</h1>
        <h2 className="mb-8 text-4xl font-bold text-green-800">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-green-700">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
          <Link href={ROUTES.HOMEPAGE}>Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
