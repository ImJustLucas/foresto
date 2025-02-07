"use client";

import { useReservation } from "@/shared/contexts/reservations.context";
import { ReservationSummaryTable } from "../tables/reservation.table";
import { Reservation } from "@/shared/types/reservation";
import { useEffect } from "react";

type BookingScreenProps = {
  reservations: Reservation[];
};

export const BookingScreen: React.FC<BookingScreenProps> = ({
  reservations: _reservations,
}) => {
  const { reservations } = useReservation();

  useEffect(() => {
    reservations.init(_reservations);
  }, []);

  return (
    <div className="container mx-auto pt-28 px-4 py-8">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-3xl font-bold text-center">All my Bookings 🪨</h1>
      </div>

      <ReservationSummaryTable />
    </div>
  );
};
