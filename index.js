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
      event.target.parentElement.parentElement.remove()
      await deleteAppointment(event.target.dataset.id)
    }

    if (event.target.id === "cancel") {
      await updateAppointmentStatus(event.target.dataset.id, `Canceled`)
      reRenderCard(event.target.dataset.id, "Canceled")
    }

    if (event.target.id === "complete") {
      await updateAppointmentStatus(event.target.dataset.id, `Completed`)
      reRenderCard(event.target.dataset.id, "Completed")
    }

    if (event.target.id === "notes") {
      // ID, NOTES, NAME
      RenderNotesModal(
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.dataset.id
      )
    }
  })
}
await renderAppointments()

export function reRenderCard(id, statusInput, target) {
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
