import { EditModal } from "./lib/components/EditModal.js"
import { EmailModal } from "./lib/components/EmailModal.js"
import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "./lib/Handlers/Fetch.js"

import {
  AppointmentCard,
  appointmentStatusStyle,
} from "./lib/components/AppointmentCard.js"
import { RenderNotesModal } from "./lib/components/NotesModal.js"
import { RescheduleModal } from "./lib/components/RescheduleModal.js"
import { dateComparing } from "./lib/func/Date.js"

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

  checkAppointmentStatus(appointments)
  HourChecker(appointments)
}
await renderAppointments()

export function reRenderCard(id, statusInput) {
  const card = document.getElementById(`${id}`)
  card.children[0].children[0].children[2].children[0].className = `rounded-lg ${appointmentStatusStyle(
    statusInput
  )} w-1/3 h-full flex justify-center items-center`

  card.children[0].children[0].children[2].children[0].textContent = statusInput
}

function HourChecker(appointments) {
  setInterval(async () => {
    console.log("Hour Checking...", appointments)
    await checkAppointmentStatus(appointments)
  }, 1000 * 60 * 60)
}

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
