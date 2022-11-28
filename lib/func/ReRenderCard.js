import { appointmentStatusStyle } from "./AppointmentStatusStyle.js"

export function reRenderCard(id, statusInput) {
  const card = document.getElementById(`${id}`)

  delete card.dataset.status
  card.dataset.status = statusInput

  console.log(card.dataset.status)

  card.children[0].children[0].children[2].children[0].className = `rounded-lg ${appointmentStatusStyle(
    statusInput
  )} w-1/3 h-full flex justify-center items-center`

  card.children[0].children[0].children[2].children[0].textContent = statusInput
}
