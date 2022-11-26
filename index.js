import { EditModal } from "./lib/EditModal.js"
import { EmailModal } from "./lib/EmailModal.js"
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

  let appointments = []

  appointments = await getAppointments()

  appointments
    .sort((a, b) => {
      return a.data.date - b.data.date
    })
    .forEach((appointment) => {
      appointmentsNode.insertAdjacentHTML(
        "beforeend",
        AppointmentCard(appointment)
      )
    })

  appointmentsNode.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    // TODO: CLEAN UP EVENT TARGETS
    if (event.target.id === "delete") {
      event.target.parentElement.parentElement.remove()
      await deleteAppointment(event.target.dataset.id)
    }

    if (event.target.id === "cancel") {
      await updateAppointmentStatus(event.target.dataset.id, `Canceled`)

      event.target.parentElement.parentElement.children[0].children[0].children[2].children[0].textContent =
        "Canceled"
    }

    if (event.target.id === "complete") {
      await updateAppointmentStatus(event.target.dataset.id, `Completed`)

      event.target.parentElement.parentElement.children[0].children[0].children[2].children[0].textContent =
        "Complete"
    }

    if (event.target.id === "notes") {
      // ID, NOTES, NAME
      RenderNotesModal(
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.dataset.id
      )
    }

    if (event.target.id === "edit") {
      console.log("Edit")
      await EditModal(
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.dataset.id
      )
    }

    if (event.target.id === "emailUser") {
      console.log("Email")
      await EmailModal(event.target.dataset.email)
    }
  })

  // HourChecker(appointments)
}
await renderAppointments()

export function reRenderCard(id, statusInput) {
  const card = document.querySelector(`#${id}`)

  if (!statusInput && target) {
    console.log(id, target)
    return
  }

  // Edit Status
  const statusText =
    card.children["0"].children["0"].children["3"].children["0"]
  statusText.textContent = statusInput
}

function HourChecker(appointments) {
  setInterval(async () => {
    console.log("Hour Checking...", appointments)
  }, 1000 * 60)
}
