import { LoginForm } from "@/components/forms/login.form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FORESTO - Login",
};

export default function LoginPage() {
  return (
    <div className="flex w-full items-center justify-center p-6 pt-36">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
