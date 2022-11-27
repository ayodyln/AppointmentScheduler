import {
  getSingleApppointment,
  updateAppointmentData,
} from "../Handlers/Fetch.js"
import { renderAppointments } from "../../index.js"

export const EditModal = async (appointmentID) => {
  const main = document.querySelector("main")
  const { id, data } = await getSingleApppointment(appointmentID)

  main.insertAdjacentHTML("beforeend", await markup(data))

  main.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    if (event.target.id === "editModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "save") {
      event.stopPropagation()
      await inputsHandler(id, data)
      await renderAppointments()

      event.target.parentElement.parentElement.parentElement.remove()
    }
  })
}

const inputsHandler = async (id) => {
  const nameInput = document.querySelector("#editName")
  const emailInput = document.querySelector("#editEmail")
  // ---------
  await updateAppointmentData(id, {
    name: nameInput.value,
    email: emailInput.value,
  })
}

const markup = async (data) => `<div id="editModal" class="modal modal-open">
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
