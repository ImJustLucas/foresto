"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Reservation } from "../types/reservation";
import { createSupabaseClientSide } from "@/lib/supabase/supabase-client-side";

type Reservations = Reservation[];

interface ReservationContextProps {
  reservations: {
    init: (reservations: Reservations) => void;
    get: Reservations;
    addOne: (reservation: Reservation) => void;
    delete: (id: string) => void;
  };
}

const ReservationContext = createContext<ReservationContextProps | undefined>(
  undefined
);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const supabase = createSupabaseClientSide();
  const [_reservations, setReservations] = useState<Reservations>([]);

  const initReservations = (reservations: Reservations) => {
    setReservations(reservations);
  };

  const addReservation = (reservation: Reservation) => {
    setReservations([..._reservations, reservation]);
  };

  const deleteReservation = (id: string) => {
    setReservations(
      _reservations.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations: {
          init: initReservations,
          get: _reservations,
          addOne: addReservation,
          delete: deleteReservation,
        },
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationContextProps => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};
