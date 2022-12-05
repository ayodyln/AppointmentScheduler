import {
  getSingleApppointment,
  updateAppointmentData,
  updateAppointmentNotes,
  emailClient,
  getAvailability,
} from "../Handlers/Fetch.js"

import { renderAppointments } from "../../index.js"

import { dateHandler } from "../Handlers/Date.js"

const availableTimes = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

// Modal Functions
export const EditModal = async (appointmentID) => {
  const main = document.querySelector("main")

  const { id, data } = await getSingleApppointment(appointmentID)

  main.insertAdjacentHTML("beforeend", await EditModalMarkup(data))

  main.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    if (event.target.id === "editModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "save") {
      event.stopPropagation()
      await inputsHandler(id, data)
      await renderAppointments()

      document.querySelector("#editModal").remove()
    }
  })

  async function inputsHandler(id) {
    const nameInput = document.querySelector("#editName")
    const emailInput = document.querySelector("#editEmail")
    // ---------
    await updateAppointmentData(id, {
      name: nameInput.value,
      email: emailInput.value,
    })
  }
}

export const EmailModal = async (email) => {
  const main = document.querySelector("main")

  main.insertAdjacentHTML("beforeend", await EmailModalMarkup(email))

  main.addEventListener("click", async (event) => {
    event.stopPropagation()

    if (event.target.id === "emailModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "send") {
      inputsHandler(email)
      event.target.parentElement.parentElement.parentElement.remove()
    }
  })

  async function inputsHandler(email) {
    const subject = document.querySelector("#subject").value
    const text = document.querySelector("#emailMsg").value

    try {
      await emailClient({
        email,
        subject,
        text,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const RenderNotesModal = async (id) => {
  const main = document.querySelector("main")

  const appointment = await getSingleApppointment(id)
  const prevNotes = appointment.data.notes

  const markup = async () => `<div id="notesModal" class="modal modal-open">
      <div class="modal-box flex flex-col gap-4">
        <h3 class="font-bold text-lg">${appointment.data.name}'s Appointment Notes</h3>
        <textarea id="notesInput" class="textarea textarea-bordered resize-none w-full  h-32">${appointment.data.notes}</textarea>
       
        <div class="modal-action">
          <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
          <button id="save" class="btn btn-disabled text-white">Save</button>
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
      const input = document.querySelector("#notesInput")
      if (prevNotes === input.value) {
        console.error("Not equal")
        return
      }
      await updateAppointmentNotes(id, input.value)
      document.querySelector("#notesModal").remove()
    }
  })

  document.querySelector("#notesInput").addEventListener("change", (event) => {
    console.log(event.target.value)

    document
      .querySelector("#save")
      .classList.replace("btn-disabled", "btn-primary")
  })
}

export const RescheduleModal = async (appointmentID) => {
  const main = document.querySelector("main")

  const { id, data } = await getSingleApppointment(appointmentID)

  const { dateStr, timeStr } = dateHandler(data)

  main.insertAdjacentHTML(
    "beforeend",
    await RescheduleModalMarkup(data, dateStr, timeStr)
  )

  await renderTimeAvailabilityOptions()

  main.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    if (event.target.id === "notesModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "save") {
      event.stopPropagation()
      await inputsHandler(id, data.status)

      document.querySelector("#rescheduleModule").remove()
    }
  })

  async function inputsHandler(id, status) {
    const dateInput = document.querySelector("#editDate")
    const timeInput = document.querySelector("#editTime")

    const date = new Date(`${dateInput.value} ${timeInput.value}`)
    const ts = date.getTime()

    await updateAppointmentData(id, {
      date: ts,
    })

    await renderAppointments()
  }
}

// MARKUP
const EditModalMarkup = async (
  data
) => `<div id="editModal" class="modal modal-open">
  <div class="modal-box flex flex-col gap-4">
    <h3 class="font-bold text-lg">Edit Appointment</h3>

    <section class="w-full flex flex-col gap-4">
      <div class="form-control w-full"> 
        <label class="input-group">
          <span class="w-1/6 flex justify-center items-center bg-base-200">
            <svg
              class="w-2/3 h-auto fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
          <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
          </span>

          <input
            type="text"
            name="name"
            id="editName"
            placeholder="${data.name}"
            value="${data.name}"
            class="input input-bordered w-5/6 text-primary"
            required
          />
        </label>
      </div>

      <div class="form-control w-full"> 
        <label class="input-group">
          <span class="w-1/6 flex justify-center items-center bg-base-200">
            <svg class="w-2/3 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
              />
            </svg>
          </span>

          <input
            type="text"
            name="email"
            id="editEmail"
            placeholder="${data.email}"
            value="${data.email}"
            class="input input-bordered w-5/6 text-primary"
            required
          />
        </label>
      </div>
    </section>
      
    <div class="modal-action">
      <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
      <button id="save" class="btn btn-primary text-white">Save</button>
    </div>
  </div>
</div>`

const EmailModalMarkup = async (
  email
) => `<div id="emailModal" class="modal modal-open">
    <div class="modal-box flex flex-col h-[30rem]">
        
            <section class="w-full flex flex-col gap-2 h-full">
                <h3 class="font-bold text-lg">Email Appointment</h3>

                <input type="text" value="${email}" name="email" required/>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Subject</span>
                    </label>
                    <input id="subject" type="text" placeholder="Subject" class="input input-bordered w-full w-full" />
                </div>
                <div class="form-control w-full h-full"> 
                    <label class="label">
                        <span class="label-text">Your Message</span>
                    </label> 
                    <textarea
                        id="emailMsg"
                        name="message" 
                        class="textarea textarea-bordered resize-none w-full h-full rounded-xl" 
                        required
                    ></textarea>
                </div>
            </section>
      
            <div class="modal-action">
                <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
                <button id="send" class="btn btn-primary text-white">Send</button>
            </div>
       
    </div>
</div>`

const RescheduleModalMarkup = async (
  data,
  dateStr,
  timeStr
) => `<div id="rescheduleModule" class="modal modal-open">
        <div class="modal-box flex flex-col gap-4">
            <h3 class="font-bold text-lg">Reschedule ${data.name}'s Appointment</h3>
            
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
             
            </select>
          </label>
        </div>
  
            <div class="modal-action">
                <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
                <button id="save" class="btn btn-primary text-white">Save</button>
            </div>
        </div>
    </div>`

async function renderTimeAvailabilityOptions() {
  const timeOptions = document.querySelector(`#editTime`)
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
