import { svgIcons } from "./SVG.js"

export const AppointmentCard = (appointment) => {
  const date = new Date(appointment.data.date)
  const dateStr = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
  const timeStr = `${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }`

  return `<div id="${appointment.id}" data-id="${
    appointment.id
  }" class="card bg-white text-neutral rounded-lg p-2 shadow-xl w-full flex-row">
            <section class="flex w-full">
              <div class="w-full bg-base-200 rounded-lg p-2 flex flex-col gap-1 text-sm">
                <p class="flex items-center gap-2">
                  <span class="fill-primary w-6 flex justify-center items-center">${svgIcons(
                    "User"
                  )}</span>${appointment.data.name}
                </p>

                <p class="flex items-center gap-2">
                  <span class="fill-primary w-6 flex justify-center items-center">${svgIcons(
                    "Email"
                  )}</span>${appointment.data.email}
                </p>
  
                <div class="flex gap-2 items-center w-full">
                  <p class="flex items-center gap-2">
                    <span class="fill-primary w-6 flex justify-center items-center">${svgIcons(
                      "Date"
                    )}</span>${dateStr}
                  </p>
                  <p class="flex items-center gap-2" id="time">
                    <span class="fill-primary w-6 flex justify-center items-center">${svgIcons(
                      "Time"
                    )}</span>${timeStr}
                  </p>
                </div>
  
                <div class="w-full flex justify-between items-center gap-2 mt-2">
                  <section class="border-primary border-2 rounded-lg bg-base-300 w-1/3 h-full flex justify-center items-center">
                    ${appointment.data.status}
                  </section>

                  <section class="flex gap-2">
                    <button data-notes=${
                      appointment.data.notes
                    } id="notes" class="btn btn-primary h-2/4 text-white">Notes</button>
                    <button id="edit" class="btn btn-primary h-2/4 text-white">Edit</button>
                  </section>
                </div>
              </div>
              <div class="divider divider-horizontal m-0 w-3"></div>
            </section>
            <section class="flex flex-col justify-center items-center w-1/3 h-full rounded-lg overflow-hidden">
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary h-1/3 rounded-none text-white" id="complete">Complete</button>
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary h-1/3 rounded-none text-white border-y-1 border-white hover:border-white" id="cancel">Cancel</button>
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary h-1/3 rounded-none text-white" id="delete">Delete</button>
            </section>
        </div>`
}
