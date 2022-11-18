import { updateAppointmentNotes, getSingleApppointment } from "./Fetch.js"

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
