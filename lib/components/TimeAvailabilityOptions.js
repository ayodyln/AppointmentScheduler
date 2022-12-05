import { getAvailability } from "../Handlers/Fetch.js"

// * Limits the time options in the Create Appointment Form section of the UI,
// * and in the Reschedule Modal UI.
export default async function renderTimeAvailabilityOptions(elementID) {
  const timeOptions = document.querySelector(`#${await elementID}`)
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
