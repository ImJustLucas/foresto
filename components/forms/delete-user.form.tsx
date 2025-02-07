"use client";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { requester } from "@/lib/requester";
import { User } from "@/shared/types/users";

export const DeleteUserForm: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await requester().delete<User>(`/api/users/${userId}`);

      if (response.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the user");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-center w-100 font-semibold">DANGER ZONE</p>
      <Button type="submit" variant={"destructive"} className="w-full">
        DELETE ACCOUNT
      </Button>
    </form>
  );
};
