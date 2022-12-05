import { updateAppointmentStatus } from "../Handlers/Fetch.js"
import { reRenderCard } from "./ReRenderCard.js"
import { dateComparing } from "./Date.js"

// This function runs throuh the fetched appointments, and checks for their status and updates database if needed. Then updates the UI too.

export async function checkAppointmentStatus(appointments) {
  // if (!appointments) appointments = await getAppointments()

  appointments.forEach(async (appointment) => {
    const { appointmentDate, currentDate, compareDate } = await dateComparing(
      appointment.data.date
    )

    //REDO LOGIC HERE
    if (
      appointmentDate.getTime() <= currentDate.getTime() &&
      currentDate.getTime() >= compareDate.getTime()
    ) {
      if (appointment.data.status === "PastDue") return
      await updateAppointmentStatus(appointment.id, `PastDue`)
      reRenderCard(appointment.id, "PastDue")

      return
    }

    if (
      appointmentDate.getTime() <= currentDate.getTime() &&
      currentDate.getTime() <= compareDate.getTime()
    ) {
      if (
        appointment.data.status === "Current" ||
        appointment.data.status === "Completed" ||
        appointment.data.status === "Canceled"
      )
        return

      await updateAppointmentStatus(appointment.id, `Current`)
      reRenderCard(appointment.id, "Current")

      return
    }

    if (currentDate.getTime() < compareDate.getTime()) {
      if (
        appointment.data.status === "Upcoming" ||
        appointment.data.status === "Completed" ||
        appointment.data.status === "Canceled"
      )
        return

      await updateAppointmentStatus(appointment.id, `Upcoming`)
      reRenderCard(appointment.id, "Upcoming")

      return
    }
  })
}
