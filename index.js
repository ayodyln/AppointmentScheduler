import { getAppointments, deleteAppointment } from "./lib/Handlers/Fetch.js"
import AppointmentCard from "./lib/components/AppointmentCard.js"
import { checkAppointmentStatus } from "./lib/func/CheckAppointmentStatus.js"
import { CardEvents } from "./lib/func/AppointmentCardEvents.js"
import renderTimeAvailabilityOptions from "./lib/components/TimeAvailabilityOptions.js"

// ? Function Calls
await renderAppointments()
await renderTimeAvailabilityOptions("time")
// ? -----

// * renderAppointments() fetches an array of objects that is stored in my Firebase Cloudstore.
// * Then renders HTML for each appointment to the UI.
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

//! Events
const cancelAllBtn = document.querySelector("#cancelAllBtn")
cancelAllBtn.addEventListener("click", async () => {
  console.log("Canceling All Appointments")
  try {
    await fetch("/.netlify/functions/CancelAll_appointments")
    await renderAppointments()
  } catch (error) {
    console.error(error)
  }
})

const clearListBtn = document.querySelector("#clearPastDueBtn")
clearListBtn.addEventListener("click", async () => {
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

// function HourChecker(appointments) {
//   setInterval(async () => {
//     console.log("Hour Checking...", appointments)
//     await checkAppointmentStatus(appointments)
//   }, 1000 * 60 * 30)
// }
// HourChecker(appointments)
