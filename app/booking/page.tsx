import { BookingScreen } from "@/components/screens/booking";
import { ReservationApi } from "@/entities/reservation/reservation.api";
import { getProfileById } from "@/entities/users/user.api";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

export default async function BookingPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const { data: profile } = await getProfileById(data.user.id);

  if (!profile) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const responseReservations = await ReservationApi.getUserReservation(
    data.user.id
  );

  if (!responseReservations.success) {
    return redirect(ROUTES.ERROR);
  }

  console.log(responseReservations.data);

  return <BookingScreen />;
}

// 81a9cad1-eea2-44c8-a87a-58fea66d4131
// 3
