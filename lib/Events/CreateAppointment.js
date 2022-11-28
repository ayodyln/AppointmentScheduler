import { createAppointment } from "../Handlers/Fetch.js"
import { renderAppointments } from "../../index.js"

const createAppointmentForm = document.querySelector("#createAppointmentForm")

createAppointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const [name, email, date, time, notes] = e.target
  await createAppointment({ name, email, date, time, notes })

  name.value = ""
  email.value = ""
  date.value = ""
  time.selectedIndex = 0
  notes.value = ""

  // await renderAppointments()
})
