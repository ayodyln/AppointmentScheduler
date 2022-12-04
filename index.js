import {
  getAppointments,
  getAvailability,
  deleteAppointment,
} from "./lib/Handlers/Fetch.js"
import AppointmentCard from "./lib/components/AppointmentCard.js"
import { checkAppointmentStatus } from "./lib/func/CheckAppointmentStatus.js"
import { CardEvents } from "./lib/func/AppointmentCardEvents.js"

// ? Function Calls
await renderAppointments()
await renderTimeAvailabilityOptions()
// ? -----

export async function renderAppointments() {
  const appointmentsNode = document.querySelector("#appointments")
  appointmentsNode.textContent = ""

  const appointments = await getAppointments()
  if (appointments.length === 0) {
    console.error("No Appointments to Sort")
    return
  }
  appointments
    .sort((a, b) => a.data.date - b.data.date)
    .forEach((appointment) =>
      appointmentsNode.insertAdjacentHTML(
        "beforeend",
        AppointmentCard(appointment)
      )
    )

  checkAppointmentStatus(appointments)
  appointmentsNode.addEventListener("click", CardEvents)
}

async function renderTimeAvailabilityOptions() {
  const timeOptions = document.querySelector("#time")
  timeOptions.textContent = ""
  timeOptions.insertAdjacentHTML(
    "beforeend",
    `<option selected>Select a time...</option>`
  )

  const timeAvailabilityOptions = await getAvailability()

  timeAvailabilityOptions
    .sort((a, b) => a.body.id - b.body.id)
    .forEach((time) => {
      if (!time.body.active) return
      const optionTimeValue = time.body.time.split("").splice(0, 5).join("")
      timeOptions.insertAdjacentHTML(
        "beforeend",
        `<option value="${optionTimeValue}">${time.body.time}</option>`
      )
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

const clearListBtn = document.querySelector("#clearPastDueBtn")
clearListBtn.addEventListener("click", async (event) => {
  console.log("Clearing all Past Due, Canceled, and Completed.")

  const appointments = await getAppointments()

  const filtered = appointments.filter(
    (appointment) => appointment.data.status !== "Upcoming"
  )

  filtered.forEach(async (appointment) => {
    document.getElementById(appointment.id).remove()
    await deleteAppointment(appointment.id)
  })
})

function HourChecker(appointments) {
  setInterval(async () => {
    console.log("Hour Checking...", appointments)
    await checkAppointmentStatus(appointments)
  }, 1000 * 60 * 60)
}
// HourChecker(appointments)
