import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "./lib/Handlers/Fetch.js"
import AppointmentCard from "./lib/components/AppointmentCard.js"
import {
  EditModal,
  EmailModal,
  RenderNotesModal,
  RescheduleModal,
} from "./lib/components/Modals.js"
import { reRenderCard } from "./lib/func/ReRenderCard.js"
import { checkAppointmentStatus } from "./lib/func/CheckAppointmentStatus.js"

export const renderAppointments = async () => {
  const appointmentsNode = document.querySelector("#appointments")
  appointmentsNode.textContent = ""

  const appointments = await getAppointments()

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

  checkAppointmentStatus(appointments)

  appointmentsNode.addEventListener("click", CardEvents)
}
await renderAppointments()
// HourChecker(appointments)

//! Events
const cancelAllBtn = document.querySelector("#cancelAllBtn")
cancelAllBtn.addEventListener("click", async (event) => {
  console.log("Canceling All...")
  try {
    await fetch("/.netlify/functions/CancelAll_appointments")
    await renderAppointments()
  } catch (error) {
    console.error(error)
  }
})

function HourChecker(appointments) {
  setInterval(async () => {
    console.log("Hour Checking...", appointments)
    await checkAppointmentStatus(appointments)
  }, 1000 * 60 * 60)
}

async function CardEvents(event) {
  event.stopImmediatePropagation()

  // TODO: CLEAN UP EVENT TARGETS
  if (event.target.id === "delete") {
    document.getElementById(`${event.target.dataset.id}`).remove()
    await deleteAppointment(event.target.dataset.id)
  }

  if (event.target.id === "cancel") {
    // Checking for if the item is already desired Status; Returning if need be to save data calls.
    if (
      document.querySelector(`#${event.target.dataset.id}`).dataset.status ===
      "Canceled"
    )
      return

    await updateAppointmentStatus(event.target.dataset.id, `Canceled`)
    reRenderCard(event.target.dataset.id, "Canceled")
  }

  if (event.target.id === "complete") {
    // Checking for if the item is already desired Status; Returning if need be to save data calls.
    if (
      document.querySelector(`#${event.target.dataset.id}`).dataset.status ===
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
