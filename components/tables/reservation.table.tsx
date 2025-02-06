import { useState } from "react";

import { Reservation } from "@/shared/types/reservation";
import { useReservation } from "@/shared/contexts/reservations.context";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { ReservationApi } from "@/entities/reservation/reservation.api";

export const ReservationSummaryTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const { reservations } = useReservation();

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedReservation) {
      setIsCancelling(true);
      const response = await ReservationApi.cancel(selectedReservation.user_id);

      if (!response.success) {
        setIsCancelling(false);
        return toast.error("Error");
      }

      reservations.delete(selectedReservation.id);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A summary of your current reservations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Activity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.get.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.activity.name}</TableCell>
              <TableCell>{reservation.activity.location}</TableCell>
              <TableCell>
                {format(
                  new Date(reservation.activity.start_datetime),
                  "dd MMMM yyyy",
                  { locale: fr }
                )}
              </TableCell>
              <TableCell>{reservation.activity.duration}</TableCell>
              <TableCell>
                <Badge variant={reservation.status ? "default" : "destructive"}>
                  {reservation.status ? "Confirmed" : "Cancelled"}
                </Badge>
              </TableCell>
              <TableCell>
                {reservation.status && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelClick(reservation)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your reservation for &quot;
              {selectedReservation?.activity.name}&quot;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              No, keep reservation
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Yes, cancel reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
