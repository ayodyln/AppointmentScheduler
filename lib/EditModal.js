import { getSingleApppointment } from "./Fetch.js"

export const EditModal = async (id) => {
  const main = document.querySelector("main")
  const { data } = await getSingleApppointment(id)

  const markup = async () => `<div id="editModal" class="modal modal-open">
    <div class="modal-box flex flex-col gap-4">
      <h3 class="font-bold text-lg">Edit Appointment</h3>
      
        

      <div class="modal-action">
        <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
        <button id="save" class="btn btn-disabled text-white">Save</button>
      </div>
    </div>
  </div>`

  main.insertAdjacentHTML("beforeend", await markup())

  document.querySelector("#editModal").addEventListener("click", (event) => {
    console.log(event)
  })

  main.addEventListener("click", async (event) => {
    event.stopPropagation()

    if (event.target.id === "editModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "save") {
      const input = document.querySelector("#notesInput")
      if (prevNotes === input.value) {
        console.error("Not equal")
        return
      }
      await updateAppointmentNotes(id, input.value)
      document.querySelector("#editModal").remove()
    }
  })
}
