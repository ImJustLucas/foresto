import { RegisterForm } from "@/components/forms/register.form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FORESTO - Register",
};

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 pt-36">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
