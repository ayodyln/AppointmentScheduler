import { svgIcons } from "./SVG.js"
import { appointmentStatusStyle } from "../func/AppointmentStatusStyle.js"

const AppointmentCard = (appointment) => {
  const date = new Date(appointment.data.date)
  const dateStr = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`
  const timeStr = `${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }`

  return `<div id="${appointment.id}" data-id="${
    appointment.id
  }" data-status="${
    appointment.data.status
  }" class="card bg-base-100 text-neutral rounded-lg p-1 shadow-lg w-full flex-row h-38">
            <section class="flex w-full">
              <div class="w-full rounded-lg p-2 flex flex-col justify-between gap-1 text-sm">
                <div class="flex items-center gap-2 h-fit">
                  <div class="fill-primary w-10 flex justify-center items-center">${svgIcons(
                    "User"
                  )}</div>
                  
                  <section class="w-full flex justify-between items-top">
                    <div class="w-full">
                      <p class="text-lg">${appointment.data.name}</p>
                      <button id="emailUser" data-email="${
                        appointment.data.email
                      }" data-tip="Email Attendee" class="tooltip btn btn-link btn-xs p-0 flex gap-2 items-center text-neutral fill-neutral hover:text-primary hover:fill-primary lowercase"><span class="w-4 fill-inherit">${svgIcons(
    "Email"
  )}</span>${appointment.data.email}</button>
                    </div>

                    <button data-id="${
                      appointment.id
                    }" data-tip="Reschedule" id="reschedule" class="btn btn-primary h-2/4 w-10 text-white btn-sm tooltip tooltip-bottom"><span class="pointer-events-none fill-white w-4">${svgIcons(
    "Reschedule"
  )}</span></button>
                  </section>
                </div>
  
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
                  <section class="rounded-lg ${appointmentStatusStyle(
                    appointment.data.status
                  )} w-1/3 h-full flex justify-center items-center">
                    ${appointment.data.status}
                  </section>

                  <section class="flex gap-2">
                    <button data-id="${appointment.id}" data-notes=${
    appointment.data.notes
  } data-name="${
    appointment.data.name
  }" id="notes" class="btn btn-primary h-2/4 text-white btn-sm">Notes</button>
                    <button data-id="${
                      appointment.id
                    }" id="edit" class="btn btn-primary h-2/4 text-white btn-sm">Edit</button>
                  </section>
                </div>
              </div>

              <div class="divider divider-horizontal m-0 w-3"></div>
            </section>

            <section class="flex flex-col justify-center items-center w-1/3 h-full rounded-lg overflow-hidden">
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary hover:bg-primary-content hover:text-primary h-1/3 rounded-none text-white btn-xs border-none" id="complete">Complete</button>
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary hover:bg-primary-content hover:text-primary h-1/3 rounded-none text-white btn-xs border-none" id="cancel">Cancel</button>
              <button data-id="${
                appointment.id
              }" class="w-[120px] btn btn-primary hover:bg-primary-content hover:text-primary h-1/3 rounded-none text-white btn-xs border-none" id="delete">Delete</button>
            </section>
        </div>`
}

export default AppointmentCard
