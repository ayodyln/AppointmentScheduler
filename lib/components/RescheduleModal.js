import {
  getSingleApppointment,
  updateAppointmentData,
} from "../Handlers/Fetch.js"

const availableTimes = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
]

export const RescheduleModal = async (appointmentID) => {
  const main = document.querySelector("main")

  const { id, data } = await getSingleApppointment(appointmentID)

  const date = new Date(data.date)
  const dateStr = `2022-12-01`
  //   const dateStr = `${date.getFullYear()}-${
  //     date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  //   }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`

  const timeStr = `${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`

  console.log(dateStr)

  const markup = () => `<div id="notesModal" class="modal modal-open">
        <div class="modal-box flex flex-col gap-4">
            <h3 class="font-bold text-lg">${data.name}'s Appointment Notes</h3>
            
            <div class="form-control w-full"> 
          <label class="input-group">
            <span class="w-1/6 flex justify-center items-center bg-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-2/3 fill-primary"
              >
                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                />
              </svg>
            </span>

            <input
              type="date"
              name="date"
              value="${dateStr}"
              id="editDate"
              class="input input-bordered w-5/6 text-primary"
              required
            />
          </label>
        </div>

        <div class="form-control w-full"> 
          <label class="input-group">
            <span class="w-1/6 flex justify-center items-center bg-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="w-2/3 fill-primary"
              >
                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>
            </span>
           
            <select class="input input-bordered w-5/6 text-primary" name="time" id="editTime">
              ${availableTimes.map((time) => {
                if (time === timeStr)
                  return `<option value=${time} selected>${time}</option>`

                return `<option value=${time}>${time}</option>`
              })}
            </select>
          </label>
        </div>

            <div class="modal-action">
                <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
                <button id="save" class="btn btn-primary text-white">Save</button>
            </div>
        </div>
    </div>`

  main.insertAdjacentHTML("beforeend", await markup())

  main.addEventListener("click", async (event) => {
    event.stopPropagation()

    if (event.target.id === "notesModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "save") {
      await inputsHandler(id)
      document.querySelector("#notesModal").remove()
    }
  })
}

async function inputsHandler(id) {
  const dateInput = document.querySelector("#editDate")
  const timeInput = document.querySelector("#editTime")

  const date = new Date(`${dateInput.value} ${timeInput.value}`)
  const ts = date.getTime()

  await updateAppointmentData(id, {
    date: ts,
  })
}
