import { createAppointment } from "../Handlers/Fetch.js"
import { renderAppointments } from "../../index.js"

const createAppointmentForm = document.querySelector("#createAppointmentForm")

createAppointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const [name, email, date, time, notes] = e.target

  const createdAppointment = await createAppointment({
    name,
    email,
    date,
    time,
    notes,
  })

  const errorText = document.querySelector("#ErrorText")

  if (
    createdAppointment.statusCode === 400 ||
    createdAppointment.statusCode === 409
  ) {
    errorText.classList.replace("text-sm", "font-bold")
    errorText.classList.add("text-error")
    errorText.textContent = createdAppointment.msg
    return
  }

  name.value = ""
  email.value = ""
  date.value = ""
  time.selectedIndex = 0
  notes.value = ""

  errorText.textContent = "Dates must be scheduled for future dates."
  errorText.className = "text-sm"

  await renderAppointments()
})
