import {
  getAvailability,
  updateAvailability,
} from "../../lib/Handlers/Fetch.js"

export const renderAvailabilityPage = async () => {
  const AvailableTimesDiv = document.querySelector("#AvailableTimes")
  const Times = await getAvailability()
  console.log(Times)

  AvailableTimesDiv.textContent = ""

  Times.sort((a, b) => a.body.id - b.body.id).forEach((time) => {
    AvailableTimesDiv.insertAdjacentHTML("beforeend", timeCardMarkup(time))
  })

  AvailableTimesDiv.addEventListener("click", async (event) => {
    if (event.target.id === "toggle") {
      toggleActive(event.target.dataset.id, Times)
    }
  })
}

const timeCardMarkup = (data) => {
  return `<div class="rounded-lg bg-base-300 p-2 flex items-center justify-between w-48 h-full">
    <h2 class="text-lg">${data.body.time}</h2>
    <input data-id="${
      data.id
    }" id="toggle" type="checkbox" class="toggle toggle-primary" ${
    data.body.active ? "checked" : ""
  } />
  </div>`
}

const toggleActive = async (id, array) => {
  // Grab current status
  const currentTimeObject = array.find((time) => id === time.id)
  const data = await updateAvailability(id, currentTimeObject)
  console.log(data)
}

//? Function Calls
await renderAvailabilityPage()
