import {
  deleteAppointment,
  updateAppointmentStatus,
} from "../Handlers/Fetch.js"
import {
  RenderNotesModal,
  EditModal,
  EmailModal,
  RescheduleModal,
} from "../components/Modals.js"
import { reRenderCard } from "./ReRenderCard.js"

export async function CardEvents(event) {
  event.stopImmediatePropagation()

  // TODO: CLEAN UP EVENT TARGETS
  if (event.target.id === "delete") {
    document.getElementById(`${event.target.dataset.id}`).remove()
    await deleteAppointment(event.target.dataset.id)
  }

  if (event.target.id === "cancel") {
    // Checking for if the item is already desired Status; Returning if need be to save data calls.
    if (
      document.getElementById(`${event.target.dataset.id}`).dataset.status ===
      "Canceled"
    )
      return

    await updateAppointmentStatus(event.target.dataset.id, `Canceled`)
    reRenderCard(event.target.dataset.id, "Canceled")
  }

  if (event.target.id === "complete") {
    // Checking for if the item is already desired Status; Returning if need be to save data calls.
    if (
      document.getElementById(`${event.target.dataset.id}`).dataset.status ===
      "Completed"
    )
      return

    await updateAppointmentStatus(event.target.dataset.id, `Completed`)
    reRenderCard(event.target.dataset.id, "Completed")
  }

  if (event.target.id === "notes") RenderNotesModal(event.target.dataset.id)
  if (event.target.id === "edit") EditModal(event.target.dataset.id)
  if (event.target.id === "emailUser") EmailModal(event.target.dataset.email)
  if (event.target.id === "reschedule") RescheduleModal(event.target.dataset.id)
}
