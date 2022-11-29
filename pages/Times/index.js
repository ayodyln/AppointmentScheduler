import { getAvailability } from "../../lib/Handlers/Fetch.js"

export const renderAvailabilityPage = async () => {
  const AvailableTimesDiv = document.querySelector("#AvailableTimes")

  const availability = await getAvailability()

  console.log(availability)
}

renderAvailabilityPage()
