"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { requester } from "@/lib/requester";
import { Profile, User } from "@/shared/types/users";

export const UpdateUserForm: React.FC<{
  userId: string;
  profile: Profile;
}> = ({ userId, profile }) => {
  const [user, setUser] = useState({
    firstName: profile.first_name,
    lastName: profile.last_name,
    dateOfBirth: profile.date_of_birth
      ? new Date(profile.date_of_birth)
      : undefined,
    description: profile.description,
  });

  const handleChange = (field: string, value: string | Date | undefined) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      user.firstName === "" &&
      user.lastName === "" &&
      user.dateOfBirth === undefined &&
      user.description === ""
    ) {
      return toast.error("You have changed no field");
    }

    try {
      const response = await requester().put<User>(`/api/users/${userId}`, {
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          date_of_birth: user.dateOfBirth,
          description: user.description,
        },
      });

      if (response.success) {
        toast.success("User updated successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the user");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={user.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={user.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Date de naissance</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {user.dateOfBirth ? (
                format(user.dateOfBirth, "dd MMMM yyyy", { locale: fr })
              ) : (
                <span>Choisir une date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={user.dateOfBirth}
              onSelect={(date) => handleChange("dateOfBirth", date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={user.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="min-h-32"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
};
