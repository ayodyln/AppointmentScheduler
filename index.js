import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "./lib/Fetch.js"

import { AppointmentCard } from "./lib/Markup.js"
import { RenderNotesModal } from "./lib/NotesModal.js"

export const renderAppointments = async () => {
  const appointmentsNode = document.querySelector("#appointments")
  appointmentsNode.textContent = ""

  const appointments = await getAppointments()

  appointments.forEach((appointment) => {
    appointmentsNode.insertAdjacentHTML(
      "beforeend",
      AppointmentCard(appointment)
    )
  })

  appointmentsNode.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    if (event.target.id === "delete") {
      console.log(`Deleting Appointment: ${event.target.dataset.id}`)
      event.target.parentElement.parentElement.remove()
      await deleteAppointment(event.target.dataset.id)
    }

    if (event.target.id === "cancel") {
      console.log(`Canceling ${event.target.dataset.id}`)
      await updateAppointmentStatus(event.target.dataset.id, `Canceled`)
      reRenderCard(event.target.dataset.id, "Canceled")
    }

    if (event.target.id === "complete") {
      console.log(`Completed ${event.target.dataset.id}`)
      await updateAppointmentStatus(event.target.dataset.id, `Completed`)
      reRenderCard(event.target.dataset.id, "Completed")
    }

    if (event.target.id === "notes") {
      console.log("Notes")
      RenderNotesModal(event.target.dataset.notes)
    }
  })
}
await renderAppointments()

function reRenderCard(id, statusInput, target) {
  const card = document.querySelector(`#${id}`)

  if (!statusInput) {
    console.log(id, target)
    return
  }

  // Edit Status
  const statusText =
    card.children["0"].children["0"].children["3"].children["0"]
  statusText.textContent = statusInput
}
