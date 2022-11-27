import { EditModal } from "./lib/components/EditModal.js"
import { EmailModal } from "./lib/components/EmailModal.js"
import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "./lib/Handlers/Fetch.js"

import { AppointmentCard } from "./lib/components/AppointmentCard.js"
import { RenderNotesModal } from "./lib/components/NotesModal.js"
import { RescheduleModal } from "./lib/components/RescheduleModal.js"

export const renderAppointments = async () => {
  const appointmentsNode = document.querySelector("#appointments")
  appointmentsNode.textContent = ""

  let appointments = []

  appointments = await getAppointments()

  if (appointments.length === 0) {
    console.error("No Appointments to Sort")
    return
  }

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

    if (event.target.id === "reschedule") {
      console.log("Reschedule")
      await RescheduleModal(event.target.dataset.id)
    }
  })

  // HourChecker(appointments)
}
await renderAppointments()

export async function reRenderCard(id, statusInput) {
  const card = document.querySelector(`#${id}`)

  if (!statusInput && target) {
    console.log(id, target)
    return
  }

  // Edit Status Section of Card
  card.children[0].children[0].children[2].children[0].textContent = statusInput
}

function HourChecker(appointments) {
  setInterval(async () => {
    console.log("Hour Checking...", appointments)
  }, 1000 * 60)
}

//! Events
const cancelAllBtn = document.querySelector("#cancelAllBtn")
cancelAllBtn.addEventListener("click", async (event) => {
  console.log("Canceling All...")
  try {
    const cancelAll = await fetch("/.netlify/functions/CancelAll_appointments")
    await renderAppointments()
  } catch (error) {
    console.error(error)
  }
})
