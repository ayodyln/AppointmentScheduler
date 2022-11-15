import {
  getAppointments,
  deleteAppointment,
  cancelAppointment,
} from "./lib/Fetch.js"

import { AppointmentCard } from "./lib/Markup.js"

export const renderAppointments = async () => {
  const appointmentsNode = document.querySelector("#appointments")
  appointmentsNode.textContent = ""

  const { data } = await getAppointments()

  data.forEach((appointment, i) =>
    appointmentsNode.insertAdjacentHTML(
      "beforeend",
      AppointmentCard(appointment)
    )
  )

  appointmentsNode.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    if (event.target.id === "delete") {
      console.log(`Deleting Appointment: ${event.target.dataset.id}`)
      event.target.parentElement.parentElement.remove()
      await deleteAppointment(event.target.dataset.id)
    }

    if (event.target.id === "cancel") {
      console.log("Cancel")
      await cancelAppointment(event.target.dataset.id)
    }

    if (event.target.id === "notes") {
      console.log("Notes")
    }
  })
}
await renderAppointments()
